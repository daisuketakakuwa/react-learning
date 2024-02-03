import styled from "styled-components";

export const TrStyled = styled.tr`
  border: 1px solid black;
`;

export const ThStyled = styled.th`
  border: 1px solid black;
  padding: 10px;
`;

export const TdStyled = styled.td`
  border: 1px solid black;
  padding: 10px;
`;

export const PaginationButton = styled.button`
  background-color: ${({ $highlighted }) => ($highlighted ? 'blue' : 'white')};
  color: ${({ $highlighted }) => ($highlighted ? 'white' : '#4169e1')};
  border: 1px solid silver;
  cursor: pointer;
  width: 50px;
  padding: 5px 10px;

  &:disabled {
    cursor: not-allowed;
    background-color: #dce0e4;
    color: black;
  }

  &:hover {
    background-color: #dcdcdc;
  }
`;
