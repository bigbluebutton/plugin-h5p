import { pluginLogger } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { useState } from 'react';
import { PresenterViewComponentProps, UserToBeRendered } from './types';
import * as Styled from './styles';
import { LiveUpdatePlayerComponent } from './live-update/live-update-player/component';
import { FullscreenLiveUpdatePlayer } from './live-update/fullscreen-live-update-player/component';

function PageContainerForLiveUpdates(props: PresenterViewComponentProps) {
  const {
    pluginApi, contentAsJson, h5pAsJson, listOfStudentsToBeRendered,
  } = props;

  const [fullscreenItem, setFullscreenItem] = useState<UserToBeRendered>();

  const numberOfColumns = Math.min(4, Math.ceil(Math.sqrt(listOfStudentsToBeRendered?.length)));

  pluginLogger.debug(`Debug log from Presenter View Component (Showing dataToBeRendered): ${listOfStudentsToBeRendered}`);
  return (
    <Styled.PresenterViewComponentWrapper>
      {
      fullscreenItem
        ? (
          <FullscreenLiveUpdatePlayer
            userId={fullscreenItem.userId}
            userName={fullscreenItem.userName}
            contentAsJson={contentAsJson}
            pluginApi={pluginApi}
            setFullscreenItem={setFullscreenItem}
            h5pAsJson={h5pAsJson}
          />
        ) : null
      }
      <Styled.LiveUpdatePlayerGrid
        numberOfColumns={numberOfColumns}
        id="h5p-wrapper"
      >
        {listOfStudentsToBeRendered?.map((item) => (
          <LiveUpdatePlayerComponent
            key={item.userId}
            isFullscreen={false}
            numberOfItemsPerPage={listOfStudentsToBeRendered.length}
            setFullscreenItem={setFullscreenItem}
            userId={item.userId}
            userName={item.userName}
            contentAsJson={contentAsJson}
            pluginApi={pluginApi}
            h5pAsJson={h5pAsJson}
          />
        ))}
      </Styled.LiveUpdatePlayerGrid>
    </Styled.PresenterViewComponentWrapper>
  );
}

export default PageContainerForLiveUpdates;
