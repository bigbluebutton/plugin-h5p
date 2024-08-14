import * as React from 'react';
import { LiveUpdatePlayerComponent } from '../live-update-player/component';
import { FullscreenLiveUpdatePlayerProps } from './types';
import * as Styled from './styles';

export function FullscreenLiveUpdatePlayer(props: FullscreenLiveUpdatePlayerProps) {
  const {
    userId,
    userName,
    pluginApi,
    h5pAsJson,
    contentAsJson,
    setFullscreenItem,
  } = props;
  const unsetFullscreen = () => {
    setFullscreenItem(null);
  };
  return (
    <Styled.FullscreenLiveUpdatePlayerWrapper>
      <Styled.LockedDiv
        onClick={unsetFullscreen}
      />
      <Styled.FullscreenLiveUpdateBackground>
        <LiveUpdatePlayerComponent
          userId={userId}
          isFullscreen
          numberOfItemsPerPage={1}
          userName={userName}
          contentAsJson={contentAsJson}
          pluginApi={pluginApi}
          h5pAsJson={h5pAsJson}
        />
      </Styled.FullscreenLiveUpdateBackground>
    </Styled.FullscreenLiveUpdatePlayerWrapper>
  );
}
