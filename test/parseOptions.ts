import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { parseOptions } from '../src/utils/index'
test('parseOptions', () => {
    const p1 = {
        files: '123',
        from: '11',
        to: '22'
    }
    assert.equal(parseOptions(p1), {
        files: ['123'],
        from: '11',
        to: '22',
        ignore: [],
        encoding: 'utf-8',
        disableGlobs: false,
        countMatches: false,
        freeze: false,
        glob: {},
    })
})
