import {GatsbyNode, Node} from "gatsby";
import * as jsYaml from "js-yaml";
import {FileSystemNode} from "gatsby-source-filesystem";

const CreateTag: GatsbyNode['onCreateNode'] = async function (args) {

    const {node, actions, loadNodeContent, createNodeId, createContentDigest} = args;
    const {createNode, createParentChildLink} = actions;

    const fileNode = <FileSystemNode>node;

    const content = await loadNodeContent(node);
    const data = jsYaml.load(content);
    data.category = fileNode.relativeDirectory.split('/').filter(e => e)[0];

    const projectNode: Node = {
        id: createNodeId(`${node.id} >>> Tag`),
        parent: node.id,
        children: [],
        internal: {
            type: `Tag`,
            contentDigest: createContentDigest(data),
            owner: ''
        },
        ...data,
    };

    createNode(projectNode);
    createParentChildLink({parent: node, child: projectNode});
}

export default CreateTag;
