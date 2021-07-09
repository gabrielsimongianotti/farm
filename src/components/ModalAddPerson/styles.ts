import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }
  
`;

export const Div = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  
  button {
    margin: 10px;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #65493D;
    color: #FFFCE9;
    
    .text {
      padding: 16px 24px;
    
    }
    @media (max-width: 1262px) {
      flex: 1;   
    }
  }
  
  @media (max-width: 1262px) {
    flex-direction: column;
    margin-left:0px;
  }
`;

export const Camp = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  div {
    display: flex;
    width:100%;
    margin: 0px 24px 24px 0px;

    & + div {
      margin: 0px 0px 24px 0px;
    }
  }

  @media (max-width: 1411px) {
    flex-direction: column;
    margin-left:0px;
  }
`;