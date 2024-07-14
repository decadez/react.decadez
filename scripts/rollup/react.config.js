/**
 * 导出一个数组，数组第一个对象是react/index.js 配置，定义输入文件和输出文件，然后配置插件和package.json；
 * 数组第二个对象为react/jsx-runtime.js 和 react/jsx-dev-runtime.js 的配置
 */

import Utils from './utils';
// 用于生成 package.json 文件
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = Utils.getPackageJson('react');
const pkgPath = Utils.resolvePkgPath(name);
// react 包产物路径
const pkgDistPath = Utils.resolvePkgPath(name, true);

export default [
	// react/index.js
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				name: 'react',
				format: 'umd'
			}
		],
		plugins: [
			...Utils.getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// react/jsx-runtime.js
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime',
				format: 'umd'
			}
		],
		plugins: Utils.getBaseRollupPlugins()
	}
];

/**
 * 这里实现了使用rollup 打包产物
 */