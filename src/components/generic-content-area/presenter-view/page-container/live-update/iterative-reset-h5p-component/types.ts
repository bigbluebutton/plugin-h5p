import { PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { UserToBeRendered } from '../../../types';

export interface IterativeResetH5PComponentProps {
  userName: string;
  contentAsJson: string;
  pluginApi: PluginApi;
  h5pAsJson: string;
  userId: string;
  isFullscreen: boolean;
  numberOfItemsPerPage: number;
  setFullscreenItem?: React.Dispatch<React.SetStateAction<UserToBeRendered>>;
}
