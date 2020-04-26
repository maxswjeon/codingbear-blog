import fs from 'fs';
import util from 'util';
import path from 'path';

import {GatsbyNode, Node} from "gatsby";
import {FileSystemNode} from "gatsby-source-filesystem";
import {getParentNode} from "./Utils";

import jsYaml from 'js-yaml';

const CreateMarkdownField: GatsbyNode['onCreateNode'] = async function (args) {
    const {node, actions, getNode} = args;
    const {createNodeField} = actions;

    const exists = util.promisify(fs.exists);
    const readFile = util.promisify(fs.readFile);

    const fileNode_: Node | undefined = await getParentNode(node, getNode, 'File');

    if (fileNode_ === undefined) {
        return;
    }
    const fileNode = <FileSystemNode>fileNode_;

    const pathSlice = fileNode.relativePath.split('/').filter(e => e);
    const category = pathSlice.length !== 1 ? pathSlice[0] : '';

    const projectPath = path.join(path.dirname(fileNode.absolutePath), 'project.yml');
    if (await exists(projectPath)) {
        const content = await readFile(projectPath, 'utf-8');
        const {title} = jsYaml.safeLoad(content);

        createNodeField({
            node,
            name: 'project',
            value: title
        });

        pathSlice.splice(1, 0, 'projects');
    }

    pathSlice.pop()
    pathSlice.push(fileNode.name);
    createNodeField({
        node,
        name: 'slug',
        value: '/' + pathSlice.join('/'),
    });

    createNodeField({
        node,
        name: 'category',
        value: category,
    });

    pathSlice.pop();
    createNodeField({
        node,
        name: 'directory',
        value: '/' + pathSlice.join('/')
    });
}

export default CreateMarkdownField;
