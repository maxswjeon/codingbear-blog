import React from "react";
import styled from "styled-components";
import {StyleConfig} from "../../config";
import MarkdownNode from "../../types/MarkdownNode";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import PostNavItem from "./PostNavItem";

interface PostNavigationProps {
    previous: MarkdownNode | null,
    next: MarkdownNode | null,
}

function PostNavigation(props: PostNavigationProps) {
    const {previous, next} = props;

    return (
        <Navigation>
            <PostNavItem post={previous} icon={faChevronLeft} align="left"/>
            <PostNavItem post={next} icon={faChevronRight} align="right"/>
        </Navigation>
    );
}

const Navigation = styled.ul`
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

export default PostNavigation;
