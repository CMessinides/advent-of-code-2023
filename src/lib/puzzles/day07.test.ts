import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day07 from './day07'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	32T3K 765
	T55J5 684
	KK677 28
	KTJJT 220
	QQQJA 483
`

const PUZZLE_INPUT = await readInput('day07-input.txt')

test('solution 1', () => {
	expect(day07.solvePuzzle1(SAMPLE_INPUT)).toBe(6440)
	expect(day07.solvePuzzle1(PUZZLE_INPUT)).toBe(246795406)
})

test('solution 2', () => {
	expect(day07.solvePuzzle2(SAMPLE_INPUT)).toBe(5905)
	expect(day07.solvePuzzle2(PUZZLE_INPUT)).toBe(249356515)
})
