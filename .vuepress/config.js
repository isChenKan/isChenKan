module.exports = {
	title: `🌻葵花养殖技术人员`,
	theme: '@vuepress/blog',
	plugins: [
		[
			'@vuepress/google-analytics',
			{
				'ga': 'UA-145160931-1'
			}
		]
	],
	themeConfig: {
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
					link: 'https://kuifafa.com',
				},
			],
		},
	},
}
