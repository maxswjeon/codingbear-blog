import path from 'path';
import fs from 'fs';
import util from 'util';

import jsYaml from 'js-yaml';

import {CreateSchemaCustomizationArgs, GatsbyNode, Node, SourceNodesArgs} from 'gatsby';
import {FileSystemNode} from "gatsby-source-filesystem";

import CreateProject from "./CreateNode/CreateProject";
import CreateMarkdownField from "./CreateNode/CreateMarkdownField";
import CreateProjectFields from "./CreateNode/CreateProjectFields";
import CreateTag from "./CreateNode/CreateTag";

interface MarkdownNode {
    fields: {
        slug: string,
    },
    frontmatter: {
        tags?: string[]
    }
}

interface ProjectNode {
    title: string
    fields: {
        slug: string
    }
}

interface MarkdownQueryResult {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        allProject: {
            nodes: ProjectNode[]
        }
    }
}

const categories = ['development', 'security', 'electronics', 'study', 'extra'];

const sourceNodes: GatsbyNode['sourceNodes'] = async function (args: SourceNodesArgs) {
    const {actions, createNodeId, createContentDigest} = args;
    const {createNode} = actions;

    const postDir = path.join(__dirname, '../posts');
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

const createPages: GatsbyNode["createPages"] = async function (args) {

    const {graphql, actions} = args;

    const {createPage} = actions;
    const {data}: MarkdownQueryResult = <MarkdownQueryResult>await graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          frontmatter {
            tags
          } 
        }
      }
      allProject {
        nodes {
          title
          fields {
            slug
          }
        }
      }
    }
  `);

    const templatePath = path.join(__dirname, '../src/templates');

    // Create Category Landing Page
    for (const category of categories) {
        createPage({
            path: '/' + category,
            component: path.join(templatePath, 'CategoryTemplate.tsx'),
            context: {
                category
            }
        });

        createPage({
            path: '/' + category + '/projects',
            component: path.join(templatePath, 'lists/ProjectTemplate.tsx'),
            context: {
                category
            }
        });

        createPage({
            path: '/' + category + '/tags',
            component: path.join(templatePath, 'lists/TagTemplate.tsx'),
            context: {
                category
            }
        });
    }

    for (const project of data.allProject.nodes) {
        const {slug} = project.fields;
        const {title} = project;

        createPage({
            path: slug,
            component: path.join(templatePath, 'entries/ProjectTemplate.tsx'),
            context: {
                project: title
            }
        });
    }

    const createdTags: string[] = [];
    for (const markdown of data.allMarkdownRemark.nodes) {
        const {slug} = markdown.fields;
        const {tags} = markdown.frontmatter;

        // Create Markdown Page (Content)
        createPage({
            path: slug,
            component: path.resolve(path.join(templatePath, `MarkdownTemplate.tsx`)),
            context: {
                slug
            },
        });

        if (tags) {
            for (const tag of tags) {
                if (createdTags.includes(tag)) {
                    return;
                }

                const rootCategory = slug.split('/').filter(e => e)[0];

                createPage({
                    path: '/' + rootCategory + '/tags/' + tag,
                    component: path.resolve(path.join(templatePath, 'entries/TagTemplate.tsx')),
                    context: {
                        tag: tag,
                        category: rootCategory
                    }
                });

                createdTags.push(tag);
            }
        }
    }
}

const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async function (args: CreateSchemaCustomizationArgs) {
    const {actions} = args;
    const {createTypes} = actions;
    const typeDefs = `
        type Category implements Node {
            title: String!
            description: String!
            category: String!
            project: Boolean!
        }
        
        type Project implements Node {
            title: String!
            description: String!
            language: [String!]!
            libraries: [String!]!
        }
        
        type Tag implements Node {
            title: String!
            description: String!
            category: String!
        }
    `;
    createTypes(typeDefs);
}

export {
    sourceNodes,
    onCreateNode,
    createPages,
    createSchemaCustomization
};
