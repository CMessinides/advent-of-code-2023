import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day08 from './day08'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT_1 = dedent`
	RL

	AAA = (BBB, CCC)
	BBB = (DDD, EEE)
	CCC = (ZZZ, GGG)
	DDD = (DDD, DDD)
	EEE = (EEE, EEE)
	GGG = (GGG, GGG)
	ZZZ = (ZZZ, ZZZ)
`

const SAMPLE_INPUT_2 = dedent`
	LLR

	AAA = (BBB, BBB)
	BBB = (AAA, ZZZ)
	ZZZ = (ZZZ, ZZZ)
`

const PUZZLE_INPUT = await readInput('day08-input.txt')

test('solution 1', () => {
	expect(day08.solvePuzzle1(SAMPLE_INPUT_1)).toBe(2)
	expect(day08.solvePuzzle1(SAMPLE_INPUT_2)).toBe(6)
	expect(day08.solvePuzzle1(PUZZLE_INPUT)).toBe(18727)
})
