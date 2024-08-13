import * as React from 'react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { renderH5pForPresenter } from '../../../../../h5p-renderer/utils';
import { H5pPresenterComponentProps } from './types';

function H5pStateRendererComponent(props: H5pPresenterComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentRendered, setContentRendered] = useState(false);

  const {
    contentAsJson, h5pAsJson,
    currentH5pStateToBeApplied,
    setLatestH5pStates, idOfCurrentState,
  } = props;

  useEffect(() => {
    if (setLatestH5pStates && contentRendered) {
      setTimeout(() => setLatestH5pStates((prev) => {
        const result = prev.map((state) => {
          const modifiedState = { ...state };
          if (state.id === idOfCurrentState) modifiedState.rendered = true;
          return modifiedState;
        });
        return result;
      }), 50);
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
        ['/plugins/h5p/assets/css/custom-crossword.css'],
      ),
      50,
    );

    return () => {
      clearTimeout(timeoutReference);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0)',
      }}
    >
      <div
        id="h5p-internal-container"
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxHeight: '100%',
          }}
          ref={containerRef}
        />
      </div>
    </div>
  );
}

export default H5pStateRendererComponent;
