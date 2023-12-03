/**
 * Split `text` into lines. Blank lines are removed.
 */
export function splitLines(text: string): string[] {
	return text.split(/\r?\n/).filter(line => line !== '')
}
