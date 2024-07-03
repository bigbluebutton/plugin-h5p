export interface H5pPlayerManagerComponentProps {
  userName: string
  contentAsJson: string;
  h5pAsJson: string;
  currentH5pStateToBeApplied: object;
  userId: string;
}
export interface LatestH5pStateItem {
  id: string;
  state: object;
  rendered: boolean;
}
