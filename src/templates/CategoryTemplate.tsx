/*
 * CategoryTemplate.tsx
 *
 * url : /{category}
 * contents:
 *     - Recent 5 Projects, link to /{category}/projects if category is configured as project-able
 *     - Recent 5 Tags (?), link to /{category}/tags
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

import styled from "styled-components";

import {graphql} from "gatsby";

import {BlogConfig} from "../config";
import PageTemplate from "./PageTemplate";
import ProjectList from "../components/ProjectList";
import MarkdownNode from "../types/MarkdownNode";
import CategoryNode from "../types/CategoryNode";
import ProjectNode from "../types/ProjectNode";
import TagNode from "../types/TagNode";

interface QueryData {
    data: {
        category: CategoryNode
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        allProject: {
            nodes: ProjectNode[]
        }
        allTag: {
            nodes: TagNode[]
        }
    }
}

function CategoryTemplate({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;
    const projects = data.allProject.nodes;
    const tags = data.allTag.nodes;
    const {title, description, category, project} = data.category;

    let RecentProjectList: React.ReactElement | null = null;
    if (project && projects.length !== 0) {
        RecentProjectList = (
            <List>
                <h2>Recent Projects</h2>
                <ProjectList data={projects}/>
                <a href={'/' + category! + '/projects'}>Show All Projects</a>
            </List>
        );
    }

    let TagList: React.ReactElement | null = null;
    if (tags.length > 0) {
        // TODO: Design Tag List
        TagList = (
            <List>
                <h2>Tags</h2>

                <a href={'/' + category! + '/tags'}>Show Posts by Tag</a>
            </List>
        );
    }

    // TODO: Design Post List
    const PostList = (
        <List>
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
        </List>
    )

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>

            {RecentProjectList}
            {TagList}
            {PostList}
        </div>
    )
}

const List = styled.div`
  margin: 50px 0;
`;

export const pageQuery = graphql`
    query GetAllPostsInCategory($category: String!) {
        category(category: {eq: $category}) {
            title
            category
            description
            project
        }
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
        allProject(filter: {fields: {type: {eq: $category}}}, sort: {fields: [fields___lastUpdate, title], order: DESC}, limit: 5) {
            nodes {
                title
                libraries
                language
                fields {
                    lastUpdate
                    open
                    slug
                    type
                }
                description
            }
        }
        allTag(filter: {category: {eq: $category}}, limit: 50) {
            nodes {
                category
                title
            }
        }
    }
`;

export default function ({data}: QueryData) {
    const {title, category} = data.category;

    return (
        <PageTemplate
            title={title! + ' - ' + BlogConfig.name}
            category={'/' + category!}
            content={<CategoryTemplate data={data}/>}
        />
    )
}
