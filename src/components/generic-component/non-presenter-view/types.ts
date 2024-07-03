import { ReplaceEntryFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PushEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import { LADTestResult, TestResult, UserH5pCurrentState } from '../types';

export interface NonPresenterViewComponentProps {
  currentUserName: string;
  contentAsJson: string;
  h5pAsJson: string;
  pushEntryTestResult: PushEntryFunction<TestResult>;
  pushEntryLadTestResult: PushEntryFunction<LADTestResult>;
  currentUserId: string;
  pushH5pCurrentState: PushEntryFunction<UserH5pCurrentState>;
  lastUpdateId: string;
  lastPayloadJson: UserH5pCurrentState;
  replaceH5pCurrentState: ReplaceEntryFunction<UserH5pCurrentState>;
}
