import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 220px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #f7fbff;
  font-size: 1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  padding: 14px 20px;
  border-radius: 16px;
  border: none;
  background: ${(props) =>
    props.variant === "outline" ? "rgba(255, 255, 255, 0.1)" : "linear-gradient(135deg, #ffc857, #ff9a3c)"};
  color: ${(props) => (props.variant === "outline" ? "#f7fbff" : "#0b1d2a")};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  min-width: ${(props) => (props.full ? "140px" : "auto")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.variant === "outline" ? "0 6px 16px rgba(0,0,0,0.25)" : "0 10px 24px rgba(255, 152, 60, 0.4)"};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  onUseLocation,
  isLoading,
  isLocating,
}) => (
  <Form
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit?.();
    }}
  >
    <Input
      type="text"
      placeholder="Search city or region"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
    <Button type="submit" disabled={isLoading} full>
      {isLoading ? "Searching..." : "Search"}
    </Button>
    <Button type="button" variant="outline" onClick={onUseLocation} disabled={isLocating}>
      {isLocating ? "Locating..." : "Use my location"}
    </Button>
  </Form>
);

export default SearchBar;

