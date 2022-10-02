import styled from "styled-components";

export const StoryImage = ({ storyImage }) => {
  return (
    <Container>
      <Image src={storyImage} />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 30px;
`;
export const Image = styled.img`
  max-width: 420px;
  max-height: 420px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 4px 4px 8px #929292;
`;
