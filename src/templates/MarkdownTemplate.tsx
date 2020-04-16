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
import 'normalize.css';

import styled from "styled-components";

import {graphql} from "gatsby";

import {BlogConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import PageTemplate from "./PageTemplate";

interface QueryData {
    data: {
        markdownRemark: MarkdownNode
    }
}

function MarkdownTemplate({data}: QueryData) {
    const {title, date} = data.markdownRemark.frontmatter!;

    return (
        <div>=
            <Title>{title}</Title>
            <UploadDate>{date}</UploadDate>
            <Content className="markdown-body" dangerouslySetInnerHTML={{__html: data.markdownRemark!.html!}}/>
        </div>
    );
}

/*
 * const CategoryText = styled.a`
 *   text-decoration: none;
 *   line-height: 50px;
 *   height: 50px;
 *   display: inline-block;
 *   color: #959da5;
 *   margin: 0 10px;
 * `;
 */
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

export default function (props: QueryData) {
    const {data} = props;
    const {category} = data.markdownRemark.fields!;
    const {title} = data.markdownRemark.frontmatter!;

    return (
        <PageTemplate
            title={title! + '-' + BlogConfig.name}
            category={category!}
            content={<MarkdownTemplate data={data}/>}
        />
    )
}
