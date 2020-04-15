import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import 'normalize.css';

import {graphql} from "gatsby";
import {config, dom} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";
import {Helmet} from "react-helmet";

interface QueryData {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string,
                date: string,
            },
            html: string,
            fields: {
                slug: string,
                category: string,
            }
        }
    }
}

export default function MarkdownTemplate({data}: QueryData) {
    const {category} = data.markdownRemark.fields;
    const {title, date} = data.markdownRemark.frontmatter;

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <CategoryText href={category}>
                            {category}
                        </CategoryText>
                    </Info>
                    <Title>{title}</Title>
                    <UploadDate>{date}</UploadDate>
                    <Content className="markdown-body" dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}/>
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
`;

const Info = styled.div`
  height: 50px;
  margin: -32px -32px 0 -32px;
  padding: 0 32px;
  box-sizing: border-box;
  border-bottom: 1px solid #EAEAEA;
`;

const CategoryText = styled.a`
  text-decoration: none;
  line-height: 50px;
  height: 50px;
  display: inline-block;
  color: #959da5;
  margin: 0 10px;
`;

const Title = styled.h1`
  margin: 32px 0 10px 0;
  line-height: 50px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 2.5em;
`;

const UploadDate = styled.h2`
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1em;
`;

const Content = styled.div`
  margin-top: 32px;
`;

export const pageQuery = graphql`
    query ($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } } ) {
            html,
            frontmatter {
                title
                date
            }
            fields {
                slug
                category
            }
        }
    }
`;
