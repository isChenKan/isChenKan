module.exports = {
	title: '🌻葵花养殖技术人员',
	description: '前端技术博客',
	// dest: './public', // 设置输出目录
	base: '/', // 设置站点根路径
	themeConfig: {
		// navbar: false,
		sidebar: [
			'/index/',
			{
				title: 'Node.js',
				collapsable: false,
				children: [
					'/node/async/',
					'/node/nvm/',
				],
			},
			{
				title: '前端相关',
				collapsable: false,
				children: [
					'/fe/promise/',
					'/fe/prototype/',
					'/fe/closure/',
					'/fe/es6/',
					'/fe/js/',
					'/fe/question/',
					'/fe/sort/',
					'/fe/tree/',
					'/fe/loading/',
				],
			},
			{
				title: '其它',
				collapsable: false,
				children: [
					'/other/deploy/',
					'/other/git/',
					'/other/mysql/',
					'/other/snake/',
				],
			},
		],
		nav: [
			{
				text: 'Contact',
				items: [
					{ text: '发个邮件给我', link: 'mailto: ischenkan@outlook.com' },
				]
			}
		],
		sidebarDepth: 2,
	},
	head: [
		['link', { rel: 'icon', href: '/icon.ico' }],
		['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
		['link', { rel: 'manifest', href: '/site.webmanifest' }],
		['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js' }],
		['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/utils/Draggable.min.js' }],
	],
	markdown: {
		lineNumbers: true
	},
	serviceWorker: true,
}
