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
import 'normalize.css';

import {graphql} from "gatsby";

import {BlogConfig} from "../../config";
import PageTemplate from "../PageTemplate";
import ProjectList from "../../components/ProjectList";
import CategoryNode from "../../types/CategoryNode";
import ProjectNode from "../../types/ProjectNode";

interface ProjectTemplatePageContext {
    category: string,
}

interface ProjectTemplatePageQuery {
    category: CategoryNode
    allProject: {
        nodes: ProjectNode[]
    }
}

interface ProjectTemplateProps {
    data: ProjectTemplatePageQuery,
    pageContext: ProjectTemplatePageContext,
}

function ProjectTemplate({data}: ProjectTemplateProps) {
    const projects = data.allProject.nodes;

    return (
        <div>
            <h1>Projects</h1>
            <ProjectList data={projects}/>
        </div>
    )
}

export const pageQuery = graphql`
    query CategoryProjectQuery($category: String!) {
        category(category: {eq: $category}) {
            title
            category
        }
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
    }
`;

export default function ({data, pageContext}: ProjectTemplateProps) {
    const {title, category} = data.category;

    return (
        <PageTemplate
            title={title! + ' - ' + BlogConfig.name}
            category={'/' + category! + '/projects'}
            content={<ProjectTemplate data={data} pageContext={pageContext}/>}
        />
    )
}

