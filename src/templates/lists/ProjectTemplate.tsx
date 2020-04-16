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
import ProjectList from "../../components/ProjectList";
import ProjectNode from "../../types/ProjectNode";
import PageTemplate from "../PageTemplate";

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

function ProjectTemplate({data}: QueryData) {
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

export default function (props: QueryData) {
    const {data} = props;
    const {category} = data.category;

    return (
        <PageTemplate
            title={category + ' - ' + BlogConfig.name}
            category={'/' + category + '/projects'}
            content={<ProjectTemplate data={data}/>}
        />
    )
}

