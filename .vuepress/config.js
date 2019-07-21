module.exports = {
	title: `🌻葵花养殖技术人员`,
	theme: '@vuepress/blog',
	themeConfig: {
		directories: [
			{
				id: 'post',
				dirname: '_posts',
				path: '/',
				layout: 'IndexPost',
				itemLayout: 'Post',
				itemPermalink: '/:year/:month/:day/:slug',
				pagination: {
					lengthPerPage: 5,
				},
			},
		],
		frontmatters: [
			{
				id: "tag",
				keys: ['tag', 'tags'],
				path: '/tag/',
				layout: 'Tags',
				frontmatter: { title: 'Tags' },
				itemlayout: 'Tag',
				pagination: {
					lengthPerPage: 5,
				}
			},
		],
		nav: [
			{
				text: '文章',
				link: '/',
			},
			{
				text: '标签',
				link: '/tag/',
			},
			// {
			// 	text: 'About',
			// 	link: '/me/',
			// },
			{
				text: 'Github',
				link: 'https://github.com/ischenkan/',
			},
		],
		footer: {
			contact: [
				{
					type: 'github',
					link: 'https://github.com/ischenkan',
				},
			],
			copyright: [
				{
					text: 'Create by 🌻葵花养殖技术人员',
					link: '',
				},
			],
		},
	},
}
