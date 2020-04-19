/*
 * MarkdownTemplate.tsx
 *
 * url : /{slug}
 * contents:
 *     - Styled Result of Markdown File
 * context:
 *     - Slug to Markdown File
 * query:
 *     - Markdown Node with matching slug
 */

import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import styled, {createGlobalStyle} from "styled-components";

import {graphql} from "gatsby";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig, StyleConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import PageHeader from "../components/PageHeader";
import {Container, GlobalStyles, Info, PageContent} from "./PageTemplate";
import PageFooter from "../components/PageFooter";

interface MarkdownTemplatePageContext {
    slug: string,
}

interface MarkdownTemplatePageQuery {
    markdownRemark: MarkdownNode
}

interface MarkdownTemplateProps {
    data: MarkdownTemplatePageQuery,
    pageContext: MarkdownTemplatePageContext,
}

interface MarkdownTemplateState {
    scroll: number,
}

class MarkdownTemplate extends React.Component<MarkdownTemplateProps, MarkdownTemplateState> {
    constructor(props: MarkdownTemplateProps) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
        this.state = {
            scroll: 0
        }
    }

    onScroll() {
        const content = document.getElementById("content");
        const sidebar = document.getElementById("sidebar-toc");

        if (!content) {
            console.error('#content not found');
            return;
        }

        if (!sidebar) {
            console.error('#sidebar-toc not found');
            return;
        }

        // content margin top : -50px
        if (window.scrollY >= content.offsetTop + 50) {
            if (!sidebar.classList.contains("sticky")) {
                sidebar.classList.add("sticky");
            }
        } else {
            if (sidebar.classList.contains("sticky")) {
                sidebar.classList.remove("sticky");
            }
        }
    }

    componentDidMount(): void {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const {data} = this.props;

        const {html, tableOfContents} = data.markdownRemark;
        const {title, date} = data.markdownRemark.frontmatter!;
        const {directory} = data.markdownRemark.fields!;

        const toc = tableOfContents!
            .replace(/\/#/g, '#')
            .replace(/<ul>/g, '<ul class="toc-list">');

        const stickyTOC = (
            <StickyTableOfContents id="sidebar-toc">
                <TocHeading id="toc-heading">Table of Contents</TocHeading>
                <div dangerouslySetInnerHTML={{__html: toc}}/>
            </StickyTableOfContents>
        );

        const contentTOC = (
            <TableOfContents>
                <TocHeading id="toc-heading">Table of Contents</TocHeading>
                <div dangerouslySetInnerHTML={{__html: toc}}/>
            </TableOfContents>
        );

        return (
            <div>
                <Helmet>
                    <title>{title! + ' - ' + BlogConfig.name}</title>
                </Helmet>
                <GlobalStyles/>
                <PageHeader/>

                {tableOfContents ? stickyTOC : null}

                <PageContent id="content">
                    <Container>
                        <Info>
                            <FontAwesomeIcon icon={faFolderOpen} color='#444'/>
                            <CategoryText>{directory}</CategoryText>
                        </Info>

                        <MarkdownStyle/>
                        <Title>{title}</Title>
                        <UploadDate>{date}</UploadDate>

                        {tableOfContents ? contentTOC : null}

                        <Content className="markdown-body"
                                 dangerouslySetInnerHTML={{__html: html!}}/>
                    </Container>
                </PageContent>
            </div>
        );
    }
}

const headerTop =
    StyleConfig.header.padding_top
    + StyleConfig.header.padding_bottom
    + StyleConfig.navigation.height
    + StyleConfig.category.height
    + 36 // Heading Height, 2em;

const CategoryText = styled.a`
  text-decoration: none;
  line-height: 50px;
  height: 50px;
  display: inline-block;
  color: #959da5;
  margin: 0 10px;
`;

const Title = styled.h1`
  margin: 32px 0 10px 0;
  line-height: 50px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 2.5em;
`;

const UploadDate = styled.h2`
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1em;
`;

const TableOfContents = styled.div`
  display: none;
  
  @media screen and (max-width: ${StyleConfig.content.width + 525}px) {
    display: block;
  }
`;

const StickyTableOfContents = styled.div`
  position: absolute;
  width: 250px;
  top: ${headerTop + 25}px;
  left: calc((100vw - ${StyleConfig.content.width}px)/ 2 - 250px);
  overflow-x: hidden;
  
  @media screen and (max-width: ${StyleConfig.content.width + 525}px) {
    display: none;
  }
`;

const TocHeading = styled.h2`
  margin-top: 32px;
  margin-bottom: 0;
`;

const Content = styled.div`
`;

const MarkdownStyle = createGlobalStyle`
  .toc {
    display: none;
  }
  
  .toc-list {
    padding-inline-start: 20px;
  }
  .toc-list > li {
    padding: 5px 0;
  }
  .toc-list > li > p {
    margin: 0;
  }
  
  .sticky {
    position: fixed;
    top: 25px;
    left: calc((100vw - ${StyleConfig.content.width}px)/ 2 - 250px);
  }
`;

export const pageQuery = graphql`
    query ($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } } ) {
            html,
            frontmatter {
                title
                date
            }
            fields {
                slug
                category
                directory
            }
            headings {
                depth
                value
            }
            tableOfContents
        }
    }
`;

export default MarkdownTemplate;
