import dedent from 'dedent'
import { expect, test } from 'vitest'
import * as day05 from './day05'
import { readInput } from '../utils/inputs'

const SAMPLE_INPUT = dedent`
	seeds: 79 14 55 13

	seed-to-soil map:
	50 98 2
	52 50 48

	soil-to-fertilizer map:
	0 15 37
	37 52 2
	39 0 15

	fertilizer-to-water map:
	49 53 8
	0 11 42
	42 0 7
	57 7 4

	water-to-light map:
	88 18 7
	18 25 70

	light-to-temperature map:
	45 77 23
	81 45 19
	68 64 13

	temperature-to-humidity map:
	0 69 1
	1 0 69

	humidity-to-location map:
	60 56 37
	56 93 4
`

const PUZZLE_INPUT = await readInput('day05-input.txt')

test('solution 1', () => {
	expect(day05.solvePuzzle1(SAMPLE_INPUT)).toBe(35)
	expect(day05.solvePuzzle1(PUZZLE_INPUT)).toBe(26273516)
})

test('solution 2', () => {
	expect(day05.solvePuzzle2(SAMPLE_INPUT)).toBe(46)
	expect(day05.solvePuzzle2(PUZZLE_INPUT)).toBe(-1)
})
