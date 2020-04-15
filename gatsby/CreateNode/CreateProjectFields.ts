import fs from 'fs';
import path from 'path';
import util from 'util';

import {GatsbyNode, Node} from "gatsby";

import matter from 'gray-matter';

import {getParentNode} from "./Utils";
import {FileSystemNode} from "gatsby-source-filesystem";

const CreateProjectFields: GatsbyNode['onCreateNode'] = async function (args) {
    const {node, actions, getNode} = args;
    const {createNodeField} = actions;

    const readdir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);

    let fileNode_: Node | undefined = await getParentNode(node, getNode, 'File');

    if (fileNode_ === undefined) {
        return;
    }

    const fileNode = <FileSystemNode>fileNode_;
    const projectDir = path.dirname(fileNode.absolutePath);
    const type = fileNode.relativeDirectory.split('/').filter(e => e)[0];
    const files = await readdir(projectDir);

    const now = new Date();
    let lastUpdate = new Date(0);
    for (const file of files) {
        const filePath = path.join(projectDir, file);

        if (!filePath.endsWith('.md')) {
            continue;
        }

        const content = await readFile(filePath);
        const {data} = matter(content);

        const date = new Date(data.date);
        if (lastUpdate < date) {
            lastUpdate = date;
        }
    }

    const title = projectDir.split('/').filter(e => e).pop();

    createNodeField({
        node,
        name: 'lastUpdate',
        value: `${lastUpdate.getTime()}`,
    });

    createNodeField({
        node,
        name: 'open',
        value: `${(now.getTime() - lastUpdate.getTime()) < 7 * 24 * 60 * 60 * 1000}`
    });

    createNodeField({
        node,
        name: 'slug',
        value: '/' + type + '/projects/' + title
    });

    createNodeField({
        node,
        name: 'type',
        value: type
    });
}

export default CreateProjectFields;
