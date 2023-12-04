import type { Array2DReducer } from "../utils/array2d";
import { Array2D } from "../utils/array2d";
import { textToArray2D } from "../utils/text";

export function solvePuzzle1(input: string): number {
	const chars = textToArray2D(input)

	const adjacencies = Array2D.empty<boolean>(chars.width, chars.height)
	for (let i = 0; i < chars.length; i++) {
		const char = chars.at(i)!;

		if (char === '.' || isDigit(char)) {
			continue;
		}

		for (const n of chars.neighbors(i)) {
			adjacencies.set(n, true)
		}
	}

	const { partNumbers } = chars.reduce(findAdjacentPartNumbers(adjacencies))!
	return partNumbers.reduce((a, b) => a + b)
}

type SchematicDigit = { char: string, isAdjacent: boolean }

class SchematicState {
	partNumbers: number[]
	digits: SchematicDigit[]

	static empty() {
		return new SchematicState()
	}

	constructor(partNumbers: number[] = [], digits: SchematicDigit[] = []) {
		this.partNumbers = partNumbers
		this.digits = digits
	}

	concat(digit: SchematicDigit): SchematicState {
		return new SchematicState(
			this.partNumbers,
			this.digits.concat(digit),
		)
	}

	popDigits(): SchematicState {
		if (this.digits.some(d => d.isAdjacent)) {
			const partNumber = parseInt(this.digits.map(d => d.char).join(''))
			return new SchematicState(this.partNumbers.concat(partNumber))
		} else {
			return new SchematicState(this.partNumbers)
		}
	}
}

type SchematicReducer = Array2DReducer<string, SchematicState>

function findAdjacentPartNumbers(adjacencies: Array2D<boolean>): SchematicReducer {
	return function (state, char, i, chars) {
		if (!state) {
			state = SchematicState.empty()
		}

		const currentRow = chars.indexToCoords(i)[1]
		const prevRow = chars.indexToCoords(i - 1)[1]

		if (!isDigit(char) || currentRow !== prevRow) {
			state = state.popDigits()
		}

		if (isDigit(char)) {
			state = state.concat({ char, isAdjacent: adjacencies.at(i) ?? false })
		}

		return state
	}
}

function isDigit(char: string): boolean {
	return char >= '0' && char <= '9'
}
