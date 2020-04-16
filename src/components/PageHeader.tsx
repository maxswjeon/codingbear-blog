import React from 'react';
import styled from 'styled-components';
import Navigation from "./PageNavigation";
import {BlogConfig, StyleConfig} from "../config";

function PageHeader(): React.ReactElement {
    return (
        <Background>
            <Container>
                <Title href={"/"}>{BlogConfig.name}</Title>
            </Container>
            <Navigation/>
        </Background>
    );
}

const Background = styled.div`
  width: 100%;
  background-color: ${StyleConfig.header.background};
  overflow: auto;
  padding-bottom: ${StyleConfig.category.height}px;
  
  @media print {
    background-color: white;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: ${StyleConfig.content.width}px;
  margin: auto;
  overflow: auto;
`;

const Title = styled.a`
  padding: 75px 0 25px 0;
  display: block;
  float: left;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 2em;
  color: ${StyleConfig.header.text_color};
  text-decoration: none;
  text-align: center;
  
  @media only screen and (max-width: ${StyleConfig.content.width}px) {
    padding-left: 25px;
  };
  
  @media only screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    width: 100%;
    padding: 0;
    margin: 75px 0 25px 0;
  };
  
  @media print {
    padding: 25px 0;
    color: #1B1F24;
  }
`;

export default PageHeader;
