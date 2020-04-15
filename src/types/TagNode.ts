import {Node} from "gatsby";

export default interface TagNode extends Node {
    title?: string,
    description?: string,
    category?: string,
}
