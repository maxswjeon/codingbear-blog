/*
 * lists/TagTemplate.tsx
 *
 * url : /{category}/tags
 * contents:
 *     - List of Tags in the category
 * context:
 *     - Category Title
 * query:
 *     - All tags with type === category
 */

import React from "react";
import 'normalize.css';

import {graphql} from "gatsby";

import {BlogConfig} from "../../config";
import MarkdownNode from "../../types/MarkdownNode";
import PageTemplate from "../PageTemplate";

interface QueryData {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

function TagTemplate({data}: QueryData) {
    return (
        <div>

        </div>
    )
}

export const pageQuery = graphql`
    query GetAllTagsInCategory($category: String!) {
      allTag(filter: {category: {eq: $category}}) {
        nodes {
          title
          category
          description
        }
      }
    }
`;


export default function (props: QueryData) {
    const {data} = props;
    const {project} = data.allMarkdownRemark.nodes[0].fields!;

    return (
        <PageTemplate
            title={project! + '-' + BlogConfig.name}
            category={project!}
            content={<TagTemplate data={data}/>}
        />
    )
}
