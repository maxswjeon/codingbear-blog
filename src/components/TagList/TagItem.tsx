import React from "react";
import styled from "styled-components";

interface TagItemProps {
    key: string
    href: string
    title: string
    description: string
}

function TagItem(props: TagItemProps) {
    const {href, title, description} = props;

    return (
        <Item>
            <Link href={href}>
                <TitleText>{title}</TitleText>
                <br/>
                <ContentText>{description}</ContentText>
            </Link>
        </Item>
    );
}

const Item = styled.li`
  border: 1px solid #F0F0F0;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  margin: 10px 0;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  text-decoration:  none;
  color: black;
`;

const TitleText = styled.b`

`;

const ContentText = styled.p`
  margin: 20px 0 0 0;
`;

export default TagItem;
