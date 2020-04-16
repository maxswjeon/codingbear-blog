import {dom} from "@fortawesome/fontawesome-svg-core";
import styled, {createGlobalStyle} from "styled-components";
import {StyleConfig} from "../config";

const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

const PageContent = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  margin-top: -${StyleConfig.category.height}px;
`;

const Container = styled.div`
  width: 100%;
  max-width: ${StyleConfig.content.width}px;
  margin: auto;
  padding: ${StyleConfig.content.padding}px;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${StyleConfig.content.background};
  -webkit-box-shadow: ${StyleConfig.content.shadow};
  -moz-box-shadow: ${StyleConfig.content.shadow};
  box-shadow: ${StyleConfig.content.shadow};
`;

const Info = styled.div`
  height: ${StyleConfig.category.height}px;
  margin: -${StyleConfig.content.padding}px -${StyleConfig.content.padding}px 0 -${StyleConfig.content.padding}px;
  padding: 0 ${StyleConfig.content.padding}px;
  box-sizing: border-box;
  border-bottom: 1px solid ${StyleConfig.category.border_color};
`;

const InfoTitle = styled.span`
  line-height:  ${StyleConfig.category.height}px;
  height: ${StyleConfig.category.height}px;
  display: inline-block;
  color: ${StyleConfig.category.text_color};
  margin: 0 10px;
`;

export {
    GlobalStyles,
    PageContent,
    Container,
    Info,
    InfoTitle
}
