import * as React from 'react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { renderH5pForPresenter } from '../../h5p-renderer/utils';
import { H5pPresenterComponentProps } from './types';

function H5pPresenterComponent(props: H5pPresenterComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentRendered, setContentRendered] = useState(false);

  const {
    contentAsJson, h5pAsJson,
    currentH5pStateToBeApplied,
    setLatestH5pStates, idOfCurrentState,
  } = props;

  useEffect(() => {
    if (setLatestH5pStates && contentRendered) {
      setLatestH5pStates((prev) => {
        const result = prev.map((state) => {
          const modifiedState = { ...state };
          if (state.id === idOfCurrentState) modifiedState.rendered = true;
          return modifiedState;
        });
        return result;
      });
    }
  }, [contentRendered, setLatestH5pStates, idOfCurrentState]);

  useEffect(() => {
    const timeoutReference = setTimeout(
      renderH5pForPresenter(
        containerRef,
        currentH5pStateToBeApplied,
        contentAsJson,
        h5pAsJson,
        setContentRendered,
        ['https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets/custom/css/custom-crossword.css'],
      ),
      100,
    );

    return () => {
      clearTimeout(timeoutReference);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        id="h5p-internal-container"
        style={{
          minWidth: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '2px 50px',
            width: '70%',
            position: 'absolute',
            blockSize: 'fit-content',
          }}
          ref={containerRef}
        />
      </div>
    </div>
  );
}

export default H5pPresenterComponent;
