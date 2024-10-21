import * as React from 'react';
import { DataChannelTypes } from 'bigbluebutton-html-plugin-sdk';
import { useEffect, useState } from 'react';
import { IterativeSyncCurrentStateProps, WindowWithH5p } from './types';
import H5pStateRendererComponent from '../h5p-state-renderer/component';
import { UserH5pCurrentState } from '../../../../types';
import { LiveUpdateCommonWrapper } from '../live-update-common-wrapper/component';

export function IterativeSyncCurrentState(props: IterativeSyncCurrentStateProps) {
  const {
    contentAsJson, h5pAsJson, isFullscreen, numberOfItemsPerPage,
    pluginApi, userId, userName, setFullscreenItem, setHasSyncCurentStateFlow,
  } = props;

  const [h5pDomElement, setH5pDomElement] = useState<HTMLIFrameElement>(null);
  const h5pStateController = h5pDomElement?.contentWindow as WindowWithH5p;

  const {
    data: responseUserH5pCurrentStateList,
  } = pluginApi.useDataChannel<UserH5pCurrentState>('testResult', DataChannelTypes.All_ITEMS, 'userH5pCurrentState');

  const dataToRender = responseUserH5pCurrentStateList?.data?.filter(
    (h5pState) => h5pState.payloadJson.userId === userId,
  ).map((h5pState) => (
    { entryId: h5pState.entryId, payloadJson: h5pState.payloadJson }))[0]?.payloadJson;

  useEffect(() => {
    const currentH5pStateToBeApplied = dataToRender?.currentState;
    if (
      currentH5pStateToBeApplied && currentH5pStateToBeApplied !== ''
    ) {
      h5pStateController?.H5P?.instances[0].setCurrentState(JSON.parse(currentH5pStateToBeApplied));
    }
  }, [responseUserH5pCurrentStateList]);

  useEffect(() => {
    if (h5pDomElement
      && !(h5pDomElement?.contentWindow as WindowWithH5p)?.H5P?.instances[0].setCurrentState) {
      setHasSyncCurentStateFlow(false);
    }
  }, [h5pDomElement]);

  if (responseUserH5pCurrentStateList.loading) return null;
  return (
    <LiveUpdateCommonWrapper
      isFullscreen={isFullscreen}
      numberOfItemsPerPage={numberOfItemsPerPage}
      userId={userId}
      userName={userName}
      setFullscreenItem={setFullscreenItem}
    >
      <H5pStateRendererComponent
        setH5pDomElement={setH5pDomElement}
        isResetH5pComponentFlow={false}
        currentH5pStateToBeApplied={dataToRender?.currentState}
        contentAsJson={contentAsJson}
        h5pAsJson={h5pAsJson}
      />
    </LiveUpdateCommonWrapper>
  );
}
