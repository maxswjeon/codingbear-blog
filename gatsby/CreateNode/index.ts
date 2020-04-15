import {GatsbyNode} from "gatsby";
import {FileSystemNode} from "gatsby-source-filesystem";
// Create Nodes
import CreateProject from "./CreateProject";
import CreateTag from "./CreateTag";
// Create Node Fields
import CreateMarkdownField from "./CreateMarkdownField";
import CreateProjectFields from "./CreateProjectFields";

const categories = ['development', 'security', 'electronics', 'study', 'extra'];

const onCreateNode: GatsbyNode['onCreateNode'] = async function (args, options) {
    const {node} = args;

    // File Node
    if (node.internal.type === 'File') {
        const fileNode = <FileSystemNode>node;

        // Markdown Files are handled in gatsby-transformer-remark first
        if (fileNode.internal.mediaType !== 'text/yaml') {
            return;
        }

        // Project Config Files (project.yaml)
        if (fileNode.name === 'project') {
            await CreateProject!(args, options);
            return;
        }

        // Tag Files (in {category}/tags)
        if (categories.map(e => e + '/tags').includes(fileNode.relativeDirectory)) {
            await CreateTag!(args, options);
            return;
        }
    }

    // Markdown Node
    if (node.internal.type === 'MarkdownRemark') {
        await CreateMarkdownField!(args, options);
        return;
    }

    // Project Node
    if (node.internal.type === 'Project') {
        await CreateProjectFields!(args, options);
        return;
    }
};

export default onCreateNode;
