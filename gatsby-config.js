module.exports = {
    siteMetadata: {
        title: `Codingbear's blog`,
        description: `Blog containing something that Codingbear has learned, developed, etc.`,
        author: `Jeon Sangwan <maxswjeon@naver.com>`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                allExtensions: true,
            }
        },
        {
            resolve: `gatsby-plugin-ts-config`,
            options: {
                configDir: 'gatsby'
            }
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Noto Sans KR`,
                        variants: [`400`, `700`]
                    },
                ],
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/posts`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            enableCustomId: true,
                        }
                    },
                    {
                        resolve: `gatsby-remark-mermaid`,
                        options: {
                            viewport: {
                                width: 1024,
                                height: 400,
                            }
                        }
                    },
                    `gatsby-remark-embed-video`,
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-abbr`,
                    `gatsby-remark-sub-sup`,
                    {
                        resolve: `gatsby-remark-footnotes`,
                        options: {
                            footnoteBackRefPreviousElementDisplay: "inline",
                            footnoteBackRefDisplay: "inline",
                            footnoteBackRefInnerText: "^",
                            footnoteBackRefAnchorStyle: `text-decoration: none;`,
                            footnoteBackRefInnerTextStartPosition: "front",
                        }
                    },
                    {
                        resolve: `gatsby-remark-attr`,
                        options: {
                            allowDangerousDOMEventHandlers: true
                        },
                    },
                    `gatsby-remark-mathjax-ssr`,
                    // `gatsby-remark-twemoji-shortcut`,
                    // `gatsby-remark-normalize-paths`,
                    // {
                    //     resolve: `gatsby-remark-relative-images`,
                    //     options: {
                    //         maxWidth: 500,
                    //     }
                    // },
                    // {
                    //     resolve: `gatsby-remark-external-links`,
                    //     options: {
                    //         target: '_self',
                    //         rel: 'nofollow',
                    //     }
                    // },
                    // `gatsby-remark-copy-linked-files`,
                ],
            }
        }
    ],
};
