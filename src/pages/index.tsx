import React from "react";
import 'normalize.css';

import {graphql, StaticQuery} from "gatsby";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import PageTemplate from "../templates/PageTemplate";
import PostList from "../components/PostList";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

function MainPage({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;

    return (
        <div>
            <h1>Recent Posts</h1>
            <PostList data={markdown}/>
        </div>
    );
}

export default function () {
    return (<StaticQuery render={data => <MainPageTemplate data={data}/>} query={graphql`
    query GetAllPosts {
        allMarkdownRemark {
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
    }
    `}/>);
};

function MainPageTemplate(props: QueryData) {
    const {data} = props;

    return (
        <PageTemplate
            title={BlogConfig.name}
            category='/'
            icon={faFolderOpen}
            content={<MainPage data={data}/>}
        />
    )
}
