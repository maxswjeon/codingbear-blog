import {GatsbyNode} from "gatsby";
import path from "path";

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
        slug: string,
        type: string
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
            type
          }
        }
      }
    }
  `);

    const templatePath = path.join(__dirname, '../../src/templates');

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
        const {slug, type} = project.fields;
        const {title} = project;

        createPage({
            path: slug,
            component: path.join(templatePath, 'entries/ProjectTemplate.tsx'),
            context: {
                project: title,
                type
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

export default createPages;
