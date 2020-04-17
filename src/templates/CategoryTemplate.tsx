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
import PostList from "../components/PostList";
import MarkdownNode from "../types/MarkdownNode";
import CategoryNode from "../types/CategoryNode";
import ProjectNode from "../types/ProjectNode";

interface QueryData {
    data: {
        category: CategoryNode
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        allProject: {
            nodes: ProjectNode[]
        }
    }
}

function CategoryTemplate({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;
    const projects = data.allProject.nodes;
    const {title, description, category, project} = data.category;

    let recentProjects: React.ReactElement | null = null;
    if (project && projects.length !== 0) {
        recentProjects = (
            <List>
                <SubTitleWrap>
                    <ListTitle>Recent Projects</ListTitle>
                    <Link href={'/' + category! + '/projects'}>Show All Projects</Link>
                </SubTitleWrap>
                <ProjectList data={projects}/>
            </List>
        );
    }

    const postList = (
        <List>
            <SubTitleWrap>
                <ListTitle>Posts</ListTitle>
                <Link href={'/' + category! + '/tags'}>Show Posts by Tag</Link>
            </SubTitleWrap>
            <PostList data={markdown}/>
        </List>
    )

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            {recentProjects}
            {postList}
        </div>
    )
}

const List = styled.div`
  margin: 50px 0;
`;

const SubTitleWrap = styled.div`
  position: relative;
`;

const ListTitle = styled.h2`
  margin: 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: #999;
  position: absolute;
  bottom: 0;
  right: 0;
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
