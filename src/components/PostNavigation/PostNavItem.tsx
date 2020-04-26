import React from "react";

import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

import {StyleConfig} from "../../config";
import EmptyNavItem from "./EmptyNavItem";
import MarkdownNode from "../../types/MarkdownNode";

interface PostNavItemProps {
    post: MarkdownNode | null,
    icon: IconDefinition,
    align?: string,
}

function PostNavItem(props: PostNavItemProps): React.ReactElement {

    const post = props.post;

    if (post === null) {
        return (
            <EmptyNavItem/>
        );
    }

    const {icon, align} = props;
    const {slug} = post.fields!;
    const {title} = post.frontmatter!;

    return (
        <NavigationItem>
            <NavigationLink href={slug!} className={align}>
                <NavigationText>
                    <NavigationIcon icon={icon}/>
                    {title!}
                </NavigationText>
            </NavigationLink>
        </NavigationItem>
    );
}

const NavigationItem = styled.li`
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

const NavigationLink = styled.a`
  width: 100%;
  height: 50px;
  display: block;
  text-decoration: none;
  color: black;
  line-height: 50px;
`;

const NavigationIcon = styled(FontAwesomeIcon)`
  width: 25px !important;
  height: 25px !important;
  margin: 0 ${StyleConfig.content.padding / 2}px;
  line-height: 50px;
  font-size: 25px;
  vertical-align: text-bottom !important;
  color: #666;
`;

const NavigationText = styled.p`
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

export default PostNavItem;
