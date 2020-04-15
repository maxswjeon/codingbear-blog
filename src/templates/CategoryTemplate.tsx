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
import 'normalize.css';

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {Container, GlobalStyles, Info, InfoTitle, PageContent} from '../styles/PageStyles';
import PageHeader from "../components/PageHeader";
import MarkdownNode from "../types/MarkdownNode";
import CategoryNode from "../types/CategoryNode";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        category: CategoryNode
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
            <PageContent>
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
                            const {title, date} = post.frontmatter!;
                            const {slug} = post.fields!;

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
            </PageContent>
        </div>
    )
}

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
