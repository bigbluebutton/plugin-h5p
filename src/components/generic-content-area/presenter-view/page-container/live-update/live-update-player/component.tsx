import { useState } from 'react';
import * as React from 'react';
import { LiveUpdatePlayerComponentProps } from './types';
import { IterativeSyncCurrentState } from '../iterative-sync-current-state/component';
import { IterativeResetH5PComponent } from '../iterative-reset-h5p-component/component';

export function LiveUpdatePlayerComponent(props: LiveUpdatePlayerComponentProps) {
  const {
    contentAsJson, h5pAsJson, isFullscreen, numberOfItemsPerPage,
    pluginApi, userId, userName, setFullscreenItem,
  } = props;
  const [hasSyncCurentStateFlow, setHasSyncCurentStateFlow] = useState<boolean>(true);
  return (hasSyncCurentStateFlow) ? (
    <IterativeSyncCurrentState
      contentAsJson={contentAsJson}
      h5pAsJson={h5pAsJson}
      isFullscreen={isFullscreen}
      numberOfItemsPerPage={numberOfItemsPerPage}
      pluginApi={pluginApi}
      userId={userId}
      userName={userName}
      setHasSyncCurentStateFlow={setHasSyncCurentStateFlow}
      setFullscreenItem={setFullscreenItem}
    />
  ) : (
    <IterativeResetH5PComponent
      contentAsJson={contentAsJson}
      h5pAsJson={h5pAsJson}
      isFullscreen={isFullscreen}
      numberOfItemsPerPage={numberOfItemsPerPage}
      pluginApi={pluginApi}
      userId={userId}
      userName={userName}
      setFullscreenItem={setFullscreenItem}
    />
  );
}
