/*
 * CategoryTemplate.tsx
 *
 * url : /{category}
 * contents:
 *     - Link to /{category}/projects if category is configured as project-able
 *     - Link to /{category}/tags
 *     - All Post List, Descending by Date
 * context:
 *     - Category Title
 * query:
 *     - All posts with field == category
 *     - Category title
 *     - Category project (boolean)
 */

import React from "react";
import {Helmet} from "react-helmet";
import styled, {createGlobalStyle} from "styled-components";
import 'normalize.css';

import {graphql} from "gatsby";
import {config, dom} from "@fortawesome/fontawesome-svg-core";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";

interface PageData {
    fields: {
        category: string
        slug: string,
    },
    frontmatter: {
        title: string,
        date: string,
        tags?: string[]
    }
}

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: PageData[]
        }
        category: {
            title: string
            description: string
            category: string
            project: boolean
        }
    }
}

export default function ({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;
    const {title, description, category} = data.category;

    return (
        <div>
            <Helmet>
                <title>{title} - 코딩하는 곰의 공부일지</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>{'/' + category}</InfoTitle>
                    </Info>
                    <h1>{title}</h1>
                    <p>{description}</p>

                    <h1>Recent Posts</h1>
                    {
                        markdown.map((post) => {
                            const {title, date} = post.frontmatter;
                            const {slug} = post.fields;

                            return (
                                <div key={slug}>
                                    <h2>{title}</h2>
                                    <h3>{date}</h3>
                                    <p>{slug}</p>
                                </div>
                            );
                        })
                    }
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
    query GetAllPostsInCategory($category: String!) {
        allMarkdownRemark(filter: {fields: {category: {eq: $category}}}) {
            nodes {
                fields {
                    category
                    slug
                }
                frontmatter {
                    title
                    date
                }
            }
        }
        category(category: {eq: $category}) {
            title
            category
            description
            project
        }
    }
`;
