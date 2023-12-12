import { splitLines } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const histories = parse(input)
	return histories.map(inferNextValue).reduce((a, b) => a + b)
}

export function solvePuzzle2(input: string): number {
	const histories = parse(input)
	return histories.map(inferPreviousValue).reduce((a, b) => a + b)
}

function inferNextValue(history: number[]): number {
	if (history.every(h => h === 0)) {
		return 0
	}

	const differences = history.reduce(aggregateDifferences, [] as number[])
	return history.at(-1)! + inferNextValue(differences)
}

function inferPreviousValue(history: number[]): number {
	if (history.every(h => h === 0)) {
		return 0
	}

	const differences = history.reduce(aggregateDifferences, [] as number[])
	return history.at(0)! - inferPreviousValue(differences)
}

function aggregateDifferences(diffs: number[], n: number, i: number, array: number[]) {
	if (i === 0) {
		return diffs
	}

	return [...diffs, n - array[i - 1]]
}

function parse(input: string): number[][] {
	const lines = splitLines(input)

	return lines.map(line => line.split(" ").map(part => parseInt(part)))
}
