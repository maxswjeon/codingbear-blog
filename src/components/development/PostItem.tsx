import React from "react";
import styled from "styled-components";

interface PostItemProps {
    title: string
    href: string
}

function PostItem(props: PostItemProps) {
    return (
        <Item>
            {props.title}
        </Item>
    );
}

const Item = styled.li`

`;

export default PostItem;
