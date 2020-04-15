/*
 * lists/ProjectTemplate.tsx
 *
 * url : /{category}/projects
 * contents:
 *     - List of Projects in the category
 * context:
 *     - Category Title
 * query:
 *     - All projects with type === category
 */

import React from "react";
import {Helmet} from "react-helmet";
import styled, {createGlobalStyle} from "styled-components";
import 'normalize.css';

import {graphql} from "gatsby";
import {config, dom} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../../components/PageHeader";
import ProjectList from "../../components/ProjectList";

interface ProjectInfo {
    title: string
    description: string
    language: string[]
    libraries: string[]
    fields: {
        type: string
        lastUpdate: string
        open: string
        slug: string
    }
}

interface QueryData {
    data: {
        allProject: {
            nodes: ProjectInfo[]
        }
        category: {
            title: string
            category: string
        }
    }
}

export default function ({data}: QueryData) {
    const {category} = data.category;
    const projects: ProjectInfo[] = data.allProject.nodes;

    console.log(projects);

    return (
        <div>
            <Helmet>
                <title>{category} Projects - 코딩하는 곰의 공부일지</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>{'/' + category + '/projects'}</InfoTitle>
                    </Info>

                    <h1>Projects</h1>
                    <ProjectList data={projects}/>
                </Container>
            </Background>
        </div>
    )
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

export const pageQuery = graphql`
    query CategoryProjectQuery($category: String!) {
        allProject(filter: {fields: {type: {eq: $category}}}, sort: {fields: [fields___lastUpdate, title], order: DESC}) {
            nodes {
                title
                description
                language
                libraries
                fields {
                    type
                    lastUpdate
                    open
                    slug
                }
            }
        }
        category(category: {eq: $category}) {
            title
            category
        }
    }
`;
