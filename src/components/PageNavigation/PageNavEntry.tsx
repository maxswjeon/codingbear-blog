import React from 'react';
import styled from "styled-components";
import {StyleConfig} from "../../config";

interface NavEntryProps {
    Href?: string;
    selected?: boolean;
    hidden?: boolean;
}

function PageNavEntry(props: React.PropsWithChildren<NavEntryProps>): React.ReactElement<NavEntryProps> {
    return (
        <Item selected={props.selected} hidden={props.hidden}>
            <Link href={props.Href}>{props.children}</Link>
        </Item>
    );
}

const Item = styled.li`
  list-style-type: none;
  display: block;
  max-width: ${StyleConfig.navigation.width}px;
  width: calc((100% - 25px) / 6);
  height: ${StyleConfig.navigation.height}px;
  float:left;
  box-sizing: border-box;
  border-bottom: ${(props: NavEntryProps) => props.selected ? `5px solid ${StyleConfig.navigation.selected}` : 'none'};
  
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 5px;
    margin: -5px auto 0;
    background-color: ${StyleConfig.navigation.hover};
    transition: width 250ms;
    -webkit-transition: width 250ms;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  ${(props: NavEntryProps) => props.selected ? `
    &::after{
      content: none;
    }
  ` : ``};
  
  @media screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    max-width: 100%;
    width: 100%;
    height: ${StyleConfig.navigation.height_mobile}px;
    border-bottom: none;
    ${(props: NavEntryProps) => props.selected ? `background-color: ${StyleConfig.navigation.selected}` : ''};
    &:hover {
      background-color: ${StyleConfig.navigation.hover};
    }
    &::after{
      content: none;
    }
    ${(props: NavEntryProps) => props.hidden ? 'display: none' : ''};
  }
`;

const Link = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  line-height: ${StyleConfig.navigation.height}px;
  color: ${StyleConfig.navigation.text_color};
  text-decoration: none;
  
  @media screen and (max-width: ${StyleConfig.header.breakpoint}px) {
    line-height: ${StyleConfig.navigation.height_mobile}px;
  }
`;

export default PageNavEntry;
