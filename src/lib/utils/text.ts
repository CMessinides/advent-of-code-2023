import { Array2D } from "./array2d";
import { Grid } from "./grid";

/**
 * Split `text` into lines. Trailing newlines are removed.
 */
export function splitLines(text: string): string[] {
	return text.trim().split(/\r?\n/)
}

export function splitParagraphs(text: string): string[] {
	return text.trim().split(/\n{2}/)
}

export function textToArray2D(text: string): Array2D<string> {
	const lines = splitLines(text)
	const rows = lines.length
	const chars = lines.flatMap(line => [...line])
	const columns = chars.length / rows

	return new Array2D(columns, rows, chars)
}

export function textToGrid(text: string): Grid<string> {
	const lines = splitLines(text)
	const height = lines.length
	const chars = lines.flatMap(line => [...line])
	const width = chars.length / height

	return new Grid(width, height, chars)
}
