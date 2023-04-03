import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";

export const LogoStyled = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  color: white;

  @media ${ DEVICE.mobileL } {
    top: 15px
  }
`;

export const TitleStyled = styled.div`
  font-size: 40px;
  font-weight: bold;
  @media ${ DEVICE.mobileL } {
    font-size: 15px;
    font-weight: bold;  }
`;

export const SubTitleStyled = styled.div`

  @media ${ DEVICE.mobileL } {
    font-size: 10px;
`;

export const CoverImg = styled.img`
  
  @media ${ DEVICE.mobileL } {
    width: 100vw
  }
`;

export const IntegoLogoImgStyled = styled.img`
  zIndex: 1;
`;

