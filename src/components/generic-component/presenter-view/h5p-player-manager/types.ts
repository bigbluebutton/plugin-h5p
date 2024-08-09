import { PluginApi } from 'bigbluebutton-html-plugin-sdk';

export interface H5pPlayerManagerComponentProps {
  userName: string
  contentAsJson: string;
  pluginApi: PluginApi;
  h5pAsJson: string;
  userId: string;
}
export interface LatestH5pStateItem {
  id: string;
  state: string;
  rendered: boolean;
}
