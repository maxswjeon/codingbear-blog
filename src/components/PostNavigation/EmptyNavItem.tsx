import styled from "styled-components";
import {StyleConfig} from "../../config";

const EmptyNavItem = styled.li`
  width: 50%;
  height: 50px;
  float: left;
  box-sizing: border-box;
  list-style: none;
      
  @media screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    width: 100%;
  }
`;

export default EmptyNavItem;
