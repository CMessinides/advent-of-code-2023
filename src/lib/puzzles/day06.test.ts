import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day06 from './day06'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	Time:      7  15   30
	Distance:  9  40  200
`

const PUZZLE_INPUT = await readInput('day06-input.txt')

test('solution 1', () => {
	expect(day06.solvePuzzle1(SAMPLE_INPUT)).toBe(288)
	expect(day06.solvePuzzle1(PUZZLE_INPUT)).toBe(2344708)
})

test('solution 2', () => {
	expect(day06.solvePuzzle2(SAMPLE_INPUT)).toBe(71503)
	expect(day06.solvePuzzle2(PUZZLE_INPUT)).toBe(30125202)
})
