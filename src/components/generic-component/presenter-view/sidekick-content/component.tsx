import * as React from 'react';
import { BbbPluginSdk, DataChannelTypes } from 'bigbluebutton-html-plugin-sdk';
import { PresenterViewerRenderFunctionProps } from './types';
import * as Styled from './styles';
import { MoreInfoUser, TestResult } from '../../types';
import { extractH5pContents } from '../../../h5p-plugin/utils';
import { H5pAsJsonObject } from '../../../../commons/types';

const mapObject = (results: TestResult[], usersList: MoreInfoUser[], presenterId: string) => (
  usersList?.map((item) => {
    const userResult = results?.filter((r) => (r.userId === item.userId))[0];
    return item.userId !== presenterId ? (
      <Styled.ListItemRender
        key={item.userId}
      >
        <span>
          Name:
          {' '}
          {item.name}
        </span>
        <span>
          Score:
          {' '}
          {userResult?.testResultObject}
          {userResult ? '/' : null}
          {userResult?.testResultMaximumScore}
        </span>
      </Styled.ListItemRender>
    ) : null;
  })
);

function PresenterViewerSidekickRenderResultFunction(props: PresenterViewerRenderFunctionProps) {
  const {
    usersList, currentUserId, pluginUuid, h5pContentText,
  } = props;
  const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const { data: testResultResponse } = pluginApi.useDataChannel<TestResult>('testResult', DataChannelTypes.All_ITEMS);
  const restults = testResultResponse.data?.map((data) => ({
    userId: data.payloadJson.userId,
    testResultObject: data.payloadJson.testResultObject,
    testResultMaximumScore: data.payloadJson.testResultMaximumScore,
  } as TestResult));

  let sidekickAreaTitle: string = 'No h5p content is playing';

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
      {mapObject(restults, usersList, currentUserId)}
    </div>
  );
}

export default PresenterViewerSidekickRenderResultFunction;
