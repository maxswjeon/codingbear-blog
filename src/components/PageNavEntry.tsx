import React from 'react';
import styled from "styled-components";

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
  width: 100px;
  height: 50px;
  float:left;
  box-sizing: border-box;
  border-bottom: ${(props: NavEntryProps) => props.selected ? '5px solid #E91E63' : 'none'};
  
  &:hover {
    border-bottom: 5px solid #E91E63
  } 
  
  @media screen and (max-width: 640px) {
    width: 100%;
    border-bottom: none;
    ${(props: NavEntryProps) => props.selected ? 'background-color: #E91E63' : ''};
    &:hover {
      background-color: #E91E63;
    }
    ${(props: NavEntryProps) => props.hidden ? 'display: none' : ''};
  }
`;

//${(props: NavEntryProps) => props.hidden ? 'display: none' : ''}
const Link = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  line-height: 50px;
  color: white;
  text-decoration: none;
`;

export default PageNavEntry;
