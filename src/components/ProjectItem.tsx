import React from "react";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

interface ProjectItemProps {
    title: string,
    description: string,
    open: boolean,
    href: string,
    key: string
}

function ProjectItem(props: ProjectItemProps) {
    const {title, description, open, href} = props;

    return (
        <Item>
            <Link href={href}>
                <StyledIcon icon={faCircle} color={open ? '#82C91E' : '#F0F0F0'}/>
                <InfoBox>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
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

const Description = styled.p`
  margin: 0 0 15px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 0.85em;
  
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

export default ProjectItem;
