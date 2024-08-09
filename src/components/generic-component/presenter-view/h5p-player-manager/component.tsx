import * as React from 'react';
import { DataChannelTypes } from 'bigbluebutton-html-plugin-sdk';
import * as uuidLib from 'uuid';
import { useEffect, useState } from 'react';
import { H5pPlayerManagerComponentProps, LatestH5pStateItem } from './types';
import H5pPresenterComponent from '../h5p-presenter-component/component';
import { UserH5pCurrentState } from '../../types';

export function H5pPlayerManagerComponent(props: H5pPlayerManagerComponentProps) {
  const {
    contentAsJson, h5pAsJson,
    pluginApi, userId, userName,
  } = props;

  const {
    data: responseUserH5pCurrentStateList,
  } = pluginApi.useDataChannel<UserH5pCurrentState>('testResult', DataChannelTypes.All_ITEMS, 'userH5pCurrentState');

  const dataToRender = responseUserH5pCurrentStateList?.data?.filter(
    (h5pState) => h5pState.payloadJson.userId === userId,
  ).map((h5pState) => (
    { entryId: h5pState.entryId, payloadJson: h5pState.payloadJson }))[0]?.payloadJson;

  const [latestH5pStates, setLatestH5pStates] = useState<LatestH5pStateItem[]>([]);

  useEffect(() => {
    const currentH5pStateToBeApplied = dataToRender?.currentState;
    if (
      currentH5pStateToBeApplied && currentH5pStateToBeApplied !== ''
      && (latestH5pStates.length === 0
        || currentH5pStateToBeApplied !== latestH5pStates[latestH5pStates.length - 1].state)
    ) {
      setLatestH5pStates((list) => {
        const resultList = [...list, {
          state: currentH5pStateToBeApplied, rendered: false, id: uuidLib.v4(),
        }];
        return resultList;
      });
    }
  }, [responseUserH5pCurrentStateList]);

  return (
    <div
      key={userId}
      style={{ minWidth: '100%' }}
    >
      <h2>{userName}</h2>
      <div>
        {latestH5pStates.filter(
          (state, index) => !state.rendered
          || index === latestH5pStates.length - 1
          || !latestH5pStates[index + 1]?.rendered,
        ).map((state, index) => (
          <H5pPresenterComponent
            key={state.id}
            indexOfCurrentStateInList={index}
            stateListLength={latestH5pStates.length}
            setLatestH5pStates={setLatestH5pStates}
            currentH5pStateToBeApplied={state.state}
            idOfCurrentState={state.id}
            contentAsJson={contentAsJson}
            h5pAsJson={h5pAsJson}
          />
        ))}
      </div>
    </div>
  );
}
