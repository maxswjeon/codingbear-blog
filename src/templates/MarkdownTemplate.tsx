/*
 * MarkdownTemplate.tsx
 *
 * url : /{slug}
 * contents:
 *     - Styled Result of Markdown File
 * context:
 *     - Slug to Markdown File
 * query:
 *     - Markdown Node with matching slug
 */

import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import styled from "styled-components";

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {Container, GlobalStyles, Info, PageContent} from '../styles/PageStyles';
import PageHeader from "../components/PageHeader";
import MarkdownNode from "../types/MarkdownNode";

interface QueryData {
    data: {
        markdownRemark: MarkdownNode
    }
}

export default function MarkdownTemplate({data}: QueryData) {
    const {category} = data.markdownRemark.fields!;
    const {title, date} = data.markdownRemark.frontmatter!;

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <PageContent>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <CategoryText href={category}>
                            {category}
                        </CategoryText>
                    </Info>
                    <Title>{title}</Title>
                    <UploadDate>{date}</UploadDate>
                    <Content className="markdown-body" dangerouslySetInnerHTML={{__html: data.markdownRemark!.html!}}/>
                </Container>
            </PageContent>
        </div>
    );
}

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
