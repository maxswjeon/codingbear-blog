import {CreateSchemaCustomizationArgs, GatsbyNode} from "gatsby";

const createTagSchema: GatsbyNode['createSchemaCustomization'] = async function (args: CreateSchemaCustomizationArgs) {
    const {actions} = args;
    const {createTypes} = actions;
    const typeDefs = `
        type Tag implements Node {
            title: String!
            description: String!
            category: String!
        }
    `;
    createTypes(typeDefs);
}

export default createTagSchema;
