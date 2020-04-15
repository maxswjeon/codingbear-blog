import {GatsbyNode, Node, SourceNodesArgs} from "gatsby";
import path from "path";
import util from "util";
import fs from "fs";
import jsYaml from "js-yaml";

const categories = ['development', 'security', 'electronics', 'study', 'extra'];

const sourceNodes: GatsbyNode['sourceNodes'] = async function (args: SourceNodesArgs) {
    const {actions, createNodeId, createContentDigest} = args;
    const {createNode} = actions;

    const postDir = path.join(__dirname, '../../posts');
    const readFile = util.promisify(fs.readFile);

    for (const category of categories) {
        const content = await readFile(path.join(postDir, category, 'config.yaml'), 'utf-8');
        const config = jsYaml.safeLoad(content);

        const data = {
            ...config,
            category,
            project: !!config.project
        };
        const projectNode: Node = {
            id: createNodeId(`root-category-node >>> Category - ${category}`),

            //@ts-ignore : Root Node can have null parent.
            // See https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/api-node-docs.js
            parent: null,
            children: [],
            internal: {
                type: `Category`,
                mediaType: 'text/json',
                content: JSON.stringify(data),
                contentDigest: createContentDigest(data),
                owner: ''
            },
            ...data
        };

        createNode(projectNode);
    }
}

export default sourceNodes;
