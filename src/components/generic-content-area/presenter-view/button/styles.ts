import styled from 'styled-components';

const BBBIcon = styled.i`
  ${({ color }) => color && `
    color: ${color};
  `}
  width: 1em;
  height: 1em;
  text-align: center;

  &:before {
    width: 1em;
    height: 1em;
  }

  .buttonWrapper & {
    font-size: 125%;
  }
`;

// position: absolute;
// left: 1.5em;

const Button = styled.button`
  border: 0;
  vertical-align: middle;

  border-radius: .5em;
  max-width: 3em;
  max-height: 3em;
  padding: .4em .15em .4em .65em;
  box-sizing: border-box;
  background: #0F70D7;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  &:hover {
    cursor: pointer;
  }
`;

export { BBBIcon, Button };
