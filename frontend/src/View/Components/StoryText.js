import styled from "styled-components";

export const StoryTexts = ({ storyText }) => {
  return (
    <Container>
      <Text>{"     " + storyText}</Text>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 30px;
  width: 1000px;
`;
export const Text = styled.div`
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 34px;
  color: #606060;
`;
