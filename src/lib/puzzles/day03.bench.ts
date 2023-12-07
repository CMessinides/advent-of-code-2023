import { bench, describe } from 'vitest'
import * as day03 from './day03'
import { readResource } from '../utils/resources'

const PUZZLE_INPUT = await readResource('day03-input.txt')

describe('solution 1', () => {
	bench('current', () => {
		day03.solvePuzzle1(PUZZLE_INPUT)
	})

	bench('next', () => {
		day03.__v2__solvePuzzle1(PUZZLE_INPUT)
	})
})

describe('solution 2', () => {
	bench('current', () => {
		day03.solvePuzzle2(PUZZLE_INPUT)
	})

	bench('next', () => {
		day03.__v2__solvePuzzle2(PUZZLE_INPUT)
	})
})
