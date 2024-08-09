import { pluginLogger } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { PresenterViewComponentProps } from './types';
import * as Styled from './styles';
import { H5pPlayerManagerComponent } from './h5p-player-manager/component';

function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    pluginApi, contentAsJson, h5pAsJson, listOfStudentsToBeRendered,
  } = props;

  pluginLogger.debug(`Debug log from Presenter View Component (Showing dataToBeRendered): ${listOfStudentsToBeRendered}`);
  return (
    <div
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
      <Styled.H5pWrapper
        id="h5p-wrapper"
      >
        {listOfStudentsToBeRendered?.map((item) => (
          <H5pPlayerManagerComponent
            key={item.userId}
            userId={item.userId}
            userName={item.userName}
            contentAsJson={contentAsJson}
            pluginApi={pluginApi}
            h5pAsJson={h5pAsJson}
          />
        ))}
      </Styled.H5pWrapper>
    </div>
  );
}

export default PresenterViewComponent;
