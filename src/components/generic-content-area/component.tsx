import {
  BbbPluginSdk,
  DataChannelTypes,
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { equals } from 'ramda';
import {
  GenericContentRenderFunctionProps,
  LADTestResult,
  TestResult, UserH5pCurrentState, UsersMoreInformationGraphqlResponse,
} from './types';
import NonPresenterViewComponent from './non-presenter-view/component';
import PresenterViewComponent from './presenter-view/component';
import { USERS_MORE_INFORMATION } from './subscriptions';
import { extractH5pContents } from '../plugin-manager/utils';
import { UserToBeRendered } from './presenter-view/types';

export function GenericContentRenderFunction(props: GenericContentRenderFunctionProps) {
  const {
    h5pContentText, currentUser,
    pluginUuid,
  } = props;

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const {
    data: h5pLatestStateUpdate,
  } = pluginApi.useDataChannel<UserH5pCurrentState>('testResult', DataChannelTypes.All_ITEMS, 'userH5pCurrentState');
  const [
    listOfStudentsToBeRendered,
    setListOfStudentsToBeRendered,
  ] = useState<UserToBeRendered[]>([]);
  useEffect(() => {
    const listOfStudents = h5pLatestStateUpdate?.data?.filter(
      (item) => item.payloadJson.userId !== currentUser?.userId,
    ).map((item) => ({
      userId: item.payloadJson.userId,
      userName: item.payloadJson.userName,
    }));
    if (!equals(listOfStudents, listOfStudentsToBeRendered)) {
      setListOfStudentsToBeRendered(listOfStudents);
    }
  }, [h5pLatestStateUpdate]);

  const currentUserPresenter = currentUser?.presenter;

  // TODO: Refactor the test results to be just a request done for an external server to be
  // validated and all
  const { pushEntry: pushEntryTestResult } = pluginApi.useDataChannel<TestResult>('testResult', DataChannelTypes.LATEST_ITEM);
  const { pushEntry: pushEntryLadTestResult } = pluginApi.useDataChannel<LADTestResult>('testResult', DataChannelTypes.LATEST_ITEM, 'learning-analytics-dashboard');

  const allUsersInfo = pluginApi.useCustomSubscription<UsersMoreInformationGraphqlResponse>(
    USERS_MORE_INFORMATION,
  );
  const usersList = allUsersInfo?.data?.user;

  const { contentAsJson, h5pAsJson } = extractH5pContents(h5pContentText);

  // TODO: Filter the ones where the loading is not done yet (needs refactor in html5)
  // if (responseUserH5pCurrentStateList.loading) return null;
  return (
    currentUserPresenter
      ? (
        <PresenterViewComponent
          pluginApi={pluginApi}
          usersList={usersList}
          contentAsJson={contentAsJson}
          listOfStudentsToBeRendered={listOfStudentsToBeRendered}
          h5pAsJson={h5pAsJson}
        />
      )
      : (
        <NonPresenterViewComponent
          pluginApi={pluginApi}
          currentUserName={currentUser?.name}
          currentUserId={currentUser?.userId}
          contentAsJson={contentAsJson}
          h5pAsJson={h5pAsJson}
          pushEntryTestResult={pushEntryTestResult}
          pushEntryLadTestResult={pushEntryLadTestResult}
        />
      )
  );
}
