import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentStoryState,
  NextActionState,
  OPTIONPAGE,
  QUIZPAGE,
  StoryHistoryState,
  ForwardPauseState,
} from "../../Model/Story.ts";
import { Loading } from "../Components/Loading";
import { PageFlippers } from "../Components/PageFlipButton";
import { QuizOptionForm } from "../Components/QuizOptions";
import { StartingMenu } from "../Components/StartingMenu";
import { StoryCard } from "../Components/StoryCard";
import { StoryImage } from "../Components/StoryImage";
import { StoryOptionForm } from "../Components/StoryOptions";
import { StoryTexts } from "../Components/StoryText";
import { PageHeader } from "./Header";
import * as S from "./Page.styled";

const Page = () => {
  return (
    <S.Container>
      <PageHeader />
      <Routes>
        <Route index element={<StartingPage />} />
        <Route path="story" element={<StoryPage />} />
        <Route path="option" element={<OptionPage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Routes>
    </S.Container>
  );
};

const StartingPage = () => {
  return (
    <S.ContainerLoading>
      <StartingMenu />
    </S.ContainerLoading>
  );
};

const LoadingPage = () => {
  return (
    <S.ContainerLoading>
      <Loading />
    </S.ContainerLoading>
  );
};

const OptionPage = () => {
  const [forwardPause, setForwardPause] = useRecoilState(ForwardPauseState);
  useEffect(() => {
    setForwardPause(true);
  }, []);
  return (
    <S.ContainerOption>
      <StoryCard />
      <S.VeritcalSpacer />
      <StoryOptionForm />
      <PageFlippers />
    </S.ContainerOption>
  );
};

const QuizPage = () => {
  const story = useRecoilValue(CurrentStoryState);
  const [forwardPause, setForwardPause] = useRecoilState(ForwardPauseState);
  console.log(story);

  const [nextAction, setNextAction] = useRecoilState(NextActionState);

  useEffect(() => {
    setForwardPause(true);
    setNextAction({ PageType: OPTIONPAGE });
  }, []);

  return (
    <S.ContainerQuiz>
      <StoryCard />
      <S.VeritcalSpacer />
      <QuizOptionForm />
      <PageFlippers />
    </S.ContainerQuiz>
  );
};

const StoryPage = () => {
  const story = useRecoilValue(CurrentStoryState);
  const [nextAction, setNextAction] = useRecoilState(NextActionState);
  // const [historyStory, setHistoryStory] = useRecoilState(StoryHistoryState);
  const [currentStory, setCurrentStory] = useRecoilState(CurrentStoryState);

  useEffect(() => {
    console.log("printing the newest story");
    console.log(story);
    if (story.hasOwnProperty("quiz")) {
      setNextAction({ PageType: QUIZPAGE });
    } else {
      setNextAction({ PageType: OPTIONPAGE });
    }

    // setHistoryStory([...newHistory]);
    console.log("for history");
    // console.log(historyStory);
  }, []);

  return (
    <S.ContainerStory>
      <StoryImage storyImage={story.image_url} />
      <StoryTexts storyText={story.text} />
      <PageFlippers />
    </S.ContainerStory>
  );
};

export default Page;
