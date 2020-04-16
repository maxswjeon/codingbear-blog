import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import {graphql, StaticQuery} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../config";

import {Container, GlobalStyles, Info, InfoTitle, PageContent} from '../styles/PageStyles';
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import MarkdownNode from "../types/MarkdownNode";

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
            <Helmet>
                <title>{BlogConfig.name}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <PageContent>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>/</InfoTitle>
                    </Info>
                    {
                        markdown.map((post) => {
                            const {title, date} = post.frontmatter!;
                            const {slug} = post.fields!;

                            return (
                                <div>
                                    <h1>{title}</h1>
                                    <h2>{date}</h2>
                                    <p>{slug}</p>
                                </div>
                            );
                        })
                    }
                </Container>
            </PageContent>
            <PageFooter/>
        </div>
    );
}

export default function () {
    return (<StaticQuery render={data => <MainPage data={data}/>} query={graphql`
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
