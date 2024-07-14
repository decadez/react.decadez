import path from 'path';
import fs from 'fs';
// 用于编译 Typescript
import ts from 'rollup-plugin-typescript2';
// 将 CommonJS 模块转换为 ES 模块
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}

function getPackageJson(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: 'utf8' });
  return JSON.parse(str);
}

export default {
	resolvePkgPath,
	getBaseRollupPlugins,
	getPackageJson,
}