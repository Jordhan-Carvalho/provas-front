import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import searchSvg from "../../assets/search.svg";
import ContentBox from "../../components/ContentBox";
import InfoDipslay from "./InfoDipslay";
import SearchMode from "./SearchMode";

export default function TestsPage() {
  const [selected, setSelected] = useState("professor");
  const [dataArray, setDataArray] = useState([]);
  const [step, setStep] = useState("p");
  const [savedProfId, setSavedProfId] = useState("");
  const [savedClassId, setSavedClassId] = useState("");

  useEffect(() => {
    setSavedProfId("");
    setSavedClassId("");
    if (selected === "professor") {
      fetchProfessors();
      setStep("p");
    } else {
      fetchTerms();
      setStep("t");
    }
  }, [selected]);

  const setNewData = async (param) => {
    if (step === "p") {
      await fetchCatsByProf(param);
      setStep("p.cat");
      setSavedProfId(param);
    }
    if (step === "p.cat") {
      await fetchTestsByCatAndProf(param);
      setStep("p.cat.tests");
    }
    if (step === "p.cat.tests") window.open(param, "_blank");
    if (step === "t") {
      await fetchClassesByTerm(param);
      setStep("t.c");
    }
    if (step === "t.c") {
      await fetchCatsByClassId(param);
      setSavedClassId(param);
      setStep("t.c.cat");
    }
    if (step === "t.c.cat") {
      await fetchTestsByClassAndCat(param);
      setStep("t.c.cat.tests");
    }
    if (step === "t.c.cat.tests") window.open(param, "_blank");
  };

  const fetchProfessors = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/professors`
      );
      setStep("p");
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTerms = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/terms`
      );
      setStep("t");
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCatsByClassId = async (classId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/classes/${classId}/categories`
      );
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTestsByClassAndCat = async (catId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/classes/${savedClassId}/categories/${catId}`
      );
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCatsByProf = async (profId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/professors/${profId}/categories`
      );
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTestsByCatAndProf = async (catId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/professors/${savedProfId}/categories/${catId}`
      );
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchClassesByTerm = async (termId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKURL}/api/tests/terms/${termId}/classes`
      );
      setDataArray(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainContainer>
      <ContentBox>
        <SearchMode setSelected={setSelected} />
        <InfoDipslay data={dataArray} setNewData={setNewData} step={step} />
        <SearchSvg src={searchSvg} />
      </ContentBox>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  padding-top: 250px;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
  margin: auto;
`;

const SearchSvg = styled.img`
  width: 30%;
`;
