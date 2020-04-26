/*
 * MarkdownTemplate.tsx
 *
 * url : /{slug}
 * contents:
 *     - Styled Result of markdown File
 * context:
 *     - Slug to markdown File
 * query:
 *     - markdown Node with matching slug
 */

import React, {ReactElement} from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import styled from "styled-components";

import {graphql} from "gatsby";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig, StyleConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import PageHeader from "../components/PageHeader";
import {Container, createPathElement, GlobalStyles, Info, InfoIcon, InfoTitle, PageContent} from "./PageTemplate";
import PageFooter from "../components/PageFooter";
import PostNavigation from "../components/PostNavigation";
import ReactUtterances from "../components/ReactUtterances";

import 'd2coding/d2coding-subset.css';
import 'gatsby-remark-mathjax-ssr/mathjax.css';
import '../styles/Markdown/markdown.css';
import CodeHighlightStyle from "../styles/markdown/code";
import TOCStyle from "../styles/markdown/toc";
import UtterancesStyle from "../styles/markdown/utterances";
import PageNavigationStyle from "../styles/markdown/navigation";

interface MarkdownTemplatePageContext {
    slug: string,
    previous: MarkdownNode | null,
    next: MarkdownNode | null,
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

    private title: string;
    private date: string;
    private slug: string;
    private html: string;
    private project: string | undefined | null;

    private tableOfContents: string | null;
    private isProject: boolean;

    private previous: MarkdownNode | null;
    private next: MarkdownNode | null;

    constructor(props: MarkdownTemplateProps) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
        this.state = {
            scroll: 0
        }

        const {data, pageContext} = this.props;

        const {html, tableOfContents} = data.markdownRemark;
        const {title, date} = data.markdownRemark.frontmatter!;
        const {project} = data.markdownRemark.fields!;

        const {previous, next, slug} = pageContext;

        this.html = html!;
        this.tableOfContents = this.createTableOfContent(tableOfContents);
        this.title = title!;
        this.date = date!;
        this.project = project;
        this.isProject = !!project;

        this.previous = previous;
        this.next = next;
        this.slug = decodeURI(slug);

    }

    onScroll() {
        const content = document.getElementById("content");
        const sidebar = document.getElementById("sidebar-toc");

        if (!content) {
            return;
        }

        if (!sidebar) {
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

    createTableOfContent(tableOfContents: string | undefined): string | null {
        if (!tableOfContents) {
            return null;
        }

        return tableOfContents
            .replace(/\/#/g, '#')
            .replace(/<ul>/g, '<ul class="toc-list">')
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '');
    }

    createPostNavigation(): ReactElement | null {
        const {isProject, previous, next} = this;

        if (!isProject) {
            return null;
        }

        if (!previous && !next) {
            return null;
        }

        return (
            <PostNavigation previous={previous} next={next}/>
        );
    }

    render() {
        const {title, date, slug, html, tableOfContents} = this;

        const stickyTOC = (
            <StickyTableOfContents id="sidebar-toc">
                <TocHeading id="toc-heading">Table of Contents</TocHeading>
                <div dangerouslySetInnerHTML={{__html: tableOfContents!}}/>
            </StickyTableOfContents>
        );

        const contentTOC = (
            <TableOfContents>
                <TocHeading id="toc-heading">Table of Contents</TocHeading>
                <div dangerouslySetInnerHTML={{__html: tableOfContents!}}/>
            </TableOfContents>
        );

        return (
            <div>
                <Helmet>
                    <title>{title + ' - ' + BlogConfig.name}</title>
                </Helmet>

                <GlobalStyles/>

                <TOCStyle/>
                <UtterancesStyle/>
                <PageNavigationStyle/>
                <CodeHighlightStyle/>

                <PageHeader/>

                {tableOfContents ? stickyTOC : null}

                <PageContent id="content">
                    <MarkdownContainer>
                        <Info>
                            <InfoTitle>
                                <InfoIcon icon={faFolderOpen} color='#444'/>
                                {createPathElement(slug)}
                            </InfoTitle>
                        </Info>

                        <Title>{title}</Title>
                        <UploadDate>{date}</UploadDate>

                        {tableOfContents ? contentTOC : null}

                        <MarkdownContent className="markdown-body"
                                         dangerouslySetInnerHTML={{__html: html}}/>

                        {this.createPostNavigation()}
                        <ReactUtterances
                            repo={'maxswjeon/codingbear-blog'}
                            issueMap={'pathname'}
                            theme={'github-light'}/>
                    </MarkdownContainer>
                </PageContent>
                <PageFooter/>
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

const MarkdownContainer = styled(Container)`
  padding: ${StyleConfig.content.padding}px ${StyleConfig.content.padding}px 0;
`;

const MarkdownContent = styled.div`
  padding: ${StyleConfig.content.padding}px 0;
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
  
  @media screen and (max-width: ${StyleConfig.content.width + 2 * (StyleConfig.tableofcontent.width + StyleConfig.tableofcontent.padding)}px) {
    display: block;
  }
`;

const StickyTableOfContents = styled.div`
  position: absolute;
  width: 250px;
  top: ${headerTop + StyleConfig.tableofcontent.top}px;
    left: calc((100vw 
            - ${StyleConfig.content.width}px)/ 2 
            - ${StyleConfig.tableofcontent.width + StyleConfig.tableofcontent.padding}px);
  overflow-x: hidden;
  
  @media screen and (max-width: ${StyleConfig.content.width + 2 * (StyleConfig.tableofcontent.width + StyleConfig.tableofcontent.padding)}px) {
    display: none;
  }
  
  & > div > ul {
    height: calc(100vh - ${headerTop + StyleConfig.tableofcontent.top + 91}px);
    overflow: auto;
  }
`;

const TocHeading = styled.h2`
  margin-top: 32px;
  margin-bottom: 0;
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
                project
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
