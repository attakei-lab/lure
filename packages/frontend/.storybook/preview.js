import 'bytemd/dist/index.min.css';
import 'semantic-ui-css/semantic.min.css';
import '@/style.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
