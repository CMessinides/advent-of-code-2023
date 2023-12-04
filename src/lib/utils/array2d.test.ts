import { expect, test } from 'vitest'
import { Array2D } from './array2d'

test('rows', () => {
	// [a b c
	//  d e f
	//  g h i]
	const array = new Array2D(3, 3, [...'abcdefghi'])

	expect([...array.rows()]).toEqual([
		['a', 'b', 'c'],
		['d', 'e', 'f'],
		['g', 'h', 'i'],
	])
})

test('neighbors', () => {
	// [0 1 2
	//  3 4 5
	//  6 7 8]
	const array = Array2D.empty(3, 3)

	expect([...array.neighbors(0)]).toEqual([1, 3, 4])
	expect([...array.neighbors(1)]).toEqual([0, 2, 3, 4, 5])
	expect([...array.neighbors(2)]).toEqual([1, 4, 5])
	expect([...array.neighbors(3)]).toEqual([0, 1, 4, 6, 7])
	expect([...array.neighbors(4)]).toEqual([0, 1, 2, 3, 5, 6, 7, 8])
	expect([...array.neighbors(5)]).toEqual([1, 2, 4, 7, 8])
	expect([...array.neighbors(6)]).toEqual([3, 4, 7])
	expect([...array.neighbors(7)]).toEqual([3, 4, 5, 6, 8])
	expect([...array.neighbors(8)]).toEqual([4, 5, 7])
})
