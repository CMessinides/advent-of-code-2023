import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day09 from './day09'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	0 3 6 9 12 15
	1 3 6 10 15 21
	10 13 16 21 30 45
`

const PUZZLE_INPUT = await readInput('day09-input.txt')

test('solution 1', () => {
	expect(day09.solvePuzzle1(SAMPLE_INPUT)).toBe(114)
	expect(day09.solvePuzzle1(PUZZLE_INPUT)).toBe(1987402313)
})
