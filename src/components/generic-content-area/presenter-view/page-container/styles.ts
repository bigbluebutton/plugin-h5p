import styled from 'styled-components';
import { H5pWrapperProps } from './types';

const LiveUpdatePlayerGrid = styled.div<H5pWrapperProps>`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ numberOfColumns }) => numberOfColumns}, 1fr);
`;

const PresenterViewComponentWrapper = styled.div`
  width: 100%;
  background: #F3F6F9;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 5px 0;
`;

export { LiveUpdatePlayerGrid, PresenterViewComponentWrapper };
