import {CreateSchemaCustomizationArgs, GatsbyNode} from "gatsby";

const crateProjectSchema: GatsbyNode['createSchemaCustomization'] = async function (args: CreateSchemaCustomizationArgs) {
    const {actions} = args;
    const {createTypes} = actions;
    const typeDefs = `
        type Project implements Node {
            title: String!
            description: String!
            language: [String!]!
            libraries: [String!]!
        }
    `;
    createTypes(typeDefs);
}

export default crateProjectSchema;
