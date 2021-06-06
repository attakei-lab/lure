import Head from 'next/head';
import React from 'react';
import Template from '../components/templates/SimpleContent';

const content = {
  title: 'About',
  body: `
## Lureとは

Lureは、Firebaseプロジェクト上で稼働する、シンプルなドキュメント共有キットです。

## 主な特徴

* オープンソースソフトウェア
* Markdownによるドキュメンテーション
* Firebaseの認証基盤によるアクセス制限
* 従量課金系サービスのみを利用

## こんな組織向け

* ひとまず、雑多に情報ログを残してみたい個人
* ナレッジ共有のスモールスモールスタートしてみたい組織
* ナレッジ受信メンバーと比較して、ナレッジ発信メンバーの割合が低い組織
  `,
};

export const Page = () => (
  <>
    <Head>
      <title>{content.title} | Lure</title>
    </Head>
    <Template content={content} />
  </>
);

export default Page;
