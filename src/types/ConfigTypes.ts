type color = string;

interface HeaderStyleConfig {
    padding_top: number,
    padding_bottom: number,
    breakpoint: number,
    background: color,
    text_color: color,
}

interface NavigationStyleConfig {
    width: number,
    height: number,
    height_mobile: number,
    background: color,
    hover: color,
    selected: color,
    text_color: color,
}

interface CategoryStyleConfig {
    height: number,
    background: color,
    border_color: color,
    text_color: color,
}

interface ContentStyleConfig {
    width: number,
    padding: number,
    background: color,
    shadow: string,
}

interface FooterStyleConfig {
    text_color: color,
    height: number,
}

interface TableOfContentsConfig {
    width: number,
    top: number,
    padding: number,
}

interface MarkdownConfig {

}

interface CodeHighlightConfig {

}

export interface StyleConfigType {
    header: HeaderStyleConfig,
    navigation: NavigationStyleConfig,
    category: CategoryStyleConfig,
    content: ContentStyleConfig,
    footer: FooterStyleConfig,
    tableofcontent: TableOfContentsConfig,
    markdown: MarkdownConfig,
    code: CodeHighlightConfig,
}

export interface BlogConfigType {
    name: string,
    github: string,
    repo: string,
}
