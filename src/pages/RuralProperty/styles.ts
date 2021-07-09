import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  button {
    flex: 1;
    text-align: center;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #65493D;
    color: #FFFCE9;
    margin-top: 27px;
    margin-left: 87%;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 780px) {
      margin-left: 0%;
      flex: 1;
      
    }
    .text {
      padding: 16px 24px;
    }
  }
  
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #FFFCE9;
`;

export const CardContainer = styled.div`
  margin-top: -100px;
  background: #B47957;
  padding: 22px 20px;
  border-radius: 5px;
`;

export const Message = styled.div`

  background: #ECCE9C;
  padding: 22px 32px;
  border-radius: 5px;
`;

export const TableContainer = styled.section`
  table {
    border-spacing: 0 8px;
    overflow-x: auto;
    display: block;

    thead, tbody {
      width: 100%;
      flex: 1;
    }
    
    th {
      width: 25%;
      color: #FFFCE9;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      width: 25%;
      padding: 20px 32px;
      border: 0;
      background: #ECCE9C;
      font-size: 16px;
      font-weight: normal;
      color: #65493D;
      div {  
        display:flex;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const Button = styled.div``