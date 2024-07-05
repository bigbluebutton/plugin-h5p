import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';

export interface UserH5pCurrentState {
  userId: string;
  userName: string;
  currentState: string;
}

export interface GenericContentRenderFunctionProps {
  h5pContentText: string;
  currentUser: CurrentUserData;
  pluginUuid: string;
}

export interface TestResult {
  userId: string;
  testResultActivityTitle: string;
  testResultObject: number;
  testResultMaximumScore: number;
}

export interface LADTestResult {
  learningAnalyticsDashboardColumnTitle: string;
  learningAnalyticsDashboardValue: string;
}

export interface MoreInfoUser {
  presenter: boolean;
  userId: string;
  name: string;
  role: string;
  color: string;
}

export interface UsersMoreInformationGraphqlResponse {
  user: MoreInfoUser[];
}
