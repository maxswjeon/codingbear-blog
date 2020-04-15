import {CreateSchemaCustomizationArgs, GatsbyNode} from "gatsby";

const createCategorySchema: GatsbyNode['createSchemaCustomization'] = async function (args: CreateSchemaCustomizationArgs) {
    const {actions} = args;
    const {createTypes} = actions;
    const typeDefs = `
        type Category implements Node {
            title: String!
            description: String!
            category: String!
            project: Boolean!
        }
    `;
    createTypes(typeDefs);
}

export default createCategorySchema;
