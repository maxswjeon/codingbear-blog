import path from "path";

import {GatsbyNode} from "gatsby";

import MarkdownNode from "../../src/types/MarkdownNode";
import ProjectNode from "../../src/types/ProjectNode";
import CategoryNode from "../../src/types/CategoryNode";

interface MarkdownQueryResult {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
        allProject: {
            nodes: ProjectNode[]
        }
        allCategory: {
            nodes: CategoryNode[]
        }
    }
}

const createPages: GatsbyNode["createPages"] = async function (args) {

    const {graphql, actions} = args;

    const {createPage} = actions;
    const {data}: MarkdownQueryResult = <MarkdownQueryResult>await graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            slug
            category
            directory
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
            type
          }
        }
      }
      allCategory {
        nodes {
          category
          project
        }
      }
    }
  `);

    const templatePath = path.join(__dirname, '../../src/templates');

    // Create Category Landing Page
    for (const category of data.allCategory.nodes) {
        createPage({
            path: '/' + category.category!,
            component: path.join(templatePath, 'CategoryTemplate.tsx'),
            context: {
                category: category.category!
            }
        });

        createPage({
            path: '/' + category.category! + '/tags',
            component: path.join(templatePath, 'lists/TagTemplate.tsx'),
            context: {
                category: category.category!
            }
        });

        if (category.project) {
            createPage({
                path: '/' + category.category! + '/projects',
                component: path.join(templatePath, 'lists/ProjectTemplate.tsx'),
                context: {
                    category: category.category!
                }
            });
        }
    }

    for (const project of data.allProject.nodes) {
        const {slug, type} = project.fields!;
        const {title} = project;

        createPage({
            path: slug!,
            component: path.join(templatePath, 'entries/ProjectTemplate.tsx'),
            context: {
                project: title!,
                type: type!
            }
        });
    }

    const createdTags: string[] = [];
    for (const markdown of data.allMarkdownRemark.nodes) {
        const {slug, category} = markdown.fields!;
        const {tags} = markdown.frontmatter!;

        // Create Markdown Page (Content)
        createPage({
            path: slug!,
            component: path.resolve(path.join(templatePath, `MarkdownTemplate.tsx`)),
            context: {
                slug: slug!
            },
        });

        if (tags) {
            for (const tag of tags) {
                if (createdTags.includes(tag)) {
                    return;
                }

                createPage({
                    path: '/' + category! + '/tags/' + tag,
                    component: path.resolve(path.join(templatePath, 'entries/TagTemplate.tsx')),
                    context: {
                        tag: tag,
                        category: category!
                    }
                });

                createdTags.push(tag!);
            }
        }
    }
}

export default createPages;
