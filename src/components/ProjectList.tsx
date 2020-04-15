import React from "react";
import styled from "styled-components";
import ProjectItem from "./ProjectItem";
import ProjectNode from "../types/ProjectNode";

interface ProjectListProps {
    data: ProjectNode[]
}

function ProjectList(props: ProjectListProps): React.ReactElement<ProjectListProps> {
    const data = props.data;

    return (
        <List>
            {data.map(project => {
                const {title, description} = project;
                const slug = project.fields!.slug!;
                const open = project.fields!.open!;

                return (
                    <ProjectItem
                        href={slug}
                        key={slug}
                        title={title!}
                        description={description!}
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
