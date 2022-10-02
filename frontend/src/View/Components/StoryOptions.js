import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  NextActionState,
  OPTIONPAGE,
  STORYPAGE,
  LoadingState,
  ForwardPauseState,
} from "../../Model/Story.ts";
import { CurrentStoryState } from "../../Model/Story.ts";
import { Loading } from "./Loading";

export const StoryOptionForm = () => {
  const story = useRecoilValue(CurrentStoryState);
  const storyId = story.story_id;
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [selected, setSelected] = useState(null);
  const [forwardPause, setForwardPause] = useRecoilState(ForwardPauseState);
  const [previousAction, setNextAction] = useRecoilState(NextActionState);

  const registerNextAction = (selectedOption) => () => {
    setNextAction({ PageType: STORYPAGE, selectedOption, storyId });
    setSelected(selectedOption);
    // console.log(selected, " show me selected");
    setForwardPause(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <StoryOptionQuestion>What should happen next?</StoryOptionQuestion>
      <StoryOption
        onClick={registerNextAction(0)}
        selected={selected === 0}
        optionText={story.next_options[0]}
        option={1}
      />
      <StoryOption
        onClick={registerNextAction(1)}
        selected={selected === 1}
        optionText={story.next_options[1]}
        option={2}
      />
    </Container>
  );
};

export const StoryOption = (props) => {
  const { optionText, selected, option } = props;
  return (
    <OptionContainer {...props} selected={selected}>
      <OptionSelectBox selected={selected}>
        <OptionTextSelected selected={selected}>{option}</OptionTextSelected>
      </OptionSelectBox>
      <OptionText selected={selected}>{optionText}</OptionText>
    </OptionContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  justify-content: center;
  align-items: center;
  padding-left: 60px;
`;

const OptionContainer = styled.div`
  cursor: pointer;
  margin-top: 28px;
  width: 419px;
  min-height: 80px;
  box-shadow: ${(props) => (props.selected ? "" : "0px 6px 0px #eaeaea")};
  background-color: ${(props) => (props.selected ? "#ddf4ff" : "#ffffff")};
  border: ${(props) =>
    props.selected ? "3px solid #1899d6;" : "3px solid #eaeaea"};
  /* box-shadow: ${(props) =>
    props.selected ? "#0px 4px 0px #1899d6" : "#0px 4px 0px #eaeaea"}; */
  border-radius: 10px;

  display: flex;
  align-items: center;
  :active {
    transform: translate(0, 2px);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 0px #eaeaea;
  }
`;

const OptionSelectBox = styled.div`
  min-width: 30px;
  min-height: 30px;
  border: ${(props) =>
    props.selected ? "3px solid #1899d6;" : "3px solid #eaeaea"};
  border-radius: 5px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionTextSelected = styled.div`
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => (props.selected ? "#1899d6;" : "#eaeaea")};
`;

const OptionText = styled.div`
  margin: 15px 10px 15px 0;

  font-family: "Public Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #606060;
`;

const StoryOptionQuestion = styled.div`
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 38px;

  color: #6f6f6f;

  margin: 20px 0 20px 0;
`;

const OptionOne = styled.div`
  max-width: 419px;
  max-height: 419px;
  border-radius: 20.5px 20.5px 0px 0px;
  border-bottom: 3px solid #d9d9d9;
`;

const OptionTwo = styled.div`
  max-width: 419px;
  padding: 30px;

  font-family: "Public Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #606060;
`;
