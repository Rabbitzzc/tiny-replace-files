import { replaceStringInFiles, replaceStringInFilesSync } from '../../dist/index'


const options = {
    files: './ques2.md',
    from: 'quest 2',
    to: (match: string) => match.toUpperCase(),
    countMatches: true
}

// replaceStringInFiles(options).then(res => {
//     console.log(res)
// }).catch(error => {
//     console.info(error)
// })


const result = replaceStringInFilesSync(options)
console.log(result)
