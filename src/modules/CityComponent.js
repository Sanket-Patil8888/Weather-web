import styled from "styled-components";
import React from "react";

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  margin: 20px 0 10px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.5s ease-out 0.2s both;
  
  &:focus-within {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.1));
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 17px;
    gap: 11px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    gap: 10px;
    margin: 16px 0 8px;
    border-radius: 16px;
  }
  
  @media (max-width: 360px) {
    padding: 12px 14px;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    padding: 10px 12px;
    margin: 12px 0 6px;
  }

  & input {
    flex: 1;
    padding: 0;
    font-size: 15px;
    border: none;
    outline: none;
    font-weight: 400;
    color: #FFFFFF;
    background: transparent;
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
    
    @media (max-width: 360px) {
      font-size: 13px;
    }
    
    ::placeholder {
      color: #BFD7EA;
      opacity: 0.6;
    }
  }
  & button {
    min-width: 120px;
    padding: 12px 18px;
    border-radius: 16px;
    background: linear-gradient(135deg, #FFC857, #FFB84D);
    font-size: 14px;
    color: #0C1B2A;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 200ms ease;
    box-shadow: 0 4px 12px rgba(255, 200, 87, 0.3);
    
    @media (max-width: 480px) {
      min-width: 100px;
      padding: 10px 16px;
      font-size: 13px;
    }
    
    @media (max-width: 360px) {
      min-width: 100%;
      width: 100%;
      padding: 12px 16px;
    }
    position: relative;
    overflow: hidden;
    
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    &:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 28px rgba(255, 204, 51, 0.5);
      
      &::before {
        width: 300px;
        height: 300px;
      }
    }
    
    &:active {
      transform: translateY(0) scale(0.98);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  }
`;

const ChooseCityLabel = styled.span`
  margin: 8px auto 4px;
  font-size: 1.125rem;
  font-weight: 500;
  color: #FFFFFF;
  text-align: center;
  display: block;
`;

const ErrorText = styled.p`
  color: #FF8787;
  font-size: 0.875rem;
  margin: 8px 4px 12px;
  text-align: center;
  font-weight: 400;
`;

const QuickPickLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #BFD7EA;
  margin: 16px 2px 10px;
  display: block;
  font-weight: 600;
`;

const QuickPickRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
  
  @media (max-width: 360px) {
    gap: 6px;
  }
`;

const QuickPickButton = styled.button`
  flex: 1 1 45%;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.4s ease-out both;
  position: relative;
  overflow: hidden;
  
  &:nth-child(1) { animation-delay: 0.25s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.35s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.45s; }
  &:nth-child(6) { animation-delay: 0.5s; }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.2);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1);
  }
  
  @media (max-width: 480px) {
    flex: 1 1 calc(50% - 4px);
    padding: 10px 12px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    flex: 1 1 100%;
    padding: 10px 12px;
    font-size: 0.75rem;
  }
  
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const CityComponent = ({ updateCity, fetchWeather, isLoading, error, city, quickCities }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  const handleQuickPick = (value) => {
    updateCity(value);
    fetchWeather(value);
  };

  return (
    <>
      <ChooseCityLabel>Find instant weather clarity</ChooseCityLabel>
      <SearchBox onSubmit={handleSubmit}>
        <input
          value={city}
          onChange={(e) => updateCity(e.target.value)}
          placeholder="Search by city name"
          aria-label="City name"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Check now"}
        </button>
      </SearchBox>
      {error && <ErrorText>{error}</ErrorText>}
      {!!quickCities?.length && (
        <>
          <QuickPickLabel>Popular searches</QuickPickLabel>
          <QuickPickRow>
            {quickCities.map((item) => (
              <QuickPickButton key={item} type="button" onClick={() => handleQuickPick(item)}>
                {item}
              </QuickPickButton>
            ))}
          </QuickPickRow>
        </>
      )}
    </>
  );
};

export default CityComponent;
