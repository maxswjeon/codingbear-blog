import {Node} from "gatsby";

export default interface ProjectNode extends Node {
    title?: string,
    description?: string,
    language?: string[],
    libraries?: string[],
    fields?: {
        lastUpdate?: number,
        open?: boolean,
        slug?: string,
        type?: string,
    }
}
