/*
 * ProjectTemplate.tsx
 *
 * url : /{category}/projects/{projectName}
 * contents:
 *     - List of Posts in Project
 */

import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

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
                <title>{project}</title>
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
