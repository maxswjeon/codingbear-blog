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

import {faTags} from "@fortawesome/free-solid-svg-icons";

import {BlogConfig} from "../../config";
import PageTemplate from "../PageTemplate";
import CategoryNode from "../../types/CategoryNode";
import TagNode from "../../types/TagNode";
import TagList from "../../components/TagList";

interface TagTemplatePageContext {
    category: string
}

interface TagTemplatePageQuery {
    category: CategoryNode
    allTag: {
        nodes: TagNode[]
    }
}

interface TagTemplateProps {
    readonly data: TagTemplatePageQuery,
    readonly pageContext: TagTemplatePageContext,
}

function TagTemplate({data}: TagTemplateProps) {
    const tags = data.allTag.nodes;

    return (
        <div>
            <h1>Tags</h1>
            <TagList data={tags}/>
        </div>
    )
}

export const pageQuery = graphql`
    query GetAllTagsInCategory($category: String!) {
      category(category: {eq: $category}) {
        title
        category
      }
      allTag(filter: {category: {eq: $category}}) {
        nodes {
          title
          category
          description
        }
      }
    }
`;


export default function ({data, pageContext}: TagTemplateProps) {
    const {title, category} = data.category;

    return (
        <PageTemplate
            title={title! + ' - ' + BlogConfig.name}
            category={'/' + category! + '/tags'}
            content={<TagTemplate data={data} pageContext={pageContext}/>}
            icon={faTags}
        />
    )
}
