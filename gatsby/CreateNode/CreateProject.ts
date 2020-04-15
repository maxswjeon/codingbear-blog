import {GatsbyNode, Node} from "gatsby";

import * as jsYaml from "js-yaml";

const CreateProject: GatsbyNode['onCreateNode'] = async function (args) {

    const {node, actions, loadNodeContent, createNodeId, createContentDigest} = args;
    const {createNode, createParentChildLink} = actions;

    // Create Root Node projects -> on createSchemaCustomization
    // Load Yaml
    // Add Node Field "lastUpdate"
    // Add Node Field "open" based on lastUpdate (after 7 days)
    const content = await loadNodeContent(node);
    const data = jsYaml.load(content);

    const projectNode: Node = {
        id: createNodeId(`${node.id} >>> Project`),
        parent: node.id,
        children: [],
        internal: {
            type: `Project`,
            contentDigest: createContentDigest(data),
            owner: ''
        },
        ...data,
    };

    createNode(projectNode);
    createParentChildLink({parent: node, child: projectNode});
}

export default CreateProject;
