import {BlogConfigType, StyleConfigType} from "./types/ConfigTypes";

const BlogConfig: BlogConfigType = {
    name: '코딩하는 곰의 공부일지',
    github: 'https://github.com/maxswjeon',
}

const StyleConfig: StyleConfigType = {
    header: {
        padding_top: 75,
        padding_bottom: 25,
        breakpoint: 575.98,
        background: '#1B1F24',
        text_color: 'white',
    },

    navigation: {
        width: 100,
        height: 50,
        height_mobile: 50,
        background: '#282C34',
        hover: '#E91E63',
        selected: '#E91E63',
        text_color: 'white',
    },

    category: {
        height: 50,
        background: 'white',
        border_color: '#EAEAEA',
        text_color: '#959DA5',
    },

    content: {
        width: 1024,
        padding: 32,
        background: 'white',
        shadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },

    footer: {
        text_color: '#CCC',
    },
};

export {
    BlogConfig,
    StyleConfig
}
