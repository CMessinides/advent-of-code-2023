import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day03 from './day03'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	467..114..
	...*......
	..35..633.
	......#...
	617*......
	.....+.58.
	..592.....
	......755.
	...$.*....
	.664.598..
`

const PUZZLE_INPUT = await readInput('day03-input.txt')

test('solution 1', () => {
	expect(day03.solvePuzzle1(SAMPLE_INPUT)).toBe(4361)
	expect(day03.solvePuzzle1(PUZZLE_INPUT)).toBe(556057)
})

test('solution 2', () => {
	expect(day03.solvePuzzle2(SAMPLE_INPUT)).toBe(467835)
	expect(day03.solvePuzzle2(PUZZLE_INPUT)).toBe(82824352)
})
