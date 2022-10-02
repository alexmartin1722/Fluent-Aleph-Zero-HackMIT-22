import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../Model/Story.ts";

export const PageHeader = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(LoadingState);

  return (
    <Container>
      <BrandName
        onClick={() => {
          setLoading(false);
          navigate("../");
        }}
      >
        fluent
      </BrandName>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 28px 0 28px 88px;
  border-bottom: 3px solid #e1e1e1;
  background-color: white;
  z-index: 1000;
`;

const BrandName = styled.div`
  font-family: "Righteous";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 37px;
  color: #ffd027;
  user-select: none;
`;
