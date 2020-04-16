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

function TagTemplate({data}: QueryData) {
    return (
        <div>

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

export default function (props: QueryData) {
    const {data} = props;
    const {project} = data.allMarkdownRemark.nodes[0].fields!;

    return (
        <PageTemplate
            title={project! + ' - ' + BlogConfig.name}
            category={project!}
            content={<TagTemplate data={data}/>}
        />
    )
}
