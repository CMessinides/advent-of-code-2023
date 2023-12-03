import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day02 from './day02'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
	Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
	Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
	Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
	Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

const PUZZLE_INPUT = await readInput('day02-input.txt')

test('solution 1', () => {
	expect(day02.solvePuzzle1(SAMPLE_INPUT)).toBe(8)
	expect(day02.solvePuzzle1(PUZZLE_INPUT)).toBe(2685)
})

test('solution 2', () => {
	expect(day02.solvePuzzle2(SAMPLE_INPUT)).toBe(2286)
	expect(day02.solvePuzzle2(PUZZLE_INPUT)).toBe(83707)
})
