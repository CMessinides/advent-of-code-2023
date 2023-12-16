import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day10 from './day10'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT_1 = dedent`
	.....
	.S-7.
	.|.|.
	.L-J.
	.....
`

const SAMPLE_INPUT_2 = dedent`
	..F7.
	.FJ|.
	SJ.L7
	|F--J
	LJ...
`

const PUZZLE_INPUT = await readInput('day10-input.txt')

test('solution 1', () => {
	expect(day10.solvePuzzle1(SAMPLE_INPUT_1)).toBe(4)
	expect(day10.solvePuzzle1(SAMPLE_INPUT_2)).toBe(8)
	expect(day10.solvePuzzle1(PUZZLE_INPUT)).toBe(6786)
})
