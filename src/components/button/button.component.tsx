import styled from "styled-components";

export const Button = styled.button`
  padding: 0.8em 1em;
  font-weight: 500;

  border-radius: 4px;
  border-width: 1px;
  border-color: #ccc;

  color: #ffffff;
  background-color: #000000;

  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }

  &:active {
    background-color: #818181;
  }
`;
