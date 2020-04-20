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
import {faChevronLeft, faChevronRight, faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig, StyleConfig} from "../config";
import MarkdownNode from "../types/MarkdownNode";
import PageHeader from "../components/PageHeader";
import {Container, createPathElement, GlobalStyles, Info, InfoIcon, InfoTitle, PageContent} from "./PageTemplate";
import PageFooter from "../components/PageFooter";
import ReactUtterances from "../components/ReactUtterances";

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
        const {data, pageContext} = this.props;

        const {html, tableOfContents} = data.markdownRemark;
        const {title, date} = data.markdownRemark.frontmatter!;
        const {project} = data.markdownRemark.fields!;

        const {previous, next, slug} = pageContext;

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

        const createPostNavigation = () => {
            if (!previous && !next) {
                return null;
            }

            const defaultItem = (
                <PostNavigationBlankItem/>
            );

            let previousItem = defaultItem;
            if (previous) {
                previousItem = (
                    <PostNavigationItem>
                        <PostNavigationLink href={previous.fields!.slug!} className="left">
                            <PostNavigationText>
                                <PostNavigationIcon icon={faChevronLeft}/>
                                {previous.frontmatter!.title!}
                            </PostNavigationText>
                        </PostNavigationLink>
                    </PostNavigationItem>
                )
            }

            let nextItem = defaultItem;
            if (next) {
                nextItem = (
                    <PostNavigationItem>
                        <PostNavigationLink href={next.fields!.slug!} className="right">
                            <PostNavigationText>
                                {next.frontmatter!.title!}
                                <PostNavigationIcon icon={faChevronRight}/>
                            </PostNavigationText>
                        </PostNavigationLink>
                    </PostNavigationItem>
                )
            }
            return (
                <PostNavigation>
                    {previousItem}
                    {nextItem}
                </PostNavigation>
            );
        }

        return (
            <div>
                <Helmet>
                    <title>{title! + ' - ' + BlogConfig.name}</title>
                </Helmet>
                <GlobalStyles/>
                <PageHeader/>

                {tableOfContents ? stickyTOC : null}

                <PageContent id="content">
                    <MarkdownContainer>
                        <Info>
                            <InfoTitle>
                                <InfoIcon icon={faFolderOpen} color='#444'/>
                                {createPathElement(decodeURI(slug))}
                            </InfoTitle>
                        </Info>

                        <MarkdownStyle/>
                        <Title>{title}</Title>
                        <UploadDate>{date}</UploadDate>

                        {tableOfContents ? contentTOC : null}

                        <MarkdownContent className="markdown-body"
                                         dangerouslySetInnerHTML={{__html: html!}}/>

                        {project ? createPostNavigation() : null}
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
  padding-bottom: ${StyleConfig.content.padding}px;
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

const PostNavigation = styled.ul`
  margin: 25px -${StyleConfig.content.padding}px 0 -${StyleConfig.content.padding}px;
  padding: 0;
  border-top: 1px solid ${StyleConfig.category.border_color};
  box-sizing: border-box;
  
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  
`;

const PostNavigationItem = styled.li`
  width: 50%;
  height: 50px;
  float: left;
  box-sizing: border-box;
  list-style: none;
    
  &:hover {
    background-color: #DDD;
  }
  
  @media screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    width: 100%;
  }
`;

const PostNavigationBlankItem = styled.li`
  width: 50%;
  height: 50px;
  float: left;
  box-sizing: border-box;
  list-style: none;
      
  @media screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    width: 100%;
  }
`;

const PostNavigationLink = styled.a`
  width: 100%;
  height: 50px;
  display: block;
  text-decoration: none;
  color: black;
  line-height: 50px;
`;

const PostNavigationIcon = styled(FontAwesomeIcon)`
  width: 25px !important;
  height: 25px !important;
  margin: 0 ${StyleConfig.content.padding / 2}px;
  line-height: 50px;
  font-size: 25px;
  vertical-align: text-bottom !important;
  color: #666;
`;

const PostNavigationText = styled.p`
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
  line-height: 50px;
  display: inline-block;
  box-sizing: border-box;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
  
  .hasProjectNav {
  }
  
  .react-utterances {
    border-top: 1px solid ${StyleConfig.category.border_color};
    margin: 0 -${StyleConfig.content.padding}px;
    padding: 0 ${StyleConfig.content.padding}px;
  }
  
  .react-utterances > p{
    text-align: center;
    padding: 25px 0;
    color: #CCC;
  }
  
  .utterances {
    max-width: 100%;
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
