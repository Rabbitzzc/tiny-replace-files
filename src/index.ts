import { OPTIONS_TYPES } from './utils/constance'
import { parseOptions, getPathsAsync, getPathsSync, replaceFileAsync, replaceFileSync } from './utils/index'

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

    return getPathsAsync(files, options).then((paths) => {
        return Promise.all(paths.map(file => replaceFileAsync(file, options)))
    })
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

export default replaceStringInFiles
