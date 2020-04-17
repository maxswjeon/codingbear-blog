import React from "react";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

interface PostItemProps {
    href: string,
    title: string,
    date: string,
    tags: string[] | null | undefined,
}

function PostItem(props: PostItemProps) {
    const {href, title, date, tags} = props;

    return (
        <Item>
            <Link href={href}>
                <StyledIcon icon={faCircle} color="#444"/>
                <InfoBox>
                    <Title>{title}</Title>
                    <DateText>{date}</DateText>
                    {
                        tags ? tags.map((tag) => {
                            return (
                                <TagText>
                                    {tag}
                                </TagText>
                            )
                        }) : null
                    }
                </InfoBox>
            </Link>
        </Item>
    );
}

const Item = styled.li`
  border-radius: 10px;
  border: 1px solid #F0F0F0;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  margin: 10px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  display: block;
  overflow: hidden;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  float: left;
  padding: 0 15px;
  width: 15px !important;
  height: 75px !important;
  line-height: 75px;
  
  @media only screen and (max-width: 640px) {
    height: 50px;
    line-height: 50px;
  }
`;

const InfoBox = styled.div`
  float: left;
`;

const Title = styled.h2`
  margin: 15px 0 5px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 1.25em;
  
  @media only screen and (max-width: 640px) {
    font-size: 1.1em;
    margin: 0;
    line-height: 50px;
  }
`;

const DateText = styled.p`
  margin: 0 0 10px 0;
  padding: 5px 15px 5px 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 0.85em;
  float: left;
  
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

const TagText = styled.p`
  margin: 0 0 10px 0;
  padding: 5px;
  background-color: #CCC;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 0.8em;
  float: left;
`;

export default PostItem;
