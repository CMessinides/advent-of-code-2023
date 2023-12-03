import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day01 from './day01'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT_1 = dedent`
	1abc2
	pqr3stu8vwx
	a1b2c3d4e5f
	treb7uchet
`
const SAMPLE_INPUT_2 = dedent`
	two1nine
	eightwothree
	abcone2threexyz
	xtwone3four
	4nineeightseven2
	zoneight234
	7pqrstsixteen
`

const PUZZLE_INPUT = await readInput('day01-input.txt')

test('solution 1', () => {
	expect(day01.solvePuzzle1(SAMPLE_INPUT_1)).toBe(142)
	expect(day01.solvePuzzle1(PUZZLE_INPUT)).toBe(54331)
})

test('solution 2', () => {
	expect(day01.solvePuzzle2(SAMPLE_INPUT_2)).toBe(281)
	expect(day01.solvePuzzle2(PUZZLE_INPUT)).toBe(54533)
})
