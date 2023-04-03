import styled from "@emotion/styled";

export const WrapperStyle = styled.div<{shouldMark: boolean}>`
  display: flex;
  background-color: ${ (props: any) => props.shouldMark ? '#FFF9C0' : 'white' };
  border-radius: 8px;
  margin: 4px;
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;

export const CheckIconStyled = styled.img`
  width: 13px;
  height: 13px;
  align-self: start;
  padding: 4px;
`;

export const PlanInfoFullTitleStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlanInfoTitleStyled = styled.div<{isBold: boolean}>`
  align-self: start;
  font-weight: bold;
  font-size: 15px;
  color: ${ (props: any) => props.isBold ? "red" : "black" };
`;

export const PlanInfoSubTitleStyled = styled.div`
  font-size: 15px;
  text-align: left;
`;