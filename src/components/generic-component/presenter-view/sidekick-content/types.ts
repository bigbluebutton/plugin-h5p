import { MoreInfoUser } from '../../types';

export interface PresenterViewerRenderFunctionProps {
  pluginUuid: string;
  currentUserId: string;
  usersList: MoreInfoUser[];
  h5pContentText: string;
}
