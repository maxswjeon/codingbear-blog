import React from "react";

import styled from "styled-components";

import TagNode from "../../types/TagNode";
import TagItem from "./TagItem";

interface TagListProps {
    data: TagNode[]
}

function TagList(props: TagListProps): React.ReactElement<TagListProps> {
    const {data} = props;

    return (
        <List>
            {data.map(tag => {
                const {title, category, description} = tag;
                const slug = '/' + category! + '/tags/' + title!;

                return (
                    <TagItem
                        key={slug}
                        title={title!}
                        description={description!}
                        href={slug}
                    />
                );
            })}
        </List>
    );
}

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export default TagList;
