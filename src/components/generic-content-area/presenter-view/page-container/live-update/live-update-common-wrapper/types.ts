import { UserToBeRendered } from '../../types';

export interface LiveUpdateCommonWrapperProps extends React.PropsWithChildren {
  userName: string;
  userId: string;
  isFullscreen: boolean;
  numberOfItemsPerPage: number;
  setFullscreenItem?: React.Dispatch<React.SetStateAction<UserToBeRendered>>;
}
