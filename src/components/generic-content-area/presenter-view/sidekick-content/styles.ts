import styled from 'styled-components';

const colorGrayLightest = 'var(--color-gray-lightest, #D4D9DF)';

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

const THeading = styled.th`
  text-align: left;

  [dir="rtl"] & {
    text-align: right;
  }
`;

const ResultLeft = styled.td`
  padding: 0 .5rem 0 0;
  border-bottom: 1px solid ${colorGrayLightest};

  [dir="rtl"] & {
    padding: 0 0 0 .5rem;
  }
  padding-bottom: .25rem;
  word-break: break-all;
`;

const ResultRight = styled.td`
  padding-bottom: .25rem;
  word-break: break-all;
`;

export {
  ListItemRender, ResultRight, ResultLeft, THeading,
};
