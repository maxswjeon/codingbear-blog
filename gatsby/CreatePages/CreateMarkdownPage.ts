import path from "path";
import {GatsbyNode} from "gatsby";
import MarkdownNode from "../../src/types/MarkdownNode";
import CreateTagEntries from "./CreateTagEntries";

interface QueryResult {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}

const query = `
{
    allMarkdownRemark(sort: {fields: [fields___category, fields___project, frontmatter___date, frontmatter___title], order: ASC}) {
        nodes {
            fields {
                slug
                category
                directory
            }
            frontmatter {
                title
                tags
            } 
        }
    }
}
`;

const templatePath = path.join(__dirname, '../../src/templates');

const CreateMarkdownPage: GatsbyNode['createPages'] = async function (args, options) {
    const {graphql, actions} = args;
    const {createPage} = actions;

    const {data}: QueryResult = <QueryResult>await graphql(query);
    const markdowns = data.allMarkdownRemark.nodes;

    for (let index = 0; index < markdowns.length; ++index) {
        const markdown = markdowns[index];

        const {slug, category, project} = markdown.fields!;
        const {tags} = markdown.frontmatter!;

        let previous = null;
        let next = null;

        // If current markdown file is not the first file
        if (index !== 0) {
            previous = markdowns[index - 1];

            if (previous.fields!.category !== category || previous.fields!.project !== project) {
                previous = null;
            }
        }

        if (index !== markdowns.length - 1) {
            next = markdowns[index + 1];

            if (next.fields!.category !== category || next.fields!.project !== project) {
                next = null;
            }
        }

        // Create Markdown Page (Content)
        createPage({
            path: slug!,
            component: path.resolve(path.join(templatePath, `MarkdownTemplate.tsx`)),
            context: {
                slug: slug!,
                previous: previous,
                next: next,
            },
        });

        if (tags) {
            for (const tag of tags) {
                if (!options) {
                    options = {
                        plugins: []
                    };
                }

                options.tag = tag;
                options.category = category;
                await CreateTagEntries!(args, options);
            }
        }
    }
}

export default CreateMarkdownPage;
