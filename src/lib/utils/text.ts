import { Array2D } from "./array2d";

/**
 * Split `text` into lines. Blank lines are removed.
 */
export function splitLines(text: string): string[] {
	return text.split(/\r?\n/).filter(line => line !== '')
}


export function textToArray2D(text: string): Array2D<string> {
	const lines = splitLines(text)
	const rows = lines.length
	const chars = lines.flatMap(line => [...line])
	const columns = chars.length / rows

	return new Array2D(columns, rows, chars)
}
