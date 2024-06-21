import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';

export interface UserH5pCurrentState {
  userId: string;
  currentState: object;
}

export interface GenericContentRenderFunctionProps {
  jsonContent: string;
  currentUser: CurrentUserData;
  pluginUuid: string;
}

export interface TestResult {
  userId: string;
  testResultObject: number;
  testResultMaximumScore: number;
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
