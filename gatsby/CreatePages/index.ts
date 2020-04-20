import {GatsbyNode} from "gatsby";
import CreateCategoryPage from "./CreateCategoryPages";
import CreateProjectEntries from "./CreateProjectEntries";
import CreateMarkdownPage from "./CreateMarkdownPage";

const createPages: GatsbyNode["createPages"] = async function (args) {
    await CreateCategoryPage!(args);
    await CreateProjectEntries!(args);
    await CreateMarkdownPage!(args);
    // CreateTagEntries are Called in CreateMarkdownPage
}

export default createPages;
