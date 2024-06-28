import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import * as React from 'react';
import { PresenterViewComponentProps } from './types';
import { UserH5pCurrentState } from '../types';
import * as Styled from './styles';
import { H5pPlayerManagerComponent } from './h5p-player-manager/component';

const mapObject = (
  currentUserH5pStateList: DataChannelEntryResponseType<UserH5pCurrentState>[],
  jsonContent: string,
) => (
  currentUserH5pStateList?.map((item) => (
    <H5pPlayerManagerComponent
      key={item.payloadJson.userId}
      userName={item.payloadJson.userName}
      currentH5pStateToBeApplied={(item.payloadJson.currentState)
        ? JSON.parse(item.payloadJson.currentState) : {}}
      jsonContent={jsonContent}
    />
  ))
);

function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    h5pLatestStateUpdate, jsonContent, testResult,
  } = props;

  const userIdTestResultList = testResult?.data?.map((item) => item.payloadJson.userId);
  const dataToBeRendered = h5pLatestStateUpdate?.data?.filter(
    (item) => !userIdTestResultList?.includes(item?.payloadJson.userId),
  );

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
        {mapObject(dataToBeRendered, jsonContent)}
      </Styled.H5pWrapper>
    </div>
  );
}

export default PresenterViewComponent;
