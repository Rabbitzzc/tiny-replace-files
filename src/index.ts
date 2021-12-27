import { OPTIONS_TYPES } from './utils/constance'
import { parseOptions, getPathsAsync, replaceFactory } from './utils/index'
import * as fs from 'fs';
/**
 * Async main
 */
const replaceStringInFiles = (options: OPTIONS_TYPES) => {
    try {
        options = parseOptions(options)
    } catch (error) {
        return Promise.reject(error)
    }

    const { files, from, to, freeze } = options

    // freeze mode, do not replace
    if (freeze) {
        console.warn('running in freeze mode, no change...')
    }

    return getPathsAsync(files, options).then((paths) =>
        Promise.all(paths.map(file => replaceFileAsync(file, options)))
    )
}


/**
 * Sync replaceStringInFiles
 */
const replaceStringInFilesSync = (options: OPTIONS_TYPES) => {

}

/**
 * replace string in single file
 */
const replaceFileAsync = (file: string, options: OPTIONS_TYPES) => {
    const { from, to, encoding, freeze, countMatches } = options

    return new Promise((resolve, reject) => {
        fs.readFile(file, { encoding }, (error, contents) => {
            if (error) return reject(error)

            // replace action
            const { result, newContents } = replaceFactory(contents, from, to, file, countMatches)

            if (!result.changed || freeze) return resolve(result)

            // write action
            fs.writeFile(file, newContents, encoding, error => {
                if (error) return reject(error)
                resolve(result)
            })
        })
    })
}
