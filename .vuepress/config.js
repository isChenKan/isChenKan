// module.exports = {
// 	title: '🌻葵花养殖技术人员',
// 	// description: '前端技术博客',
// 	// dest: './public', // 设置输出目录
// 	// base: '/', // 设置站点根路径
// 	theme: '@vuepress/blog',
// 	themeConfig: {
// 		modifyBlogPluginOptions(blogPlugnOptions) {
// 			const writingDirectoryClassifier = {
// 				id: 'writing',
// 				dirname: '_writings',
// 				path: '/writings/',
// 				layout: 'IndexWriting',
// 				itemLayout: 'Writing',
// 				itemPermalink: '/writings/:year/:month/:day/:slug',
// 				pagination: {
// 					perPagePosts: 5,
// 				},
// 			}

// 			blogPlugnOptions.directories.push(writingDirectoryClassifier)
// 			return blogPlugnOptions
// 		},
// 		// sidebar: [
// 		// 	'/index/',
// 		// 	{
// 		// 		title: 'Node.js',
// 		// 		collapsable: false,
// 		// 		children: [
// 		// 			'/node/async/',
// 		// 			'/node/nvm/',
// 		// 		],
// 		// 	},
// 		// 	{
// 		// 		title: '前端相关',
// 		// 		collapsable: false,
// 		// 		children: [
// 		// 			'/fe/promise/',
// 		// 			'/fe/prototype/',
// 		// 			'/fe/closure/',
// 		// 			'/fe/es6/',
// 		// 			'/fe/js/',
// 		// 			'/fe/question/',
// 		// 			'/fe/sort/',
// 		// 			'/fe/tree/',
// 		// 			'/fe/loading/',
// 		// 		],
// 		// 	},
// 		// 	{
// 		// 		title: '其它',
// 		// 		collapsable: false,
// 		// 		children: [
// 		// 			'/other/deploy/',
// 		// 			'/other/git/',
// 		// 			'/other/mysql/',
// 		// 			'/other/snake/',
// 		// 		],
// 		// 	},
// 		// ],
// 		// nav: [
// 		// 	{
// 		// 		text: 'Contact',
// 		// 		items: [
// 		// 			{ text: '发个邮件给我', link: 'mailto: ischenkan@outlook.com' },
// 		// 		]
// 		// 	}
// 		// ],
// 		nav: [
// 			{
// 				text: 'Home',
// 				link: '/fe/',
// 			},
// 			{
// 				text: 'Archive',
// 				link: '/node/',
// 			},
// 			{
// 				text: 'Tags',
// 				link: '/tag/',
// 			},
// 		],
// 		// sidebarDepth: 2,
// 	},
// 	// head: [
// 	// 	['link', { rel: 'icon', href: '/icon.ico' }],
// 	// 	['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
// 	// 	['link', { rel: 'manifest', href: '/site.webmanifest' }],
// 	// 	['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js' }],
// 	// 	['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/utils/Draggable.min.js' }],
// 	// ],
// 	// markdown: {
// 	// 	lineNumbers: true
// 	// },
// 	// serviceWorker: true,
// 	footer: {
// 		contact: [
// 			{
// 				type: 'github',
// 				link: 'https://github.com/vuejs/vuepress',
// 			},
// 			{
// 				type: 'twitter',
// 				link: 'https://github.com/vuejs/vuepress',
// 			},
// 		],
// 	},
// }

module.exports = {
	title: `🌻葵花养殖技术人员`,
	theme: '@vuepress/blog',
	themeConfig: {
		modifyBlogPluginOptions(blogPlugnOptions) {
			const writingDirectoryClassifier = {
				id: 'writing',
				dirname: '_writings',
				path: '/writings/',
				layout: 'IndexWriting',
				itemLayout: 'Writing',
				itemPermalink: '/writings/:year/:month/:day/:slug',
				pagination: {
					perPagePosts: 5,
				},
			}
			blogPlugnOptions.directories.push(writingDirectoryClassifier)

			const archiveDirectoryClassifierIndex = blogPlugnOptions.directories.findIndex(d => d.id === 'archive')
			blogPlugnOptions.directories.splice(archiveDirectoryClassifierIndex, 1)

			return blogPlugnOptions
		},

		summaryLength: 100,

		nav: [
			{
				text: 'Blog',
				link: '/',
			},
			{
				text: 'Tags',
				link: '/tag/',
			},
			{
				text: 'About',
				link: '/me/',
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
					link: '',
				},
			],
		},
	},
}
