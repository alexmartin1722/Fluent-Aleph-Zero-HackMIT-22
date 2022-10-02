import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CurrentStoryState } from "../../Model/Story.ts";

export const StoryCard = () => {
  const story = useRecoilValue(CurrentStoryState);
  return (
    <Container>
      <Image src={story.image_url[0]} />
      <Text>{"    " + story.text}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
`;

const Image = styled.img`
  max-width: 380px;
  max-height: 380px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 4px 4px 8px #929292;
`;

const Text = styled.div`
  max-width: 586px;
  padding: 30px;
  text-align: left;
  font-family: "Public Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #606060;
`;
