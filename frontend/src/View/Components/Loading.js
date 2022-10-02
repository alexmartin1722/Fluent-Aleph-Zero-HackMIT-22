import styled from "styled-components";

export const Loading = () => {
  return (
    <Container>
      <ContainerImage>
        <Image src={require("../../Assets/cute.gif")} />
        <LoadingText>Adding the magic...</LoadingText>
      </ContainerImage>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ContainerImage = styled.div`
  display: flex;
  width: 419px;
  height: 530px;
  background: #f9f9f9;
  border: 2px solid #c8c8c8;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  animation-name: my-animation;
  animation-duration: 1s;
  animation-timing-function: linear;

  @keyframes my-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoadingText = styled.div`
  font-family: "Public Sans";
  font-weight: 500;
`;

const Image = styled.img`
  width: 104px;
  height: 104px;
  left: 588px;
  top: 342px;
  margin-bottom: 10px;
`;
