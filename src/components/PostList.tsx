import React from "react";

import styled from "styled-components";

import PostItem from "./PostItem";
import MarkdownNode from "../types/MarkdownNode";

interface PostListProps {
    data: MarkdownNode[]
}

function PostList(props: PostListProps): React.ReactElement<PostListProps> {
    const {data} = props;

    return (
        <List>
            {data.map(markdown => {
                const {title, date} = markdown.frontmatter!;
                const slug = markdown.fields!.slug!;
                return (
                    <PostItem
                        href={slug}
                        key={slug}
                        title={title!}
                        date={date!}/>
                );
            })}
        </List>
    );
}

const List = styled.ul`
  list-style: none;
  padding-left: 20px;
`;

export default PostList;
