module.exports = {
	title: `🤯社长の前端笔记本`,
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
		smoothScroll: true,
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
		],
		footer: {
			contact: [
				{
					type: 'mail',
					link: 'mailto: ischenkan@outlook.com',
				},
			],
			copyright: [
				{
					text: 'Create by 🌻社长的社畜',
					link: 'https://kuifafa.com',
				},
			],
		},
		globalPagination: {
			prevText: '上一页', // Text for previous links.
			nextText: '下一页', // Text for next links.
			lengthPerPage: '10', // Maximum number of posts per page.
			layout: 'Pagination', // Layout for pagination page
		}
	},
}
