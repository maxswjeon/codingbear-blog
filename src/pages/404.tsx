import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Location, WindowLocation} from '@reach/router';

import PageTemplate from "../templates/PageTemplate";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faFolder, faQuestion, faTag} from "@fortawesome/free-solid-svg-icons";

interface NotFoundProps {
    location: WindowLocation
}

const categories = ['development', 'security', 'electronics', 'study', 'extra'];

function NotFound(props: NotFoundProps) {
    const {location} = props;

    const TagNotFound = (
        <div>
            <IconGlobalStyles/>
            <CenterIcon>
                <FontAwesomeIcon className="icon" icon={faTag}/>
                <FontAwesomeIcon className="icon-right-bottom icon-blue" icon={faQuestion}/>
            </CenterIcon>
            <CenterText>Tag Not Found in Category</CenterText>
        </div>
    );

    const ProjectNotFound = (
        <div>
            <IconGlobalStyles/>
            <CenterIcon>
                <FontAwesomeIcon className="icon" icon={faFolder}/>
                <FontAwesomeIcon className="icon-right-bottom icon-blue" icon={faQuestion}/>
            </CenterIcon>
            <CenterText>Project Not Found in Category</CenterText>
        </div>
    );

    const ProjectNotSupported = (
        <div>
            <IconGlobalStyles/>
            <IconGlobalStyles/>
            <CenterIcon>
                <FontAwesomeIcon className="icon-65" icon={faFolder}/>
                <FontAwesomeIcon className="icon icon-overlap icon-red" icon={faBan}/>
            </CenterIcon>
            <CenterText>Project is not Supported in this Category</CenterText>
        </div>
    );

    const PageNotFound = (
        <div>
            <IconGlobalStyles/>
            <CenterIcon>
                <FontAwesomeIcon className="icon icon-blue" icon={faQuestion}/>
            </CenterIcon>
            <CenterText>Page Not Found</CenterText>
        </div>
    );

    const tagPaths = categories.map(e => '/' + e + '/tags');
    for (const path of tagPaths) {
        if (location.pathname.startsWith(path)) {
            console.log("TagPath");
            return (
                <PageTemplate category={location.pathname} content={TagNotFound}/>
            );
        }
    }

    const projectPaths = categories.map(e => '/' + e + '/projects/');
    for (const path of projectPaths) {
        if (location.pathname.startsWith(path)) {
            return (
                <PageTemplate category={location.pathname} content={ProjectNotFound}/>
            );
        }
    }

    const projectRootPaths = categories.map(e => '/' + e + '/projects');
    for (const path of projectRootPaths) {
        if (location.pathname.startsWith(path)) {
            return (
                <PageTemplate category={location.pathname} content={ProjectNotSupported}/>
            );
        }
    }

    return <PageTemplate category={location.pathname} content={PageNotFound}/>;
}

const IconGlobalStyles = createGlobalStyle`
  .icon {
    width: 100% !important;
    height: 100% !important;
    max-width: 200px;
    max-height: 200px;
  }
  
  .icon-65 {
    width: 65% !important;
    height: 65% !important;
    max-width: 130px;
    max-height: 130px;
    padding: 18.5%;
  }
  
  .icon-overlap {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .icon-right-bottom {
    width: 60% !important;
    height: 60% !important;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  
  .icon-blue {
    color: #005cc5;
  }
  
  .icon-red {
    color: darkred;
  }
`;

const CenterIcon = styled.div`
  width: 50%;
  max-width: 200px;
  height: 50%;
  max-height: 200px;
  margin: 50px auto;
  position: relative;
`;

const CenterText = styled.h1`
  width: 100%;
  text-align: center;
`;

export default function (props: NotFoundProps) {
    return (
        <Location>
            {locationProps => <NotFound {...locationProps} {...props}/>}
        </Location>
    )
};
