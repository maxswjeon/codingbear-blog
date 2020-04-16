/*
 * lists/ProjectTemplate.tsx
 *
 * url : /{category}/projects
 * contents:
 *     - List of Projects in the category
 * context:
 *     - Category Title
 * query:
 *     - All projects with category === category
 */

import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../../config";

import {Container, GlobalStyles, Info, InfoTitle, PageContent} from '../../styles/PageStyles';
import PageHeader from "../../components/PageHeader";
import MarkdownNode from "../../types/MarkdownNode";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

export default function ({data}: QueryData) {
    const {project} = data.allMarkdownRemark.nodes[0].fields!;

    return (
        <div>
            <Helmet>
                <title>{project} - {BlogConfig.name}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <PageContent>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>{project}</InfoTitle>
                    </Info>
                </Container>
            </PageContent>
        </div>
    )
}

export const pageQuery = graphql`
    query ($tag: String!) {
        allMarkdownRemark(filter: {frontmatter: {tags: {in: [$tag]}}}) {
            nodes {
                fields {
                    project
                    slug
                }
                frontmatter {
                    title
                    date
                    tags
                }
            }
        }
    }
`;
