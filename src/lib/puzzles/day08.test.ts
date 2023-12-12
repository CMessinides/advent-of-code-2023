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

const SAMPLE_INPUT_3 = dedent`
	LR

	11A = (11B, XXX)
	11B = (XXX, 11Z)
	11Z = (11B, XXX)
	22A = (22B, XXX)
	22B = (22C, 22C)
	22C = (22Z, 22Z)
	22Z = (22B, 22B)
	XXX = (XXX, XXX)
`

const PUZZLE_INPUT = await readInput('day08-input.txt')

test('solution 1', () => {
	expect(day08.solvePuzzle1(SAMPLE_INPUT_1)).toBe(2)
	expect(day08.solvePuzzle1(SAMPLE_INPUT_2)).toBe(6)
	expect(day08.solvePuzzle1(PUZZLE_INPUT)).toBe(18727)
})

test('solution 2', () => {
	expect(day08.solvePuzzle2(SAMPLE_INPUT_3)).toBe(6)
	expect(day08.solvePuzzle2(PUZZLE_INPUT)).toBe(18024643846273)
})
