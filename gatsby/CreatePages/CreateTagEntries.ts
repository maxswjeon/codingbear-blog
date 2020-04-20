import {GatsbyNode, PluginOptions} from "gatsby";
import path from "path";

const templatePath = path.join(__dirname, '../../src/templates');

interface CreateTagEntriesOptions extends PluginOptions {
    tag: string,
    category: string,
}

const CreateTagEntries: GatsbyNode['createPages'] = async function (args, options) {
    const {actions, cache} = args;
    const {createPage} = actions;
    const {tag, category} = <CreateTagEntriesOptions>options;

    let tagCache: string[] | undefined = await cache.get('tags-created');
    if (!tagCache) {
        tagCache = [];
    }

    if (tagCache.includes(tag)) {
        return;
    }

    if (category === '') {
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

    tagCache.push(tag!);
    cache.set('tags-created', tagCache);
}

export default CreateTagEntries;
