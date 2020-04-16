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
                        <InfoTitle>{props.category}</InfoTitle>
                    </Info>
                    {props.content}
                </Container>
            </PageContent>
        </div>
    );
}

const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

const PageContent = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  margin-top: -${StyleConfig.category.height}px;
`;

const Container = styled.div`
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

const Info = styled.div`
  height: ${StyleConfig.category.height}px;
  margin: -${StyleConfig.content.padding}px -${StyleConfig.content.padding}px 0 -${StyleConfig.content.padding}px;
  padding: 0 ${StyleConfig.content.padding}px;
  box-sizing: border-box;
  border-bottom: 1px solid ${StyleConfig.category.border_color};
`;

const InfoTitle = styled.span`
  line-height:  ${StyleConfig.category.height}px;
  height: ${StyleConfig.category.height}px;
  display: inline-block;
  color: ${StyleConfig.category.text_color};
  margin: 0 10px;
`;
