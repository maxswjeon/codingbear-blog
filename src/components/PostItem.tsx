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

const DateText = styled.span`
  margin-right: 10px;
  color: #555;
  font-size: 1.1em;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1.1em;
`;

export default PostItem;
