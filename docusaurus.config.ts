import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
import social from './data/social'

const beian = '豫ICP备2024078050号-1'
const beian1 = '豫公网安备41010502006082'

const config: Config = {
  title: 'LeylaTop',
  url: 'https://leyla.top',
  baseUrl: '/',
  // favicon: 'img/favicon.ico',
  favicon: 'https://leyla.top/img/favicon.ico',
  organizationName: 'LeylaTop',
  projectName: 'blog',
  customFields: {
    bio: '道阻且长，行则将至',
    description:
      '是一个由Leyla创建的个人博客，主要分享编程开发知识和项目，该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。',
  },
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    image: 'img/og.png',
    metadata: [
      {
        name: 'author',
        content: 'Leyla',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 主攻React',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        alt: 'Leyla',
        src: '/img/logo.svg',
        srcDark: '/img/logo.svg',
      },
      hideOnScroll: true,
      items: [
        { label: '博客', position: 'right', to: 'blog' },
        { label: '笔记', position: 'right', to: 'docs/note' },
        // { label: '项目', position: 'right', to: 'project' },
        // { label: '友链', position: 'right', to: 'friends' },
        { label: '工具', position: 'right', to: 'tool' },
        { label: '关于', position: 'right', to: 'about' },
        // {
        //   label: '更多',
        //   position: 'right',
        //   items: [
        //     { label: '归档', to: 'blog/archive' },
        //     { label: '笔记', to: 'docs/note' },
        //     { label: '工具推荐', to: 'docs/tools' },
        //   ],
        // },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            // { label: '归档', to: 'blog/archive' },
            { label: '技术笔记', to: 'docs/note' },
            // { label: '实战项目', to: 'project' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            // { label: 'Twitter', href: social.x.href },
            // { label: '掘金', href: social.juejin.href },
            // { label: 'Discord', href: social.discord.href },
          ],
        },
        // {
        //   title: '网站',
        //   items: [
        //     { label: 'js反混淆', to: 'https://js-deobfuscator.leyla.cn' },
        //     { label: 'cyberChef', to: 'https://gchq.github.io/CyberChef' },
        //     { label: 'api服务', to: 'https://api.leyla.cn' },
        //     { label: '便民服务', to: 'https://service.leyla.cn' },
        //     { label: '站点监控', to: 'https://uptime.leyla.cn' },
        //   ],
        // },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            {
              html: `
                <a href="https://docusaurus.io" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                </a>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${
          beian1.match(/\d+/)?.[0]
        }" >${beian1}</a></p>
        `,
    },
    algolia: {
      appId: '6KIX5EFJP3',
      apiKey: 'cd149a11a95e0e50ab3cbac68bfd86f4',
      indexName: 'leyla',
      contextualSearch: true,
      insights: true,
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: ['bash', 'json', 'java', 'python', 'php', 'graphql', 'rust', 'toml', 'protobuf', 'diff'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'leylatop/blog',
      repoId: 'R_kgDON1ou_A',
      category: 'General',
      categoryId: 'DIC_kwDON1ou_M4Cpo-y',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/tweet-theme.css'],
        },
        // sitemap: {
        //   priority: 0.5,
        // },
        gtag: {
          trackingID: 'G-KCPB0V29QG',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    // 'docusaurus-plugin-image-zoom',
    // '@docusaurus/plugin-ideal-image',
    // ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: process.env.NODE_ENV === 'development',
    //     offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
    //     pwaHead: [
    //       { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
    //       { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
    //       { tagName: 'meta', name: 'theme-color', content: '#12affa' },
    //     ],
    //   },
    // ],
    // [
    //   'vercel-analytics',
    //   {
    //     debug: process.env.NODE_ENV === 'development',
    //     mode: 'auto',
    //   },
    // ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/leylatop/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '记录人生路程',
        blogSidebarCount: 10,
        blogSidebarTitle: '博文',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        // feedOptions: {
        //   type: 'all',
        //   title: '愧怍',
        //   description: 'feedId:41215011978385457+userId:41840354283324416',
        //   copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        // },
      },
    ],
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    async function injectMotto() {
      return {
        name: 'docusaurus-motto',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
    (${function () {
      console.log(
        `%c LeylaTop %c https://github.com/leylatop/blog`,
        'color: #fff; margin: 1em 0; padding: 5px 0; background: #12affa;',
        'margin: 1em 0; padding: 5px 0; background: #efefef;',
      )

      const motto = `
This Webisite Powered By LeylaTop.
Written by Docusaurus, Coding with Love.
--------
Love what you do and do what you love.
`

      if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
        document.prepend(document.createComment(motto))
      }
    }.toString()})();`,
              },
            ],
          }
        },
      }
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Leyla的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },
  onBrokenLinks: 'warn',
}

export default config
