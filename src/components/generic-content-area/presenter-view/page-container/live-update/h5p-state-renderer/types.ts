import { LatestH5pStateItem } from '../live-update-player/types';

export interface H5pPresenterComponentProps {
  contentAsJson: string;
  h5pAsJson: string;
  indexOfCurrentStateInList: number;
  stateListLength: number;
  currentH5pStateToBeApplied: string;
  setLatestH5pStates: React.Dispatch<React.SetStateAction<LatestH5pStateItem[]>>;
  idOfCurrentState: string;
}
