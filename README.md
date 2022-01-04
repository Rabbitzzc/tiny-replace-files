
 <div align="center">
 <!-- <img align="center" width="180" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/logo-shadow.png" /> -->
  <h2>tiny-replace-files</h2>
  <br>
  <blockquote>Like vscode, simple utility to quickly replace text in one or more files.</blockquote>
</div>

![Travis (.org)](https://img.shields.io/travis/Rabbitzzc/tiny-replace-files)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/tiny-replace-files)
![npm](https://img.shields.io/npm/v/tiny-replace-files)
[![GitHub issues](https://img.shields.io/github/issues/Rabbitzzc/tiny-replace-files)](https://github.com/Rabbitzzc/tiny-replace-files/issues)
[![GitHub stars](https://img.shields.io/github/stars/Rabbitzzc/tiny-replace-files)](https://github.com/Rabbitzzc/tiny-replace-files/stargazers)
[![GitHub license](https://img.shields.io/github/license/Rabbitzzc/tiny-replace-files)](https://github.com/Rabbitzzc/tiny-replace-files/blob/master/LICENSE)

## 📦 Getting Started

### install

```sh
# npm 
npm install --save tiny-replace-files fast-glob

# yarn
yarn add tiny-replace-files fast-glob

# pnpm
pnpm install --save tiny-replace-files fast-glob
```

### usage

#### Sync

```ts
import { replaceStringInFilesSync } from 'tiny-replace-files'

const options = {
  files: 'src/targets/index.js',
  from: 'test-plugin',
  to: 'self-name',
}

# await
const result = replaceStringInFilesSync(options)
console.info(result)
/**
[
  {
    file: './ques2.md',
    changed: true,
    matchCounts: 1,
    replaceCounts: 1
  }
]
*/
```
#### Async

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

### Advanced usage

#### Replace a single file or glob

```ts
const options = {
  files: 'file',
};
```

#### Replace multiple files or globs

```ts
const options = {
  files: [
    'file1',
    'file2',
    'file3',
  ],
};

const options = {
  files: [
    'file1',
    'file2/**',
  ]
};
```

#### Replace by regex

```ts
const options = {
  from: /foo/g,
  to: 'bar',
};
```

#### `from` callback

```ts
const options = {
  files: 'file',
  from: (file) => new RegExp(file, 'g'),
  to: 'bar',
};
```

#### `to` callback

```ts
const options = {
    files: './ques2.md',
    from: 'quest 2',
    to: (match: string) => match.toUpperCase(),
    countMatches: true
}
```

#### Ignore file(s) or glob

```ts
const options = {
  ignore: './ignored/file',
};

const options = {
  ignore: [
    'path/**',
    'path2/index.html',
  ],
};
```

#### Disable globs

do not use fast-glob to get path. if you config this, you can uninstall fast-glob for reduce pkg size.
```ts
const options = {
  disableGlobs: true,
};
```

#### `glob` configuration

API passed to the [fast-glob](https://github.com/mrmlnc/fast-glob#api):

```ts
const options = {
  glob: {
    //Glob settings here
    dot: true, //E.g. to include file names starting with a dot
  },
};
```

#### Character encoding

Use a different character encoding for reading/writing files. Defaults to utf-8.

```ts
const options = {
  encoding: 'utf8',
};
```

#### `freeze` Run

freeze mode will do not replace & change, just run the process.

```ts
const options = {
  freeze: true,
};
```


## ⚙️ Changelog

See [CHANGELOG](./CHANGELOG.md).

## LICENSE

[MIT](./LICENSE)

## ✈️  TODO

- [x] init lib
- [x] 完成 replaceStringInFiles 函数开发
- [x] 完成同步函数开发
- [x] 完成测试
- [ ] 生命周期？？
- [ ] cli???

