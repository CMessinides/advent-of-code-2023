import { expect, test } from 'vitest'
import { textToArray2D } from './text'
import { Array2D } from './array2d'

test('textToArray2D', () => {
	expect(textToArray2D('abc\ndef\nghi')).toEqual(new Array2D(3, 3, [...'abcdefghi']))
})
