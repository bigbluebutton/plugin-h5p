import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';
import { MoreInfoUser } from '../../types';

export interface GenericComponentRenderFunctionProps {
  jsonContent: string;
  currentUser: CurrentUserData;
  linkThatGeneratedJsonContent: string;
  pluginUuid: string;
}

export interface PresenterViewerRenderFunctionProps {
  pluginUuid: string;
  currentUserId: string;
  usersList: MoreInfoUser[];
}
