import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";

export const WrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  
  @media ${ DEVICE.mobileL } {
    flex-direction: column;
    top: 105px;

  }
`;