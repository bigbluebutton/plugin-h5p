import * as React from 'react';
import { BbbPluginSdk, DataChannelTypes } from 'bigbluebutton-html-plugin-sdk';
import { PresenterViewerRenderFunctionProps } from './types';
import * as Styled from './styles';
import { MoreInfoUser, TestResult, UsersMoreInformationGraphqlResponse } from '../../types';
import { extractH5pContents } from '../../../plugin-manager/utils';
import { H5pAsJsonObject } from '../../../../commons/types';
import { USERS_MORE_INFORMATION } from '../../subscriptions';

const mapObject = (results: TestResult[], usersList: MoreInfoUser[], presenterId: string) => (
  usersList?.map((item) => {
    const userResult = results?.filter((r) => (r.userId === item.userId))[0];
    return item.userId !== presenterId ? (
      <tr key={item.userId}>
        <Styled.ResultLeft>{item.name}</Styled.ResultLeft>
        <Styled.ResultRight>
          {userResult?.testResultObject}
          {userResult ? '/' : null}
          {userResult?.testResultMaximumScore}
        </Styled.ResultRight>
      </tr>
    ) : null;
  })
);

function PresenterViewerSidekickRenderResultFunction(props: PresenterViewerRenderFunctionProps) {
  const {
    currentUserId, pluginUuid, h5pContentText,
  } = props;
  const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const { data: testResultResponse } = pluginApi.useDataChannel<TestResult>('testResult', DataChannelTypes.All_ITEMS);
  const allUsersInfo = pluginApi.useCustomSubscription<UsersMoreInformationGraphqlResponse>(
    USERS_MORE_INFORMATION,
  );
  const usersList = allUsersInfo?.data?.user;
  const restults = testResultResponse.data?.map((data) => ({
    userId: data.payloadJson.userId,
    testResultObject: data.payloadJson.testResultObject,
    testResultMaximumScore: data.payloadJson.testResultMaximumScore,
  } as TestResult));

  let sidekickAreaTitle: string = 'No H5P content is playing';

  if (h5pContentText) {
    const { h5pAsJson } = extractH5pContents(h5pContentText);
    const h5pAsObject: H5pAsJsonObject = JSON.parse(h5pAsJson);
    sidekickAreaTitle = h5pAsObject.title;
  }

  return (
    <div
      id="h5p-container"
      style={
        {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }
      }
    >
      <h1>{sidekickAreaTitle}</h1>
      <table>
        <tbody>
          <tr>
            <Styled.THeading>Users</Styled.THeading>
            <Styled.THeading>Result</Styled.THeading>
          </tr>
          {mapObject(restults, usersList, currentUserId)}
        </tbody>
      </table>
    </div>
  );
}

export default PresenterViewerSidekickRenderResultFunction;
