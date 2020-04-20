import React from "react";
import {Helmet} from "react-helmet";
import 'normalize.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig, StyleConfig} from "../config";

import PageHeader from "../components/PageHeader";
import styled, {createGlobalStyle} from "styled-components";
import {dom} from "@fortawesome/fontawesome-svg-core";
import PageFooter from "../components/PageFooter";

interface PageTemplateProps {
    title?: string,
    icon?: IconDefinition,
    icon_color?: string,
    category: string,
    content: React.ReactElement
}

export default function PageTemplate(props: PageTemplateProps) {
    const title = props.title || BlogConfig.name;
    const icon = props.icon || faFolderOpen
    const icon_color = props.icon_color || '#444';

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <GlobalStyles/>
            <PageHeader/>
            <PageContent>
                <Container>
                    <Info>
                        <FontAwesomeIcon icon={icon} color={icon_color}/>
                        <InfoTitle>{createPathElement(decodeURI(props.category))}</InfoTitle>
                    </Info>
                    {props.content}
                </Container>
            </PageContent>
            <PageFooter/>
        </div>
    );
}

export const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

export const PageContent = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  margin-top: -${StyleConfig.category.height}px;
  flex: 1;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${StyleConfig.content.width}px;
  margin: auto;
  padding: ${StyleConfig.content.padding}px;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${StyleConfig.content.background};
  -webkit-box-shadow: ${StyleConfig.content.shadow};
  -moz-box-shadow: ${StyleConfig.content.shadow};
  box-shadow: ${StyleConfig.content.shadow};
`;

export const Info = styled.div`
  height: ${StyleConfig.category.height}px;
  margin: -${StyleConfig.content.padding}px -${StyleConfig.content.padding}px 0 -${StyleConfig.content.padding}px;
  padding: 0 ${StyleConfig.content.padding}px;
  box-sizing: border-box;
  border-bottom: 1px solid ${StyleConfig.category.border_color};
`;

export const InfoTitle = styled.span`
  line-height:  ${StyleConfig.category.height}px;
  height: ${StyleConfig.category.height}px;
  display: inline-block;
  color: ${StyleConfig.category.text_color};
  margin: 0 10px;
`;

export const CategoryLink = styled.a`
  text-decoration: none;
  color: ${StyleConfig.category.text_color};
  
  &:hover {
    text-decoration: underline;
  }
`;

export function createPathElement(category: string) {
    if (category === '/') {
        return [(<span>/</span>)];
    }

    let currentDir = '';
    const PathElement: React.ReactElement[] = [];
    for (const path of category.split('/').filter(e => e)) {
        currentDir += '/' + path;
        PathElement.push((
            <span key={currentDir + '_separator'}>/</span>
        ));
        PathElement.push((
            <CategoryLink href={currentDir} key={currentDir}>{path}</CategoryLink>
        ));
    }

    return PathElement;
}
