import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoadingState,
  CurrentStoryState,
  StoryHistoryState,
} from "../../Model/Story.ts";
import { Loading } from "./Loading";
import InitPrompt from "../../Controllers/InitPrompt";
import { useState } from "react";

export const StartingMenu = () => {
  const loading = useRecoilValue(LoadingState);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <HeroContainer>
        <StartHero>
          <Infinity>∞</Infinity> Stories.
        </StartHero>
        <StartHero>
          <Infinity>∞</Infinity> Learning.
        </StartHero>
        <StartHeroSub>
          Fluent helps you improve your English comprehension through stories
          and quizes personalized with AI.
        </StartHeroSub>
      </HeroContainer>
      <ActionContainer>
        <StartHeader>Write a story about...</StartHeader>
        <StartForm />
      </ActionContainer>

      {/* <Level experience={"Beginner"} />
      <Level experience={"Intermmediate"} />
      <Level experience={"Hard"} /> */}
    </Container>
  );
};

const StartForm = ({ experience }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [currentInputValue, setCurrentInputValue] = useState(null);
  const [currentStory, setCurrentStory] = useRecoilState(CurrentStoryState);
  const [historyStory, setHistoryStory] = useRecoilState(StoryHistoryState);

  const setInputValue = (event) => {
    const userValue = event.target.value;
    setCurrentInputValue(userValue);
  };

  const handleClick = async () => {
    setLoading(true);
    if (currentInputValue === null) {
      return;
    }
    const initalResponse = await InitPrompt(currentInputValue);
    if (initalResponse) {
      setCurrentStory(initalResponse);

      setLoading(false);
      // console.log(initalResponse);
      navigate("story");
      // console.log("startingpage init success", initalResponse);
    }
  };

  // console.log("new history", currentStory);

  return (
    <StartInputContainer>
      <StartInput
        onChange={setInputValue}
        placeholder="A giraffe going on an adventure"
      />
      <StartButton onClick={() => handleClick()}>Start the Journey</StartButton>
    </StartInputContainer>
  );
};

const Container = styled.div`
  display: flex;
`;

const ActionContainer = styled.div`
  font-family: "Public Sans";
  font-style: normal;
  font-size: 20px;
  text-align: left;
  color: #6f6f6f;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StartHeroSub = styled.div`
  font-family: "Public Sans";
  font-style: normal;
  font-size: 20px;
  text-align: left;
  color: #808080;
  margin-top: 20px;
`;

const StartHero = styled.div`
  color: #6f6f6f;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 90px;
  text-align: left;
  margin-bottom: 20px;
  width: 500px;
`;

const HeroContainer = styled.div`
  border-right: 2px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-text: left;
  padding-right: 40px;
  margin-right: 40px;
  height: 400px;
`;

const StartHeader = styled.div`
  color: #6f6f6f;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
`;

const Infinity = styled.div`
  color: #fec807;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  display: inline-block;
`;

const StartButton = styled.button`
  background: #fec807;
  box-shadow: 0px 4px 0px #d9a900;
  cursor: pointer;

  border-radius: 10px;
  width: 200px;
  height: 50px;
  margin-left: 20px;
  border: 0px;
  color: white;
  font-weight: 700;
  font-size: 15px;

  :active {
    transform: translate(0, 2px);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 0px #d9a900;
  }
`;

const StartInput = styled.input`
  border: 2px solid #bbbbbb;
  border-radius: 10px;
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 500;
  width: 500px;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
  color: #6f6f6f;
  &:focus {
    outline: none !important;
    border: 2px solid #d9a900;
  }
  &::placeholder {
    color: #d2d2d2;
  }
`;

const LevelContainer = styled.div`
  margin: 40px 0 40px 0;
  width: 100%;
  padding: 30px 40px 30px 40px;
  height: 47.69px;

  border-radius: 999px;

  background: #fedd67;
  box-shadow: 0px 4px 0px #d9a900;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-size: 30px;
`;

const StartInputContainer = styled.div`
  display: flex;
  margin-top: 25px;
`;
