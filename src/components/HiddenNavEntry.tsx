import React from 'react';
import styled from "styled-components";

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
  
  @media (max-width: 640px) {
      list-style-type: none;
      display: block;
      width: 100%;
      height: 50px;
      float:left;
      box-sizing: border-box;
      border-bottom: none;
      
      &:hover {
        border-bottom: none;
        background-color: #E91E63
      }
      
      &.selected {
        border-bottom: #E91E63;
      }
  }
`;

const Link = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  line-height: 50px;
  color: white;
  text-decoration: none;
`;

export default HiddenNavEntry;
