import { H5P } from 'h5p-standalone';
import { pluginLogger } from 'bigbluebutton-html-plugin-sdk';

export const renderH5p = (
  containerRef,
  isModeratorView,
  currentH5pStateToBeApplied,
  lastPayloadJson,
  setH5pState,
  contentAsJson,
  h5pAsJson,
  setContentRendered,
  customCss,
) => async () => {
  const el = containerRef.current;

  if (el) {
    if (!el.querySelector('.h5p-iframe-wrapper')) {
      const previousState = isModeratorView
        ? currentH5pStateToBeApplied : lastPayloadJson?.currentState;
      const options = {
        saveFreq: 1,
        saveFunctionCallback: !isModeratorView ? (state) => {
          const stringifiedCurrentState = JSON.stringify(state);
          if (window.currentH5pState !== stringifiedCurrentState) {
            window.currentH5pState = stringifiedCurrentState;
            setH5pState(state);
          }
        } : () => {},
        embedType: (isModeratorView) ? 'div' : 'iframe',
        frame: false,
        contentUserData: [
          {
            state: JSON.stringify(previousState),
          }],
        contentAsJson,
        h5pAsJson,
        customCss,
        h5pJsonPath: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets',
        frameJs: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets/frame.bundle.js',
        frameCss: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets/styles/h5p.css',
        assetsRequestFetchOptions: {},
      };
      await new H5P(el, options)
        .then((contentId) => {
          pluginLogger.info(`H5P container set with contentId: ${contentId}`);
          setContentRendered(true);
        });
    }
  }
};

export const renderH5pForNonPresenter = (
  containerRef,
  lastPayloadJson,
  setH5pState,
  contentAsJson,
  h5pAsJson,
  setContentRendered,
) => renderH5p(
  containerRef,
  false,
  undefined,
  lastPayloadJson,
  setH5pState,
  contentAsJson,
  h5pAsJson,
  setContentRendered,
);

export const renderH5pForPresenter = (
  containerRef,
  currentH5pStateToBeApplied,
  contentAsJson,
  h5pAsJson,
  setContentRendered,
  customCss,
) => renderH5p(
  containerRef,
  true,
  currentH5pStateToBeApplied,
  '',
  () => {},
  contentAsJson,
  h5pAsJson,
  setContentRendered,
  customCss,
);
