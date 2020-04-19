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
import PostList from "../../components/PostList";
import ProjectNode from "../../types/ProjectNode";
import MarkdownNode from "../../types/MarkdownNode";

interface ProjectTemplatePageContext {
    project: string,
    type: string,
}

interface ProjectTemplatePageQuery {
    project: ProjectNode
    allMarkdownRemark: {
        nodes: MarkdownNode[]
    }
}

interface ProjectTemplateProps {
    data: ProjectTemplatePageQuery,
    pageContext: ProjectTemplatePageContext,
}

function ProjectTemplate({data}: ProjectTemplateProps) {
    const {title, description} = data.project;
    const markdown = data.allMarkdownRemark.nodes;

    return (
        <div>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <h2>Posts</h2>
            <PostList data={markdown}/>
        </div>
    )
}

export const pageQuery = graphql`
    query GetAllPostsInProject($project: String!, $type: String!) {
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

export default function ({data, pageContext}: ProjectTemplateProps) {
    const {title} = data.project!;
    const category = pageContext.type;

    return (
        <PageTemplate
            title={title! + ' - ' + BlogConfig.name}
            category={'/' + category + '/projects/' + title}
            content={<ProjectTemplate data={data} pageContext={pageContext}/>}
        />
    )
}
