import styled from 'styled-components';

interface LockedDivProps {
  readOnly: boolean;
}

const ScrollboxVertical = styled.div`
  overflow-y: auto;
  padding: 2px 50px;
  width: 70%;
  background: linear-gradient(white 30%, rgba(255,255,255,0)),
    linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,
    /* Shadows */
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), rgba(0,0,0,0)),
    radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;

  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;

  // Fancy scroll
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.25);
    border: none;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.5); }
  &::-webkit-scrollbar-thumb:active { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,.25);
    border: none;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track:hover { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-track:active { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-corner { background: 0 0; }
`;

const LockedDiv = styled.div<LockedDivProps>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 100;
  ${({ readOnly }) => !readOnly && `
    display: none;
  `}
  &:hover {
    cursor: not-allowed;
  }
`;

export { ScrollboxVertical, LockedDiv };