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


export interface StyleConfigType {
    header: HeaderStyleConfig,
    navigation: NavigationStyleConfig,
    category: CategoryStyleConfig,
    content: ContentStyleConfig,
}

export interface BlogConfigType {
    name: string,
}
