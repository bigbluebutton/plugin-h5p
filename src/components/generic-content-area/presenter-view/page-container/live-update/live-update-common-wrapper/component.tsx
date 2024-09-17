import * as React from 'react';
import * as Styled from './styles';
import { LiveUpdateCommonWrapperProps } from './types';

export function LiveUpdateCommonWrapper(props: LiveUpdateCommonWrapperProps) {
  const {
    isFullscreen, numberOfItemsPerPage, children,
    userId, userName, setFullscreenItem,
  } = props;
  const setFullscreen = (!isFullscreen) ? () => {
    if (numberOfItemsPerPage > 1) setFullscreenItem({ userId, userName });
  } : null;
  return (
    <Styled.LiveUpdatePlayerWrapper
      key={userId}
    >
      <Styled.UserNameTitle>
        {userName}
      </Styled.UserNameTitle>
      <Styled.UserLiveUpdatePlayerWrapper>
        <Styled.LockedDiv
          numberOfItemsPerPage={numberOfItemsPerPage}
          onClick={() => {
            if (setFullscreen) setFullscreen();
          }}
        />
        {children}

      </Styled.UserLiveUpdatePlayerWrapper>
    </Styled.LiveUpdatePlayerWrapper>
  );
}
