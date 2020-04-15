/*
 * ProjectTemplate.tsx
 *
 * url : /{category}/projects/{projectName}
 * contents:
 *     - List of Posts in Project
 */

import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import PageHeader from "../../components/PageHeader";
import 'normalize.css';

import {graphql} from "gatsby";
import {config, dom} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet";

interface PageData {
    fields: {
        project: string,
        slug: string,
    },
    frontmatter: {
        title: string,
        date: string,
    }
}

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: PageData[]
        }
    }
}

export default function ({data}: QueryData) {
    const {project} = data.allMarkdownRemark.nodes[0].fields;

    return (
        <div>
            <Helmet>
                <title>{project}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>{project}</InfoTitle>
                    </Info>
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
    query ($project: String!) {
        allMarkdownRemark(filter: {fields: {project: {eq: $project}}}) {
            nodes {
                fields {
                    project
                    slug
                }
                frontmatter {
                    title
                    date
                }
            }
        }
    }
`;
