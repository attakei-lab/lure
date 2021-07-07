import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/ContentEdit';
import { FirebaseAppContext } from '@/contexts/firebase';
import { usePost } from '@/applications/posts/hooks';
import {
  getLinks,
  postFirebaseConverter,
  updateAuthors,
} from '@/applications/posts/services';
import { simpleValidate } from '@/applications/posts/utils';
import { Content } from '@/applications/posts/types';

/**
 * 既存の記事データの更新フォームを表示する
 *
 * フォーム内の保存処理によって、保存を実際に行い、問題なく保存されたら記事表示ページへ切り替える
 */
export const Page = () => {
  const router = useRouter();
  const { app, profile } = useContext(FirebaseAppContext);
  const [content, setContent] = useState<Content>();
  const { post, error, loading } = (() => {
    if (router.query.id && typeof router.query.id === 'string') {
      return usePost(app, router.query.id as string);
    }
    return {
      loading: false,
      error: new Error('Invalid URL'),
      post: undefined,
    };
  })();
  useEffect(() => {
    if (!post) return;
    setContent({
      title: post.title,
      body: post.body,
      tags: post.tags,
    });
  }, [post]);

  const handleSubmit = async () => {
    const validateMsg = simpleValidate(content);
    if (validateMsg) {
      return {
        message: validateMsg,
        next: () => false,
      };
    }
    const nextPost = {
      ...post,
      ...content,
      authors: updateAuthors(post.authors, profile),
      updatedBy: profile,
      updatedAt: new Date(),
    };
    return nextPost.ref
      .withConverter(postFirebaseConverter)
      .set(nextPost)
      .then(() => {
        const nextUrl = getLinks(nextPost).detail;
        console.debug(`Created content at ${nextUrl}`);
        return {
          message: '保存しました。ページを切り替えます...',
          next: async () => {
            setTimeout(() => router.push(nextUrl), 1000);
            return true;
          },
        };
      })
      .catch((reason) => {
        return {
          message: `失敗しました: ${reason}`,
          next: () => false,
        };
      });
  };

  const uploadImages = async (files: File[]) => {
    return Promise.all(
      files.map(async (f) => {
        const storage = app.storage();
        const filename = `uploads/${post.id}/${f.name}`;
        const fileRef = storage.ref(filename);
        await fileRef.put(f);
        return {
          alt: f.name,
          title: f.name,
          url: await fileRef.getDownloadURL(),
        };
      })
    );
  };

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {post && (
          <ViewTemplate
            content={content}
            handleSubmit={handleSubmit}
            headingText="記事の編集"
            setContent={setContent}
            submitLabel="保存"
            handleImages={uploadImages}
          />
        )}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};

export default Page;
