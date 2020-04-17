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
            <h1>Categories</h1>
            <h2>개발 (Development)</h2>
            <p>C/C++, C#, Java, Python, HTML, CSS, Javascript 등 다양한 언어를 다루면 알게 된 것 정리</p>
            <br/>

            <h2>보안 (Security)</h2>
            <p>정보보안관련 공부를 하면서 알게 된 것 정리</p>
            <br/>

            <h2>전자공학 (Electronics)</h2>
            <p>PCB 제작, 회로 제작 등 전기전자공학 관련 프로젝트 및 기반지식에 대한 정리</p>
            <br/>

            <h2>공부 (Study)</h2>
            <p>고3 생활을 보내며 공부한 것을 간단하게 정리</p>
            <br/>

            <h2>기타 (Etc.)</h2>
            <p>그 외 다양한 내용들</p>
            <br/>

            <br/>

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
