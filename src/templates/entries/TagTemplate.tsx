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

import {faTag} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../../config";
import PageTemplate from "../PageTemplate";
import PostList from "../../components/PostList";
import TagNode from "../../types/TagNode";
import MarkdownNode from "../../types/MarkdownNode";

interface TagTemplatePageContext {
    tag: string,
    category: string,
}

interface TagTemplatePageQuery {
    tag: TagNode
    allMarkdownRemark: {
        nodes: MarkdownNode[]
    }
}

interface TagTemplateProps {
    data: TagTemplatePageQuery,
    pageContext: TagTemplatePageContext,
}

function TagTemplate({data}: TagTemplateProps) {
    const markdown = data.allMarkdownRemark.nodes;
    const {title, description} = data.tag;

    return (
        <div>
            <h1>Tag : {title}</h1>
            <p>{description}</p>
            <h2>Posts</h2>
            <PostList data={markdown}/>
        </div>
    )
}

export const pageQuery = graphql`
query GetPostsWithTag($tag: String!, $category: String!) {
    tag(title: {eq: $tag}, category: {eq: $category}) {
        title
        description
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date, frontmatter___title], order: DESC}, filter: {fields: {category: {eq: $category}}, frontmatter: {tags: {in: [$tag]}}}) {
        nodes {
            frontmatter {
                title
                date
                tags
            }
            fields {
                slug
                category
                directory
                project
            }
        }
    }
}
`;

export default function ({data, pageContext}: TagTemplateProps) {
    const {title} = data.tag;
    const category = pageContext.category;

    return (
        <PageTemplate
            title={'Tag : ' + title! + ' - ' + BlogConfig.name}
            category={'/' + category + '/tags/' + title!}
            content={<TagTemplate data={data} pageContext={pageContext}/>}
            icon={faTag}
        />
    )
}
