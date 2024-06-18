import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  GenericContentMainArea,
  PluginApi,
  LayoutPresentatioAreaUiDataNames,
  UiLayouts,
  CurrentPresentation,
  PresentationToolbarButton,
  pluginLogger,
  RESET_DATA_CHANNEL,
  DataChannelTypes,
} from 'bigbluebutton-html-plugin-sdk';

import { GenericContentRenderFunction } from '../generic-component/component';

import { H5pPluginProps } from './types';
import { isValidJSON } from './utils';

interface DataToGenericLink {
  contentJson?: string,
  link?: string,
}

function H5pPlugin(
  { pluginUuid: uuid }: H5pPluginProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const SEARCH_PATTERN = /H5P(\s*\{(.|\n|\r\n)*\})/g;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [showingPresentationContent, setShowingPresentationContent] = useState(false);
  const { data: currentUser } = pluginApi.useCurrentUser();
  const currentPresentationResponse = pluginApi.useCurrentPresentation();
  const [jsonContentResponse, jsonContentPushFunction, jsonContentDeleteEntries] = pluginApi.useDataChannel<DataToGenericLink>('jsonContent', DataChannelTypes.LATEST_ITEM);
  const [contentJson, setContentJson] = useState<string>(null);
  const [currentText, setCurrentText] = useState<string>(null);
  const [linkThatGeneratedJsonContent, setLinkThatGeneratedJsonContent] = useState<string>();
  const [genericContentId, setGenericContentId] = useState<string>('');

  const currentLayout = pluginApi.useUiData(LayoutPresentatioAreaUiDataNames.CURRENT_ELEMENT, [{
    isOpen: true,
    genericContentId: '',
    currentElement: UiLayouts.WHITEBOARD,
  }]);

  useEffect(() => {
    const isGenericContentInPile = currentLayout.some((gc) => (
      gc.currentElement === UiLayouts.GENERIC_CONTENT
      && gc.genericContentId === genericContentId
    ));
    if (isGenericContentInPile) {
      setShowingPresentationContent(true);
    } else setShowingPresentationContent(false);
  }, [currentLayout]);

  const handleChangePresentationAreaContent = (changeToShare: boolean) => {
    if (!changeToShare) {
      setShowingPresentationContent(false);
    } else {
      setShowingPresentationContent(true);
    }
  };

  const requestCurrentPage = (currentTxtUri: string) => fetch(currentTxtUri)
    .then((response) => response.text());

  const handleFetchPresentationData = (
    currentPres: CurrentPresentation,
  ) => {
    const currentTxtUri = currentPres?.currentPage?.urlsJson?.text;
    pluginLogger.info('Trying to fetch the slide text in the following URI:', currentTxtUri);
    if (currentTxtUri) {
      requestCurrentPage(currentTxtUri).then((currentPageContent) => {
        const match = SEARCH_PATTERN.exec(currentPageContent);
        if (match && match.length > 0) {
          const longest = match.sort((a, b) => b.length - a.length);
          const indexOfH5P = longest[0].indexOf('H5P');
          const jsonContent = longest[0].substring(indexOfH5P + 3).replace(/(\r\n|\n|\r)/gm, '');
          if (isValidJSON(jsonContent)) {
            setLinkThatGeneratedJsonContent(currentTxtUri);
            setCurrentText(jsonContent);
          } else setCurrentText(null);
        } else {
          setCurrentText(null);
        }
      }).catch((err) => {
        pluginLogger.error(`Error while requesting data from bbb-web. Could not get the base text, error: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const { data: currentPresentation } = currentPresentationResponse;
    if (currentUser?.presenter) handleFetchPresentationData(currentPresentation);
  }, [currentPresentationResponse, currentUser]);

  useEffect(() => {
    if (
      jsonContentResponse.data
      && jsonContentResponse?.data[0]?.payloadJson
    ) {
      const contentJsonFromDataChannel = jsonContentResponse
        .data[
          0
        ]?.payloadJson.contentJson;
      setContentJson(contentJsonFromDataChannel);
      setLinkThatGeneratedJsonContent(jsonContentResponse?.data[0]?.payloadJson.link);
      handleChangePresentationAreaContent(true);
    } else if (
      jsonContentResponse.data
      && !jsonContentResponse
        .data[0]?.payloadJson
    ) {
      setContentJson(null);
      handleChangePresentationAreaContent(false);
    }
  }, [jsonContentResponse]);

  useEffect(() => {
    if (currentUser?.presenter && currentText) {
      const currentObjectToSendToClient = new PresentationToolbarButton({
        label: 'Play H5P',
        tooltip: 'An H5P has been detected in this slide, show it to all?',
        onClick: () => {
          jsonContentPushFunction({ contentJson: currentText, link: linkThatGeneratedJsonContent });
        },
      });
      pluginApi.setPresentationToolbarItems([currentObjectToSendToClient]);

      if (showingPresentationContent) {
        pluginApi.setActionButtonDropdownItems([
          new ActionButtonDropdownSeparator(),
          new ActionButtonDropdownOption({
            label: 'Remove H5P from presentation area',
            icon: 'copy',
            tooltip: 'Remove H5P plugin',
            allowed: true,
            onClick: () => {
              jsonContentDeleteEntries([RESET_DATA_CHANNEL]);
            },
          }),
        ]);
      } else {
        pluginApi.setActionButtonDropdownItems([]);
      }
    } else {
      if (!showingPresentationContent) pluginApi.setActionButtonDropdownItems([]);
      pluginApi.setPresentationToolbarItems([]);
    }
  }, [currentUser, showingPresentationContent, currentText]);

  useEffect(() => {
    if (contentJson && contentJson !== '') {
      setGenericContentId(pluginApi.setGenericContentItems([
        new GenericContentMainArea({
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <GenericContentRenderFunction
                  jsonContent={contentJson}
                  currentUser={currentUser}
                  pluginUuid={uuid}
                  linkThatGeneratedJsonContent={linkThatGeneratedJsonContent}
                />
              </React.StrictMode>,
            );
          },
        }),
      ])[0]);
    } else {
      pluginApi.setGenericContentItems([]);
    }
  }, [contentJson, currentUser]);
  return null;
}

export default H5pPlugin;
