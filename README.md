
 <div align="center">
 <!-- <img align="center" width="180" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/logo-shadow.png" /> -->
  <h2>tiny-replace-files</h2>
  <br>
  <blockquote>Like vscode, simple utility to quickly replace text in one or more files.</blockquote>
  <img alt="npm" src="https://img.shields.io/npm/dw/test">
  <img alt="Travis (.org)" src="https://img.shields.io/travis/rust-lang/rust">
  <img alt="npm" src="https://img.shields.io/npm/v/test">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/npm-template/js-npm-template">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/test">
  <img alt="node-current" src="https://img.shields.io/node/v/test">
  <img alt="GitHub" src="https://img.shields.io/github/license/npm-template/js-npm-template">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/npm-template/js-npm-template">
</div>

Scene: generate a templates, then replace initName to newName.
## 📦 Getting Started

### install

```sh
# npm 
npm install --save tiny-replace-files

# yarn
yarn add tiny-replace-files

# pnpm
pnpm install --save tiny-replace-files
```

### usage

**Sync**

```ts
import { replaceSync } from 'tiny-replace-files'

const options = {
  files: 'src/targets/index.js',
  from: 'test-plugin',
  to: 'self-name',
}

# await
const result = replaceSync(options)
console.info(result)
```

**Async**

```ts
import replaceStringInFiles from 'tiny-replace-files'

const options = {
  files: 'src/targets/index.js',
  from: 'test-plugin',
  to: 'self-name',
}

# await
const result = await replaceStringInFiles(options)
console.info(result)

# promise
replaceStringInFiles(options).then((res)=>{
    console.info(res)
}).catch(err=>{
    console.info(err)
})
```

## ⚙️ Changelog

See [CHANGELOG](./CHANGELOG.md).

## LICENSE

[MIT](./LICENSE)

## ✈️  TODO

- [ ] init lib
- [ ] 完成 replaceStringInFiles 函数开发
- [ ] 完成同步开发

