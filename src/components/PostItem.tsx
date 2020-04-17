import React from "react";
import styled from "styled-components";

interface PostItemProps {
    href: string,
    title: string,
    date: string,
    key: string
}

function PostItem(props: PostItemProps) {
    const {href, title, date, key} = props;

    return (
        <Item key={key}>
            <DateText>{date}</DateText>
            <Link href={href}>{title}</Link>
        </Item>
    );
}

const Item = styled.li`
  margin: 10px 0;
`;

const DateText = styled.b`
  margin-right: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export default PostItem;
