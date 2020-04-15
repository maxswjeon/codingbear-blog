import React from "react";
import styled from "styled-components";
import {graphql, StaticQuery} from "gatsby";
import PostItem from "./PostItem";

interface PostInfo {
    frontmatter: {
        title: string,
        date: string,
    },
    fields: {
        category: string[],
        slug: string,
    }
}

interface QueryResult {
    allMarkdownRemark: {
        nodes: PostInfo[],
    }
}

interface PostListProps {
    data: QueryResult,
}

function PostList(props: PostListProps) {
    const data: PostInfo[] = props.data.allMarkdownRemark.nodes;

    return (
        <List>
            {data.map(project => {
                const {title} = project.frontmatter;
                return (
                    <PostItem href="/" title={title}/>
                );
            })}
        </List>
    );
}

const List = styled.ul`
  padding: 0;
`;

export default function () {
    return (<StaticQuery render={data => <PostList data={data}/>} query={graphql`
 query AllPostQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date, frontmatter___title], order: DESC}, limit: 10) {
    nodes {
      frontmatter {
        title
        date
      }
      fields {
        category
        slug
      }
    }
  }
}`}/>);
}
