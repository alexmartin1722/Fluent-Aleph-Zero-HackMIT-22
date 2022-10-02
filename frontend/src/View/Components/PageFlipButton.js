import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NextActionState,
  OPTIONPAGE,
  QUIZPAGE,
  STORYPAGE,
  LoadingState,
  CurrentStoryState,
  StoryHistoryState,
  StoryPartState,
  ForwardPauseState,
} from "../../Model/Story.ts";

import { useLocation } from "react-router-dom";

import ContinPrompt from "../../Controllers/ContinPrompt";

export const PageFlippers = () => {
  const [storyPart, setStoryPart] = useRecoilState(StoryPartState);
  const backIsOn = storyPart > 1;
  console.log(storyPart, "from flipper");
  return (
    <Container>
      {/* {backIsOn && <BackPageButton />} */}
      <NextPageButton />
    </Container>
  );
};

export const NextPageButton = () => {
  const nextAction = useRecoilValue(NextActionState);
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [storyPart, setStoryPart] = useRecoilState(StoryPartState);
  const [currentStory, setCurrentStory] = useRecoilState(CurrentStoryState);
  const historyStory = useRecoilValue(StoryHistoryState);
  const [forwardPause, setForwardPause] = useRecoilState(ForwardPauseState);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    console.log("checking forward pause state", forwardPause);
    if (
      (location.pathname.includes("quiz") ||
        location.pathname.includes("option")) &&
      forwardPause
    ) {
      return;
    }

    switch (nextAction.PageType) {
      case STORYPAGE:
        setLoading(true);
        const storyContinue = await ContinPrompt(
          nextAction.storyId,
          nextAction.selectedOption
        );

        if (storyContinue) {
          setCurrentStory(storyContinue);
          setLoading(false);
          navigate("../story");
        }
        break;
      case QUIZPAGE:
        navigate("../quiz");
        break;
      case OPTIONPAGE:
        navigate("../option");
        break;
      default:
        navigate("");
      // code block
    }
  };

  return (
    <ContainerButton onClick={handleClick}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.400024 9.13635H17.6M17.6 9.13635L12.1534 1.70908M17.6 9.13635L12.1534 16.5636"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </ContainerButton>
  );
};

export const BackPageButton = () => {
  const [historyStory, setHistoryStory] = useRecoilState(StoryHistoryState);
  const [storyPart, setStoryPart] = useRecoilState(StoryPartState);
  const [currentStory, setCurrentStory] = useRecoilState(CurrentStoryState);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("change back:  ", storyPart, currentStory);
  const handleClick = () => {
    if (storyPart !== -1) {
      setCurrentStory({ ...historyStory[storyPart - 1] });
      setStoryPart(storyPart - 1);
    } else {
      setCurrentStory({ ...historyStory[historyStory.length - 2] });
      setStoryPart(historyStory.length - 2);
    }

    if (
      location.pathname.includes("quiz") ||
      location.pathname.includes("option")
    ) {
      navigate("../story");
    }
  };
  return (
    <ContainerButton onClick={handleClick}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9454 9.13636L2.74543 9.13636M2.74543 9.13636L8.1921 16.5636M2.74543 9.13636L8.1921 1.70908"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </ContainerButton>
  );
};

const Container = styled.div`
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: flex;
  width: 70px;
  height: 70px;
  /* border: 2px solid #e0e0e0; */
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  cursor: pointer;
`;

const ContainerButton = styled.div`
  width: 60.69px;
  height: 60.69px;
  left: 1070.33px;
  top: 726.29px;
  border-radius: 999px;

  background: #fedd67;
  box-shadow: 0px 6px 0px #d9a900;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transform: scale(1.3);
  }
  :active {
    transform: translate(0, 2px);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 0px #d9a900;
  }
`;
