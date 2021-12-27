import { OPTIONS_TYPES, Strings } from './constance'
import * as fg from 'fast-glob';

/**
 * init parse options
 */
export const parseOptions = (options: OPTIONS_TYPES) => {
    if (!options.encoding) options.encoding = 'utf-8'
    return options
}


/**
 * use fast-glob to get all files
 */
export const getPathsAsync = (patterns: Strings, options: OPTIONS_TYPES) => {
    const { ignore, disableGlobs, glob: cfg } = options

    // disable globs, just ensure file(s) name
    if (disableGlobs) return Promise.resolve(patterns)

    return globFilesAsync(patterns, ignore, cfg)
}



/**
 * use fast-glob to  glob file(s)
 */
export const globFilesAsync = (patterns: Strings, ignore: string[], cfg) => {
    cfg = Object.assign({ ignore, nodir: true, dot: true }, cfg)
    return fg(patterns, cfg)
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
