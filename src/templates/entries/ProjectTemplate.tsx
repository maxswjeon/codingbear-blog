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
import PageTemplate from "../PageTemplate";
import CategoryNode from "../../types/CategoryNode";
import ProjectNode from "../../types/ProjectNode";
import MarkdownNode from "../../types/MarkdownNode";

interface QueryData {
    data: {
        category: CategoryNode
        project: ProjectNode
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

function ProjectTemplate({data}: QueryData) {
    const {title, description} = data.project;
    const markdown = data.allMarkdownRemark.nodes;

    return (
        <div>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <h2>Posts</h2>
            {
                markdown.map((post) => {
                    const {title, date} = post.frontmatter!;
                    const {slug} = post.fields!;

                    return (
                        <div key={slug}>
                            <h3>{title}</h3>
                            <h4>{date}</h4>
                            <p>{slug}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}

export const pageQuery = graphql`
    query GetAllPostsInProject($project: String!, $type: String!) {
        category(category: {eq: $type}) {
            category
            title
            project
        }
        project(fields: {type: {eq: $type}}, title: {eq: $project}) {
            title
            libraries
            language
            description
            fields {
                lastUpdate
                open
                slug
                type
            }
        }
        allMarkdownRemark(filter: {fields: {category: {eq: $type}, project: {eq: $project}}}) {
            nodes {
                frontmatter {
                    date
                    tags
                    title
                }
                fields {
                    category
                    directory
                    project
                    slug
                }
            }
        }
    }
`;

export default function ({data}: QueryData) {
    const {title} = data.project!;
    const {category} = data.category!;

    return (
        <PageTemplate
            title={title! + ' - ' + BlogConfig.name}
            category={'/' + category! + '/projects/' + title}
            content={<ProjectTemplate data={data}/>}
        />
    )
}
