import path from "path";
import {GatsbyNode} from "gatsby";
import ProjectNode from "../../src/types/ProjectNode";

interface QueryResult {
    data: {
        allProject: {
            nodes: ProjectNode[]
        }
    }
}

const query = `
{
    allProject {
        nodes {
            title
            fields {
                slug
                type
            }
        }
    }
}
`;

const templatePath = path.join(__dirname, '../../src/templates');

const CreateProjectEntries: GatsbyNode['createPages'] = async function (args) {
    const {graphql, actions} = args;
    const {createPage} = actions;

    const {data}: QueryResult = <QueryResult>await graphql(query);
    const projects = data.allProject.nodes;

    for (const project of projects) {
        const {slug, type} = project.fields!;
        const {title} = project;

        createPage({
            path: slug!,
            component: path.join(templatePath, 'entries/ProjectTemplate.tsx'),
            context: {
                project: title!,
                type: type!
            }
        });
    }
}

export default CreateProjectEntries;
