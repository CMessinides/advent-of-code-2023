import { splitLines } from "../utils/text";

const DIGITS: ParseTable = createParseTable({
	"0": {},
	"1": {},
	"2": {},
	"3": {},
	"4": {},
	"5": {},
	"6": {},
	"7": {},
	"8": {},
	"9": {},
})

const DIGITS_AND_WORDS: ParseTable = DIGITS.concat(createParseTable({
	zero: { replacement: "0" },
	one: { replacement: "1" },
	two: { replacement: "2" },
	three: { replacement: "3" },
	four: { replacement: "4" },
	five: { replacement: "5" },
	six: { replacement: "6" },
	seven: { replacement: "7" },
	eight: { replacement: "8" },
	nine: { replacement: "9" },
}))

export function solvePuzzle1(input: string): number {
	const parser = createLineParser(DIGITS)
	return solve(parser, input);
}

export function solvePuzzle2(input: string): number {
	const parser = createLineParser(DIGITS_AND_WORDS)
	return solve(parser, input);
}

function solve(parse: Parser, input: string): number {
	return splitLines(input).map(parse).reduce((a,b) => a + b)
}

type ParseTable = ParseTableEntry[]
type ParseTableEntry = [pattern: string, replacement: string]
type Parser = (line: string) => number;

function createLineParser(table: ParseTable): Parser {
	return function(line) {
		const digits: string[] = []

		for (let i = 0; i < line.length; i++) {
			for (const [pattern, digit] of table) {
				if (line.substring(i, i + pattern.length) === pattern) {
					digits.push(digit);
					break;
				}
			}
			
		}

		if (digits.length === 0) {
			throw ParseError.NO_DIGITS_FOUND(line)
		}

		return parseInt(digits.at(0)! + digits.at(-1)!)
	}
}

class ParseError extends Error {
	static NO_DIGITS_FOUND(line: string) {
		return new ParseError(`Invalid line: no digits found`, line)	
	}

	constructor(message: string, line: string) {
		super(`${message}\n\n\tLine: "${line}"`);
	}
}

function createParseTable(spec: Record<string, { replacement?: string }>): ParseTable {
	return Object.entries(spec)
		.map(([pattern, { replacement = pattern }]) => [pattern, replacement])
}
