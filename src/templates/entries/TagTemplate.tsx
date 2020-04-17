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
import PageTemplate from "../PageTemplate";
import CategoryNode from "../../types/CategoryNode";
import TagNode from "../../types/TagNode";
import MarkdownNode from "../../types/MarkdownNode";

interface QueryData {
    data: {
        category: CategoryNode
        tag: TagNode
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

function TagTemplate({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;
    const {title, description} = data.tag;

    return (
        <div>
            <h1>Tag : {title}</h1>
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
    query GetPostsWithTag($tag: String!, $category: String!) {
    category(category: {eq: $category}) {
        category
        title
    }
    tag(title: {eq: $tag}, category: {eq: $category}) {
        title
        description
    }
    allMarkdownRemark(filter: {fields: {category: {eq: $category}}, frontmatter: {tags: {in: [$tag]}}}) {
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

export default function (props: QueryData) {
    const {data} = props;
    const {title} = data.tag;
    const {category} = data.category;

    return (
        <PageTemplate
            title={'Tag : ' + title! + ' - ' + BlogConfig.name}
            category={'/' + category! + '/tags/' + title!}
            content={<TagTemplate data={data}/>}
        />
    )
}
