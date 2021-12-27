import { OPTIONS_TYPES } from './utils/constance'
import { parseOptions, getPathsAsync, getPathsSync, replaceFactory } from './utils/index'
import * as fs from 'fs';
/**
 * Async main
 */
export const replaceStringInFiles = (options: OPTIONS_TYPES) => {
    try {
        options = parseOptions(options)
    } catch (error) {
        return Promise.reject(error)
    }

    const { files, freeze } = options

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
export const replaceStringInFilesSync = (options: OPTIONS_TYPES) => {
    options = parseOptions(options)

    const { files, freeze } = options
    const paths = getPathsSync(files, options);

    // freeze mode, do not replace
    if (freeze) {
        console.warn('running in freeze mode, no change...')
    }
    if (!Array.isArray(paths)) return replaceFileSync(paths, options)
    return paths.map((path) => replaceFileSync(path, options))
}

/**
 * async replace string in single file
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

/**
 * sync replace string in single file
 */
const replaceFileSync = (file: string, options: OPTIONS_TYPES) => {
    const { from, to, encoding, freeze, countMatches } = options
    const contents = fs.readFileSync(file, encoding);

    const { result, newContents } = replaceFactory(contents, from, to, file, countMatches)

    if (!result.changed || freeze) return result

    fs.writeFileSync(file, newContents, encoding)
}
