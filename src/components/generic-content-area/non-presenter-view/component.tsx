import * as React from 'react';
import { DataChannelTypes } from 'bigbluebutton-html-plugin-sdk';
import { useEffect, useRef, useState } from 'react';
import { renderH5pForNonPresenter } from '../../../h5p-renderer/utils';
import { NonPresenterViewComponentProps } from './types';
import * as Styled from './styles';
import { CurrentH5pStateWindow, H5pAsJsonObject } from '../../../commons/types';
import { UserH5pCurrentState } from '../types';

declare const window: CurrentH5pStateWindow;

function NonPresenterViewComponent(props: NonPresenterViewComponentProps) {
  const stopInfinitLoop = useRef(false);
  const containerRef = useRef(null);

  const [contentRendered, setContentRendered] = useState(false);
  const [h5pState, setH5pState] = useState({});
  const {
    contentAsJson, currentUserName, h5pAsJson, pushEntryTestResult,
    pushEntryLadTestResult, currentUserId, pluginApi,
  } = props;

  const {
    data: responseUserH5pCurrentStateList,
    pushEntry: pushH5pCurrentState,
    replaceEntry: replaceH5pCurrentState,
  } = pluginApi.useDataChannel<UserH5pCurrentState>('testResult', DataChannelTypes.All_ITEMS, 'userH5pCurrentState');

  const responseObject = responseUserH5pCurrentStateList?.data?.filter(
    (h5pStateFromList) => h5pStateFromList.payloadJson.userId === currentUserId,
  ).map((h5pStateFromList) => (
    { entryId: h5pStateFromList.entryId, payloadJson: h5pStateFromList.payloadJson }))[0];

  const lastUpdateId = responseObject?.entryId;
  const lastPayloadJson = responseObject?.payloadJson.currentState;
  const h5pAsJsonObject: H5pAsJsonObject = JSON.parse(h5pAsJson);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventHandler = (event: any) => {
    if (event.getScore && event.getMaxScore && event.getVerb
      && pushEntryTestResult && pushEntryLadTestResult) {
      const score = event.getScore();
      const maxScore = event.getMaxScore();
      const verb = event.getVerb();
      if (verb === 'answered') {
        pluginApi.sendGenericDataForLearningAnalyticsDashboard({
          columnTitle: h5pAsJsonObject.title,
          value: `${parseFloat(score)} / ${parseFloat(maxScore)}`,
          cardTitle: 'H5P',
        });
        pushEntryTestResult({
          testResultActivityTitle: h5pAsJsonObject.title,
          userId: currentUserId,
          testResultObject: score,
          testResultMaximumScore: maxScore,
        });
      }
    }
  };

  useEffect(() => {
    if (pushH5pCurrentState
      && h5pState
      && Object.keys(h5pState).length !== 0 && replaceH5pCurrentState) {
      const currentState = JSON.stringify(h5pState);
      if (lastUpdateId) {
        replaceH5pCurrentState(lastUpdateId, {
          userName: currentUserName,
          userId: currentUserId,
          currentState,
        });
      } else {
        pushH5pCurrentState({
          userName: currentUserName,
          userId: currentUserId,
          currentState,
        });
      }
    }
  }, [h5pState]);
  useEffect(() => {
    if (responseUserH5pCurrentStateList) {
      window.H5P?.externalDispatcher?.on('xAPI', eventHandler);
      const timeoutReference = setTimeout(
        renderH5pForNonPresenter(
          containerRef,
          lastPayloadJson,
          setH5pState,
          contentAsJson,
          h5pAsJson,
          setContentRendered,
        ),
        100,
      );

      return () => {
        window.H5P?.externalDispatcher?.off('xAPI', eventHandler);
        clearTimeout(timeoutReference);
      };
    }
    return null;
  }, [responseUserH5pCurrentStateList]);
  if (pushEntryTestResult
    && pushEntryLadTestResult && !stopInfinitLoop.current && contentRendered) {
    stopInfinitLoop.current = true;
    window.H5P?.externalDispatcher?.on('xAPI', eventHandler);
  }

  return (
    <div
      id="h5p-container"
      style={
        {
          width: '100%',
          background: '#F3F6F9',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }
      }
    >
      <Styled.ScrollboxVertical
        ref={containerRef}
      />
    </div>
  );
}

export default NonPresenterViewComponent;
