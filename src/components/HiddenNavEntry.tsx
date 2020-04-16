import React from 'react';
import styled from "styled-components";
import {StyleConfig} from "../config";

interface NavEntryProps {
    selected?: boolean;
    hidden?: boolean;
    onclick: () => void;
}

function HiddenNavEntry(props: React.PropsWithChildren<NavEntryProps>): React.ReactElement<NavEntryProps> {
    return (
        <Item className={props.selected ? 'selected' : ''}>
            <Link onClick={props.onclick}>{props.children}</Link>
        </Item>
    );
}

const Item = styled.li`
  display: none;
  
  @media (max-width: ${StyleConfig.header.breakpoint}px) {
      list-style-type: none;
      display: block;
      width: 100%;
      height: ${StyleConfig.navigation.height_mobile}px;
      float:left;
      box-sizing: border-box;
      border-bottom: none;
      
      &:hover {
        border-bottom: none;
        background-color: ${StyleConfig.navigation.hover}
      }
      
      &.selected {
        border-bottom: ${StyleConfig.navigation.selected};
      }
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

export default HiddenNavEntry;
