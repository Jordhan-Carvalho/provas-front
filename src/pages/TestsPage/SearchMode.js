import React from "react";
import styled from "styled-components";

export default function SearchMode({ setSelected }) {
  return (
    <SearchModeContainer>
      <Title>Consultar Provas</Title>
      <SubTitle>Modos de busca:</SubTitle>

      <div>
        <input
          id="professor"
          value="professor"
          onClick={(e) => setSelected(e.target.value)}
          type="radio"
          name="same"
          defaultChecked
        />
        <label htmlFor="professor">Por professor</label>
      </div>
      <div>
        <input
          id="classes"
          value="classes"
          onClick={(e) => setSelected(e.target.value)}
          type="radio"
          name="same"
        />
        <label htmlFor="classes">Por disciplina</label>
      </div>
    </SearchModeContainer>
  );
}

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 40px;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

const SearchModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;
