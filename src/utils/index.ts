import { OPTIONS_TYPES, Strings } from './constance'
import * as fg from 'fast-glob';
import * as fs from 'fs';


/**
 * init parse options
 */
export const parseOptions = (options: OPTIONS_TYPES): OPTIONS_TYPES => {
    const defaults = {
        ignore: [],
        encoding: 'utf-8',
        disableGlobs: false,
        countMatches: false,
        freeze: false,
        glob: {},
    };
    if (typeof options !== 'object' || options === null) {
        throw new Error('options type error');
    }

    options.glob = options.glob ?? {};

    const { files, from, to, ignore, encoding } = options;
    if (typeof files === 'undefined') throw new Error('files type error')

    if (typeof from === 'undefined') throw new Error('from type error')

    if (typeof to === 'undefined') throw new Error('to type error')

    if (!Array.isArray(files)) options.files = [files]

    if (!Array.isArray(ignore)) options.ignore = ignore ? [] : [ignore]

    if (!options.encoding) options.encoding = 'utf-8'

    return Object.assign({}, defaults, options);
}


/**
 * async use fast-glob to get all files
 */
export const getPathsAsync = (patterns: Strings, options: OPTIONS_TYPES) => {
    const { ignore, disableGlobs, glob: cfg } = options

    // disable globs, just ensure file(s) name
    if (disableGlobs) return Promise.resolve(patterns)

    return globFilesAsync(patterns, ignore, cfg)
}



/**
 * sync use fast-glob to get all files
 */
export const getPathsSync = (patterns: Strings, options: OPTIONS_TYPES) => {
    const { ignore, disableGlobs, glob: cfg } = options

    // disable globs, just ensure file(s) name
    if (disableGlobs) return patterns

    return globFilesSync(patterns, ignore, cfg)
}



/**
 * use fast-glob to  glob file(s)
 */
export const globFilesAsync = (patterns: Strings, ignore: string[], cfg) => {
    cfg = Object.assign({ ignore, nodir: true }, cfg)
    return fg(patterns, cfg)
}

/**
 * sync use fast-glob to  glob file(s)
 */
export const globFilesSync = (patterns: Strings, ignore: string[], cfg) => {
    cfg = Object.assign({ ignore, nodir: true }, cfg)
    return fg.sync(patterns, cfg)
}

/**
 * replace main
 */
export const replaceFactory = (contents, from, to, file, count: boolean) => {
    const result: {
        file: any;
        matchCounts?: number;
        replaceCounts?: number;
        changed: boolean
    } = {
        file,
        changed: false
    }


    let item = from
    if (typeof from === 'function') item = from(file)

    if (count) {
        const matches = contents.match(item);
        if (matches) {
            const replacements = matches.filter(match => match !== to);
            result.matchCounts = matches.length
            result.replaceCounts = replacements.length
        }
    }

    const newContents = contents.replace(item, to)

    result.changed = newContents !== contents

    return {
        result,
        newContents
    }
}


/**
 * async replace string in single file
 */
export const replaceFileAsync = (file: string, options: OPTIONS_TYPES) => {
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
export const replaceFileSync = (file: string, options: OPTIONS_TYPES) => {
    const { from, to, encoding, freeze, countMatches } = options
    const contents = fs.readFileSync(file, encoding);

    const { result, newContents } = replaceFactory(contents, from, to, file, countMatches)

    if (!result.changed || freeze) return result

    fs.writeFileSync(file, newContents, encoding)
}
