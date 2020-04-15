import React from 'react';
import styled from "styled-components";
import {Location, WindowLocation} from '@reach/router';

import PageNavEntry from "./PageNavEntry";
import HiddenNavEntry from "./HiddenNavEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

interface PageNavigationProps {
    location?: WindowLocation;
}

interface PageNavigationState {
    collapsed: boolean
    width: number
}

export class PageNavigation extends React.Component<PageNavigationProps, PageNavigationState> {

    // If Window is bigger than 640px, Hidden Tag is ignored automatically

    constructor(props: PageNavigationProps) {
        super(props);

        this.toggleList = this.toggleList.bind(this);
        this.onResize = this.onResize.bind(this);
        this.state = {
            collapsed: true,
            width: 0
        }
    }

    toggleList() {
        this.setState(({collapsed}) => {
            return {
                collapsed: !collapsed
            }
        });
    }

    onResize() {
        // On Shrink, Auto-Collapse Navigation
        if (this.state.width > 640 && window.innerWidth <= 640) {
            this.setState({
                width: window.innerWidth,
                collapsed: true
            })
        }
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.onResize);
    }

    shouldComponentUpdate(
        nextProps: Readonly<any>,
        nextState: Readonly<PageNavigationState>,
        nextContext: any): boolean {
        return this.state.collapsed != nextState.collapsed;
    }

    render(): React.ReactElement | null {
        const {location} = this.props;

        if (!location) {
            return null;
        }

        return (
            <Container>
                <PageNavEntry
                    Href={"/"}
                    selected={location.pathname === '/'}
                    hidden={this.state.collapsed}>
                    홈
                </PageNavEntry>
                <PageNavEntry
                    Href={"/development"}
                    selected={location.pathname.startsWith('/development')}
                    hidden={this.state.collapsed}>
                    개발
                </PageNavEntry>
                <PageNavEntry
                    Href={"/security"}
                    selected={location.pathname.startsWith('/security')}
                    hidden={this.state.collapsed}>
                    보안
                </PageNavEntry>
                <PageNavEntry
                    Href={"/electronics"}
                    selected={location.pathname.startsWith('/electronics')}
                    hidden={this.state.collapsed}>
                    전자공학
                </PageNavEntry>
                <PageNavEntry
                    Href={"/study"}
                    selected={location.pathname.startsWith('/study')}
                    hidden={this.state.collapsed}>
                    공부
                </PageNavEntry>
                <PageNavEntry
                    Href={"/extra"}
                    selected={location.pathname.startsWith('/extra')}
                    hidden={this.state.collapsed}>
                    기타
                </PageNavEntry>
                <HiddenNavEntry
                    onclick={this.toggleList}
                    selected={location.pathname.startsWith('/extra')}>
                    <FontAwesomeIcon icon={faBars} color="#FFF"/>
                </HiddenNavEntry>
            </Container>
        );
    }
}

export default function (props: PageNavigationProps) {
    return (
        <Location>
            {locationProps => <PageNavigation {...locationProps} {...props}/>}
        </Location>
    );
}

const Container = styled.ul`
  background-color: #282C34;
  width: 100%;
  max-width: 968px;
  margin: auto;
  padding: 0;
  overflow: auto;
  box-sizing: border-box;
  
  @media only screen and (max-width: 968px) {
    padding-left: 25px;
  }
  @media only screen and (max-width: 640px) {
    padding: 0; 
  }
  @media print {
    display: none;
  }
`;

