import path from "path";
import {GatsbyNode} from "gatsby";
import CategoryNode from "../../src/types/CategoryNode";

interface QueryResult {
    data: {
        allCategory: {
            nodes: CategoryNode[]
        }
    }
}

const query = `
{
    allCategory {
        nodes {
            category
            project
        }
    }
}
`;

const templatePath = path.join(__dirname, '../../src/templates');

const CreateCategoryPage: GatsbyNode['createPages'] = async function (args) {
    const {graphql, actions} = args;
    const {createPage} = actions;

    const {data}: QueryResult = <QueryResult>await graphql(query);
    const categories = data.allCategory.nodes;

    for (const category of categories) {
        createPage({
            path: '/' + category.category!,
            component: path.join(templatePath, 'CategoryTemplate.tsx'),
            context: {
                category: category.category!
            }
        });

        createPage({
            path: '/' + category.category! + '/tags',
            component: path.join(templatePath, 'lists/TagTemplate.tsx'),
            context: {
                category: category.category!
            }
        });

        if (category.project) {
            createPage({
                path: '/' + category.category! + '/projects',
                component: path.join(templatePath, 'lists/ProjectTemplate.tsx'),
                context: {
                    category: category.category!
                }
            });
        }
    }
}

export default CreateCategoryPage;
