import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentStoryState, ForwardPauseState } from "../../Model/Story.ts";

export const QuizOptionForm = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [responseMessage, setresponseMessage] = useState(null);
  const story = useRecoilValue(CurrentStoryState);
  const quiz = story.quiz;

  console.log(quiz);

  const generate_option_cards = () => {
    let optionCards = [];
    for (let index in quiz.options) {
      let indexInt = parseInt(index);
      optionCards.push(
        <StoryOption
          key={index}
          correctResponse={
            selectedResponse != null && indexInt === quiz.answer_id
          }
          incorrectResponse={
            selectedResponse === indexInt && indexInt !== quiz.answer_id
          }
          id={index}
          optionText={quiz.options[index]}
          selectQuizOption={selectQuizOption}
        />
      );
    }
    return optionCards;
  };

  const selectQuizOption = (option_id) => {
    if (selectedResponse !== null) {
      return;
    }
    setSelectedResponse(parseInt(option_id));
    if (parseInt(option_id) === quiz.answer_id) {
      setresponseMessage("Hooray!!!! You got it right!");
    } else {
      setresponseMessage("Incorrect");
    }
  };

  return (
    <Container>
      <ContainerForm>
        <StoryOptionQuestion>{quiz.question}</StoryOptionQuestion>
        <StoryOptionWrapper>
          {generate_option_cards()}
          {responseMessage && (
            <QuizResponse
              responseMessage={
                "Hooray!!!! You got it right!" === responseMessage
              }
            >
              {responseMessage}
            </QuizResponse>
          )}
        </StoryOptionWrapper>
      </ContainerForm>
    </Container>
  );
};

export const StoryOption = (props) => {
  const [forwardPause, setForwardPause] = useRecoilState(ForwardPauseState);
  return (
    <OptionContainer
      correctResponse={props.correctResponse}
      incorrectResponse={props.incorrectResponse}
      onClick={() => {
        setForwardPause(false);
        props.selectQuizOption(props.id);
      }}
    >
      <OptionSelectBox
        correctResponse={props.correctResponse}
        incorrectResponse={props.incorrectResponse}
      >
        {parseInt(props.id) + 1}
      </OptionSelectBox>
      <OptionText
        correctResponse={props.correctResponse}
        incorrectResponse={props.incorrectResponse}
      >
        {props.optionText}
      </OptionText>
    </OptionContainer>
  );
};

const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 50vw;
`;

const StoryOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: start; */
`;
const OptionContainer = styled.div`
  cursor: pointer;
  margin-top: 28px;
  min-width: 160px;
  max-width: 400px;
  min-height: 60px;
  /* margin-left: 10px; */

  background: #ffffff;
  border: 3px solid #eaeaea;
  box-shadow: 0px 4px 0px #eaeaea;
  border-radius: 10px;

  display: flex;
  align-items: center;

  :active {
    transform: translate(0, 2px);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 0px #eaeaea;
  }

  ${({ correctResponse }) =>
    correctResponse &&
    `
    background: #D9FFD2;
    border: 3px solid #78C86B;
    box-shadow: 0px 4px 0px #78C86B;
  `}

  ${({ incorrectResponse }) =>
    incorrectResponse &&
    `
    background: #FFE5E5;
    border: 3px solid #FF9494;
    box-shadow: 0px 4px 0px #FF9494;
  `}
`;

const OptionSelectBox = styled.div`
  font-family: "Public Sans";
  font-weight: 500;
  min-width: 30px;
  min-height: 30px;
  border: 3px solid #eaeaea;
  border-radius: 5px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eaeaea;

  ${({ correctResponse }) =>
    correctResponse &&
    `
    border: 3px solid #78C86B;
    color: #78C86B;
  `}

  ${({ incorrectResponse }) =>
    incorrectResponse &&
    `
    border: 3px solid #FF9494;
    color: #FF9494;
  `}
`;

const OptionText = styled.div`
  padding-right: 20px;
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #606060;

  ${({ correctResponse }) =>
    correctResponse &&
    `
    color: #78C86B;
  `}

  ${({ incorrectResponse }) =>
    incorrectResponse &&
    `
    color: #FF9494;
  `}
`;

const StoryOptionQuestion = styled.div`
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 38px;
  max-width: 560px;

  color: #6f6f6f;

  margin: 0 0 20px 0;
`;

const QuizResponse = styled.div`
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 38px;
  /* color: #; */
  color: ${(props) => (props.responseMessage ? "#78c86b" : "#ff9494")};
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
