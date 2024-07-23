import { pluginLogger } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import * as React from 'react';
import { PresenterViewComponentProps } from './types';
import { UserH5pCurrentState } from '../types';
import * as Styled from './styles';
import { H5pPlayerManagerComponent } from './h5p-player-manager/component';

const mapObject = (
  currentUserH5pStateList: DataChannelEntryResponseType<UserH5pCurrentState>[],
  contentAsJson: string,
  h5pAsJson: string,
) => (
  currentUserH5pStateList?.map((item) => (
    <H5pPlayerManagerComponent
      key={item.payloadJson.userId}
      userId={item.payloadJson.userId}
      userName={item.payloadJson.userName}
      contentAsJson={contentAsJson}
      currentH5pStateToBeApplied={(item.payloadJson.currentState)
        ? JSON.parse(item.payloadJson.currentState) : {}}
      h5pAsJson={h5pAsJson}
    />
  ))
);

function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    currentUserId,
    h5pLatestStateUpdate, contentAsJson, h5pAsJson,
  } = props;

  const dataToBeRendered = h5pLatestStateUpdate?.data?.filter(
    (item) => item.payloadJson.userId !== currentUserId,
  );

  pluginLogger.debug(`Debug log from Presenter View Component (Showing dataToBeRendered): ${dataToBeRendered}`);
  return (
    <div
      id="h5p-container"
      style={
        {
          width: '100%',
          background: '#F3F6F9',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 40px',
        }
      }
    >
      <Styled.H5pWrapper>
        {mapObject(dataToBeRendered, contentAsJson, h5pAsJson)}
      </Styled.H5pWrapper>
    </div>
  );
}

export default PresenterViewComponent;
