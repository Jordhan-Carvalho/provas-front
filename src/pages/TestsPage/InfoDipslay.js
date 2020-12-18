import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function InfoDipslay({ data, setNewData, step }) {
  const [text, setText] = useState("");
  const history = useHistory();

  useEffect(() => {
    getText();
  }, [step]);

  const getText = () => {
    if (
      step === "p" ||
      step === "p.cat" ||
      step === "t.c" ||
      step === "t.c.cat"
    )
      setText(" prova(s)");
    else if (step === "t") setText(" disciplina(s)");
    else setText("");
  };

  return (
    <MainContainer>
      {data.length === 0 ? (
        <ItemContainer onClick={() => history.push("/test-upload")}>
          <p>Sem provas nessa sessão, adicione a primeira</p>
        </ItemContainer>
      ) : (
        data.map((item) => (
          <ItemContainer
            key={item.id}
            onClick={() => setNewData(item.test_url ? item.test_url : item.id)}
          >
            <p>{item.name}</p>
            <p>
              {item.semester ? item.semester : item.count}
              {text}
            </p>
          </ItemContainer>
        ))
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  border: 1px solid #acbb78;
  border-radius: 20px;
  padding: 30px 20px;
  margin: 0px 10px;
  flex-grow: 1;
  height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background: rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #acbb78;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;
