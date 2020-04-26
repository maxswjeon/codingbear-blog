import React from "react";
import styled from "styled-components";
import {BlogConfig, StyleConfig} from "../config";

function PageFooter(): React.ReactElement {
    return (
        <Footer>
            <FooterContent>
                <FooterLink href="/About">About</FooterLink>&#32;
                <FooterLink href={BlogConfig.github}>Github</FooterLink>
                <br/>
                <FooterText>© 2020 Sangwan Jeon</FooterText>
                <br/>
                <FooterText>
                    Design Inspired by <a href="https://github.com/presscustomizr/hueman">Hueman</a>
                </FooterText>
            </FooterContent>
        </Footer>
    );
}

const Footer = styled.div`
  width: 100%;
  height: ${StyleConfig.footer.height}px;
  overflow: auto;
  background-color: ${StyleConfig.header.background};
  z-index: 1;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: ${StyleConfig.content.width}px;
  margin: auto;
  padding: 25px;
  box-sizing: border-box;
`;

const FooterText = styled.span`
  color: ${StyleConfig.footer.text_color};
  margin: 5px 5px;
  font-size: 0.75em;
  line-height: 1.5;
  
  & > a {
    text-decoration: none;
    color: ${StyleConfig.footer.text_color};
      
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: ${StyleConfig.footer.text_color};
  margin: 5px 10px;
  line-height: 1.5;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:first-child {
    margin-left: 5px;
  }
`

export default PageFooter;
