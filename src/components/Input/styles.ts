import styled, { css } from 'styled-components';

interface IContainerProps {
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  background: #ECCE9C;
  border-radius: 8px;

  border-left: 5px solid #ECCE9C;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  & + div {
    margin-top: 24px;
  }

  ${props => props.isErrored && css`
    border-left: 5px solid #c53030;
  `}
  ${props => props.isDisabled && css`
    background: #e6c287;
    border-left: 5px solid #e6c287;
  `}

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }
 
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #65493D;
    font-size: 18px;
    &::placeholder {
      color: #65493D;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Div = styled.div`
  padding: 18px 24px;
  width: 100%;

`