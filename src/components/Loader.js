import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`;

const Spinner = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #ffb347;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
);

export default Loader;

