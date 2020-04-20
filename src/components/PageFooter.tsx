import React from "react";
import styled from "styled-components";
import {BlogConfig, StyleConfig} from "../config";

function PageFooter(): React.ReactElement {
    return (
        <Footer>
            <FooterContent>
                <FooterLink>(c) 2020 Sangwan Jeon</FooterLink>
                <FooterLink href="/About">About</FooterLink>
                <FooterLink href={BlogConfig.github}>Github</FooterLink>
            </FooterContent>
        </Footer>
    );
}

const Footer = styled.div`
  width: 100%;
  height: 125px;
  overflow: auto;
  background-color: ${StyleConfig.header.background};
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: ${StyleConfig.content.width}px;
  margin: auto;
  padding: 25px;
  box-sizing: border-box;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: ${StyleConfig.footer.text_color};
  margin: 0 10px;
`

export default PageFooter;
