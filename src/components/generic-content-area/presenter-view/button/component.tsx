import * as React from 'react';
import * as Styled from './styles';
import { ButtonProps } from './types';

export function Button(props: ButtonProps) {
  const { iconName, onClick } = props;
  return (
    <Styled.Button
      onClick={onClick}
    >
      <Styled.BBBIcon
        color="white"
        className={`icon-bbb-${iconName}`}
      />
    </Styled.Button>
  );
}
