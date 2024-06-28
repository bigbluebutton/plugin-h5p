export interface H5pPlayerManagerComponentProps {
  currentH5pStateToBeApplied: object;
  userName: string
  jsonContent: string;
}

export interface LatestH5pStateItem {
  id: string;
  state: object;
  rendered: boolean;
}
