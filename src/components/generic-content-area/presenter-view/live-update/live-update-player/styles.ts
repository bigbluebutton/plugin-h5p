import styled from 'styled-components';

interface LockedDivProps {
  zIndex?: number;
}

const LockedDiv = styled.div<LockedDivProps>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 100;
  &:hover {
    cursor: zoom-in;
  }
`;

const LiveUpdatePlayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

const UserNameTitle = styled.h2`
  margin: .5em;
`;

const UserLiveUpdatePlayerWrapper = styled.div`
  height: 100%;
`;

export {
  LockedDiv,
  LiveUpdatePlayerWrapper,
  UserNameTitle,
  UserLiveUpdatePlayerWrapper,
};
