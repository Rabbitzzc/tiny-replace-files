export type Strings = string | string[]

export interface OPTIONS_TYPES {
    files: Strings;
    from: string | RegExp;
    to: string;
    freeze?: boolean;
    ignore?: string[];
    disableGlobs?: boolean;
    glob?: object;
    encoding?: BufferEncoding;
    countMatches?: boolean;
}
