import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { getPathsAsync, getPathsSync } from '../src/utils/index'

test('getPathsAsync', async () => {
    const p1 = {
        files: '123',
        from: '11',
        to: '22'
    }
    assert.is(typeof getPathsAsync('123', p1), 'object')

    const res = await getPathsAsync('123', p1)
    assert.equal(res, [])
})
test('getPathsSync', () => {
    const p1 = {
        files: '123',
        from: '11',
        to: '22'
    }
    assert.equal(getPathsSync('123', p1), [])
})
