import React from "react";
import styled from "styled-components";
import ProjectItem from "./ProjectItem";

interface ProjectInfo {
    title: string
    description: string
    language: string[]
    libraries: string[]
    fields: {
        type: string
        lastUpdate: string
        open: string
        slug: string
    }
}

interface ProjectListProps {
    data: ProjectInfo[]
}

function ProjectList(props: ProjectListProps) {
    const data = props.data;

    return (
        <List>
            {data.map(project => {
                const {title, description} = project;
                const slug = project.fields.slug;
                const open = project.fields.open === 'true';

                return (
                    <ProjectItem
                        href={slug}
                        key={slug}
                        title={title}
                        description={description}
                        open={open}/>
                );
            })}
        </List>
    );
}

const List = styled.ul`
  padding: 0;
`;

export default ProjectList;
