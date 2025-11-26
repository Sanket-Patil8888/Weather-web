import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid rgba(255, 99, 99, 0.4);
  background: rgba(255, 99, 99, 0.15);
  color: #ffd7d7;
  font-size: 0.95rem;
`;

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <Banner role="alert">⚠️ {message}</Banner>;
};

export default ErrorMessage;

