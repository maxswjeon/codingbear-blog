import {CreateSchemaCustomizationArgs, GatsbyNode, PluginOptions} from "gatsby";

import createCategorySchema from "./CreateCategorySchema";
import crateProjectSchema from "./CreateProjectSchema";
import createTagSchema from "./CreateTagSchema";

const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async function (args: CreateSchemaCustomizationArgs, options: PluginOptions) {
    await createCategorySchema!(args, options);
    await crateProjectSchema!(args, options);
    await createTagSchema!(args, options);
}

export default createSchemaCustomization;
