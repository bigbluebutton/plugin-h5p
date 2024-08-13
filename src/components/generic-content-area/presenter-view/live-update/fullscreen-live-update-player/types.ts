import { PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { UserToBeRendered } from '../../types';

export interface FullscreenLiveUpdatePlayerProps {
  userName: string
  contentAsJson: string;
  pluginApi: PluginApi;
  h5pAsJson: string;
  userId: string;
  setFullscreenItem: React.Dispatch<React.SetStateAction<UserToBeRendered>>;
}
