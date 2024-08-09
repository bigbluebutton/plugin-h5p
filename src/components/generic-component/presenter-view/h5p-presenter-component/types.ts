import { LatestH5pStateItem } from '../h5p-player-manager/types';

export interface H5pPresenterComponentProps {
  contentAsJson: string;
  h5pAsJson: string;
  indexOfCurrentStateInList: number;
  stateListLength: number;
  currentH5pStateToBeApplied: string;
  setLatestH5pStates: React.Dispatch<React.SetStateAction<LatestH5pStateItem[]>>;
  idOfCurrentState: string;
}
