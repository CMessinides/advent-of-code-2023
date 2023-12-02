import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day01 from './day01'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	1abc2
	pqr3stu8vwx
	a1b2c3d4e5f
	treb7uchet
`

const PUZZLE_INPUT = await readInput('day01-input.txt')

test('solution 1', () => {
	expect(day01.solvePuzzle1(SAMPLE_INPUT)).toBe(142)
	expect(day01.solvePuzzle1(PUZZLE_INPUT)).toBe(54331)
})
