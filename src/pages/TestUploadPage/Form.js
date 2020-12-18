import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { semesterMask } from "../../utils/masks";

export default function Form() {
  const [semester, setSemester] = useState("");
  const [seleClass, setSeleClasses] = useState("");
  const [category, setCategory] = useState("");
  const [professor, setProfessor] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [selectOptions, setSelectOptions] = useState({
    professors: [],
    categories: [],
    classes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    populateSelects();
  }, []);

  const populateSelects = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/form-info`
      );
      const { professors, categories, classes } = data;
      setSelectOptions({ professors, categories, classes });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const sendTest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newTest = {
        semester,
        category_id: parseInt(category),
        class_id: parseInt(seleClass),
        professor_id: parseInt(professor),
        test_url: testUrl,
      };

      await axios.post(`${process.env.REACT_APP_BACKURL}/api/tests`, newTest);
      setIsLoading(false);
      history.push("/tests");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <FormContainer id="add-form" onSubmit={(e) => sendTest(e)}>
      <h3>Preencha as informações corretamente</h3>
      <div className="smaller-input-container">
        <div>
          <label htmlFor="semester">Semestre eg: 2020.2</label>
          <input
            type="text"
            value={semesterMask(semester)}
            onChange={(e) => setSemester(semesterMask(e.target.value))}
            required
            id="semester"
          />
        </div>
        <div>
          <label htmlFor="classes">Disciplina</label>
          <select
            value={seleClass}
            onChange={(e) => setSeleClasses(e.target.value)}
            required
            id="classes"
          >
            <option value="" hidden>
              Selecione
            </option>
            {selectOptions.classes.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="smaller-input-container">
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            id="category"
          >
            <option value="" hidden>
              Selecione
            </option>
            {selectOptions.categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="professor">Professor</label>
          <select
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
            id="professor"
          >
            <option value="" hidden>
              Selecione
            </option>
            {selectOptions.professors.map((prof) => {
              return (
                <option key={prof.id} value={prof.id}>
                  {prof.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div id="url-input">
        <label htmlFor="testUrl">URL</label>
        <input
          type="url"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          required
          id="testUrl"
        />
      </div>
      <BtnContainer>
        <Button disable={isLoading} form="add-form" type="submit">
          Fazer Upload
        </Button>
      </BtnContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;

  h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  input,
  select {
    height: 2.2rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.2);
    outline: none;
    border: 0.5px solid var(--buttonColor);
    font-size: 0.9rem;
  }
  #url-input {
    display: flex;
    flex-direction: column;
    width: 99%;
  }
  .smaller-input-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    div {
      margin-right: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    input,
    select {
      width: 20rem;
    }
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  button {
    font-size: 1rem;
  }
`;
