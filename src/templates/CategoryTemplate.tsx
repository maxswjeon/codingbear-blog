/*
 * CategoryTemplate.tsx
 *
 * url : /{category}
 * contents:
 *     - Link to /{category}/projects if category is configured as project-able
 *     - Link to /{category}/tags
 *     - All Post List, Descending by Date
 * context:
 *     - Category Title
 * query:
 *     - All posts with field == category
 *     - Category title
 *     - Category project (boolean)
 */

import React from "react";
import 'normalize.css';

import {graphql} from "gatsby";

import {BlogConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import CategoryNode from "../types/CategoryNode";
import PageTemplate from "./PageTemplate";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        category: CategoryNode
    }
}

function CategoryTemplate({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;
    const {title, description} = data.category;

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>

            <h1>Recent Posts</h1>
            {
                markdown.map((post) => {
                    const {title, date} = post.frontmatter!;
                    const {slug} = post.fields!;

                    return (
                        <div key={slug}>
                            <h2>{title}</h2>
                            <h3>{date}</h3>
                            <p>{slug}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}

export const pageQuery = graphql`
    query GetAllPostsInCategory($category: String!) {
        allMarkdownRemark(filter: {fields: {category: {eq: $category}}}) {
            nodes {
                fields {
                    category
                    slug
                }
                frontmatter {
                    title
                    date
                }
            }
        }
        category(category: {eq: $category}) {
            title
            category
            description
            project
        }
    }
`;

export default function (props: QueryData) {
    const {data} = props;
    const {title, category} = data.category;

    return (
        <PageTemplate
            title={title! + '-' + BlogConfig.name}
            category={'/' + category!}
            content={<CategoryTemplate data={data}/>}
        />
    )
}
