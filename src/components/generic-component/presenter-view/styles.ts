import styled from 'styled-components';

const ListItemRender = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 3px;
  &:hover {
    background-color: #d1dde8;
  }
`;

const H5pWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export { ListItemRender, H5pWrapper };
