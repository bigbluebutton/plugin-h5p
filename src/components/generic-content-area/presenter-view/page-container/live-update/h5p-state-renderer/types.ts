import { LatestH5pStateItem } from '../live-update-player/types';

export interface H5pPresenterComponentProps {
  isResetH5pComponentFlow: boolean;
  contentAsJson: string;
  h5pAsJson: string;
  indexOfCurrentStateInList?: number;
  currentH5pStateToBeApplied: string;
  setH5pDomElement?: React.Dispatch<React.SetStateAction<HTMLIFrameElement>>;
  setLatestH5pStates?: React.Dispatch<React.SetStateAction<LatestH5pStateItem[]>>;
  idOfCurrentState?: string;
}
