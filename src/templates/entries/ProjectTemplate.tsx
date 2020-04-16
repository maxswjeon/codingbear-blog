/*
 * ProjectTemplate.tsx
 *
 * url : /{category}/projects/{projectName}
 * contents:
 *     - List of Posts in Project
 */

import React from "react";
import 'normalize.css';

import {graphql} from "gatsby";

import {BlogConfig} from "../../config";
import MarkdownNode from "../../types/MarkdownNode";
import PageTemplate from "../PageTemplate";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

function ProjectTemplate({data}: QueryData) {
    return (
        <div>

        </div>
    )
}

export const pageQuery = graphql`
    query GetAllPostsInProject($project: String!) {
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

export default function (props: QueryData) {
    const {data} = props;
    const {project} = data.allMarkdownRemark.nodes[0].fields!;

    return (
        <PageTemplate
            title={project! + ' - ' + BlogConfig.name}
            category={project!}
            content={<ProjectTemplate data={data}/>}
        />
    )
}
