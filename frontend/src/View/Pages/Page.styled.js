import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const ContainerQuiz = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 60px 160px 0 160px;
  user-select: none;
`;

export const VeritcalSpacer = styled.div`
  height: 100%;
  width: 3px;
  background-color: #eaeaea;
`;

export const ContainerOption = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 60px 160px 0 160px;
  user-select: none;
`;

export const ContainerLoading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 120px 120px 0 120px;
  user-select: none;
`;

export const ContainerStory = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 120px 120px 0 120px;
`;
