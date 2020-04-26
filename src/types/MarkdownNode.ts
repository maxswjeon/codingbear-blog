import {Node} from "gatsby";

export interface MarkdownHeadings {
    depth: number,
    value: string,
}

export interface DefaultMarkdownNode extends Node {
    excerpt?: string,

    // TODO: Type markdown AST Tree
    excerptAst?: any,
    fileAbsolutePath?: string,
    headings?: MarkdownHeadings[]
    html?: string,

    // TODO: Type markdown AST Tree
    htmlAst?: any,

    rawMarkdownBody?: string,
    tableOfContents?: string,
    timeToRead?: number,
    wordCount?: {
        "paragraphs": number,
        "sentences": number,
        "words": number
    },
}

export default interface MarkdownNode extends DefaultMarkdownNode {
    fields?: {
        project?: string | null
        slug?: string
        category?: string
        directory?: string
    },
    frontmatter?: {
        title?: string
        date?: string
        tags?: string[]
    }
}
