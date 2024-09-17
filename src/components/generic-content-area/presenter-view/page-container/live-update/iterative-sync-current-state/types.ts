import { PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { UserToBeRendered } from '../../../types';

export interface IterativeSyncCurrentStateProps {
  userName: string;
  contentAsJson: string;
  pluginApi: PluginApi;
  h5pAsJson: string;
  userId: string;
  isFullscreen: boolean;
  numberOfItemsPerPage: number;
  setFullscreenItem?: React.Dispatch<React.SetStateAction<UserToBeRendered>>;
  setHasSyncCurentStateFlow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WindowWithH5p extends Window {
  H5P: {
    instances: {
      setCurrentState?: (args: object) => void
    }[]
  };
}
