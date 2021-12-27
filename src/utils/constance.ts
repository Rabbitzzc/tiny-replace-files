export type Strings = string | string[]

export type From = string | RegExp | FromCallback

export type To = string | ToCallback

export type FromCallback = (file: string) => string | RegExp | string[]

export type ToCallback = (match: string, file: string) => string | string[]

export interface OPTIONS_TYPES {
    files: Strings
    from: From
    to: To
    freeze?: boolean
    ignore?: string[]
    disableGlobs?: boolean
    glob?: object // fast-glob config info
    encoding?: BufferEncoding
    countMatches?: boolean
}
