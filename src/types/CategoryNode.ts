import {Node} from "gatsby";

export default interface CategoryNode extends Node {
    title?: string,
    description?: string,
    category?: string,
    project?: boolean,
}
