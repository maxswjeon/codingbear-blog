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
import 'normalize.css';

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../../config";

import {Container, GlobalStyles, Info, InfoTitle, PageContent} from '../../styles/PageStyles';
import PageHeader from "../../components/PageHeader";
import ProjectList from "../../components/ProjectList";
import ProjectNode from "../../types/ProjectNode";

interface QueryData {
    data: {
        allProject: {
            nodes: ProjectNode[]
        }
        category: {
            title: string
            category: string
        }
    }
}

export default function ({data}: QueryData) {
    const {category} = data.category;
    const projects = data.allProject.nodes;

    return (
        <div>
            <Helmet>
                <title>{category} - {BlogConfig.name}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <PageContent>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>{'/' + category + '/projects'}</InfoTitle>
                    </Info>

                    <h1>Projects</h1>
                    <ProjectList data={projects}/>
                </Container>
            </PageContent>
        </div>
    )
}

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
