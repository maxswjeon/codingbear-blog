import {BlogConfigType, StyleConfigType} from "./types/ConfigTypes";

const BlogConfig: BlogConfigType = {
    name: '코딩하는 곰의 공부일지',
}

const StyleConfig: StyleConfigType = {
    header: {
        breakpoint: 640,
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
        width: 968,
        padding: 32,
        background: 'white',
        shadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },

};

export {
    BlogConfig,
    StyleConfig
}
