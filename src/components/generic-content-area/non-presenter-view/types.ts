import { PluginApi, PushEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import { LADTestResult, TestResult } from '../types';

export interface NonPresenterViewComponentProps {
  currentUserName: string;
  contentAsJson: string;
  h5pAsJson: string;
  pushEntryTestResult: PushEntryFunction<TestResult>;
  pushEntryLadTestResult: PushEntryFunction<LADTestResult>;
  currentUserId: string;
  pluginApi: PluginApi;
}
