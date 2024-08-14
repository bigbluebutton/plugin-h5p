import styled from 'styled-components';

const FullscreenLiveUpdatePlayerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(100, 100, 100, 0.8);
  z-index: 101;
`;

const FullscreenLiveUpdateBackground = styled.div`
  position: absolute;  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 60%;
  z-index: 102;
  background: #F3F6F9;
  border-radius: 5px;
`;

const LockedDiv = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;

  z-index: 103;
  &:hover {
    cursor: zoom-out;
  }
`;

export { FullscreenLiveUpdatePlayerWrapper, LockedDiv, FullscreenLiveUpdateBackground };
