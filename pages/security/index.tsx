import React, {ReactElement} from "react";
import {Helmet} from "react-helmet";
import styled, {createGlobalStyle} from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {config, dom} from "@fortawesome/fontawesome-svg-core";

import PageHeader from "../../components/global/PageHeader";
import ProjectList from "../../components/development/ProjectList";
import PostList from "../../components/development/PostList";

function SecurityPage(): ReactElement {
    return (
        <div>
            <Helmet>
                <title>보안 - 코딩하는 곰의 공부일지</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>/security</InfoTitle>
                    </Info>
                    <Title>개발 (Development)</Title>
                    <ListTitle>Recent Projects</ListTitle>
                    <ProjectList/>
                    <br/>

                    <ListTitle>Recent Posts</ListTitle>
                    <PostList/>

                </Container>
            </Background>
        </div>
    );
}


config.autoAddCss = false;
const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

const Background = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  margin-top: -50px;
`;


const Container = styled.div`
  width: 100%;
  max-width: 968px;
  margin: auto;
  padding: 32px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #FFFFFF;
  -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  
  @media only screen and (max-width: 640px) {
    padding: 32px 16px; 
  }
`;

const Info = styled.div`
  height: 50px;
  margin: -32px -32px 0 -32px;
  padding: 0 32px;
  box-sizing: border-box;
  border-bottom: 1px solid #EAEAEA;
`;

const InfoTitle = styled.span`
  line-height: 50px;
  height: 50px;
  display: inline-block;
  color: #959da5;
  margin: 0 10px;
`;

const Title = styled.h1`

`;

const ListTitle = styled.h2`

`;

export default SecurityPage;
