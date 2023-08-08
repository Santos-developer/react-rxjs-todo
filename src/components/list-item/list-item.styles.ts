import styled from "styled-components";

export type TextProps = {
  completed: boolean;
};

const Wrapper = styled.li`
  list-style: none;
  padding: 1em;
  border-radius: 4px;
  background-color: #f4f4f4;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1em;
`;

const Text = styled.p<TextProps>`
  color: ${({ completed }) => (completed ? "#008000" : "#000000")};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const Button = styled.button`
  color: red;
  background-color: transparent;
  border-radius: 4px;
  border-width: 1px;
  border-color: red;
  border-radius: 4px;
  padding: 0.4em 0.8em;

  &:hover {
    color: white;
    background-color: red;
  }

  &:active {
    color: white;
    background-color: #990000;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;

const styles = {
  Wrapper,
  Text,
  Button,
  Buttons,
};

export default styles;
