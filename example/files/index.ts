import { replaceStringInFiles, replaceStringInFilesSync } from '../../dist/index'


const options = {
    files: [
        './one.md',
        './two.md',
        './three.md',
    ],
    from: 'Quest 2',
    to: (match) => match.toLowerCase(),
    countMatches: true
}

replaceStringInFiles(options).then(res => {
    console.log(res)
}).catch(error => {
    console.info(error)
})
