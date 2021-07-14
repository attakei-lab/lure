import { SlackConfig } from './modules/slack/types';

export type AppConfig = {
  url: string;
};

export type BackendConfig = {
  app: AppConfig;
  slack?: SlackConfig;
};
