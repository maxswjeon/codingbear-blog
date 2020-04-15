import React from "react";
import {Helmet} from "react-helmet";
import PageHeader from "../components/PageHeader";
import {graphql, StaticQuery} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {config, dom} from "@fortawesome/fontawesome-svg-core";
import styled, {createGlobalStyle} from "styled-components";

interface PostData {
    fields: {
        category: string
        slug: string,
    },
    frontmatter: {
        title: string,
        date: string,
        tags?: string[]
    }
}

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: PostData[]
        }
    }
}

function MainPage({data}: QueryData) {
    const markdown = data.allMarkdownRemark.nodes;

    return (
        <div>
            <Helmet>
                <title>코딩하는 곰의 공부일지</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <Background>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={faFolderOpen} color="#444"/>
                        <InfoTitle>/</InfoTitle>
                    </Info>
                    {
                        markdown.map((post) => {
                            const {title, date} = post.frontmatter;
                            const {slug} = post.fields;

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
            </Background>
        </div>
    );
}

config.autoAddCss = false;
const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

const Background = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  margin-top: -50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 968px;
  margin: auto;
  padding: 32px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #FFFFFF;
  -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const Info = styled.div`
  height: 50px;
  margin: -32px -32px 0 -32px;
  padding: 0 32px;
  box-sizing: border-box;
  border-bottom: 1px solid #EAEAEA;
`;

const InfoTitle = styled.span`
  line-height: 50px;
  height: 50px;
  display: inline-block;
  color: #959da5;
  margin: 0 10px;
`;

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
