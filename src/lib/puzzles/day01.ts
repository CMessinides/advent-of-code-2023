import { identity } from "../utils/identity";
import { splitLines } from "../utils/text";

const ENGLISH_DIGITS = {
	zero: "0",
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
}

export function solvePuzzle1(input: string): number {
	const parser = createLineParser(/\d/g)
	return solve(parser, input);
}

export function solvePuzzle2(input: string): number {
	const pattern = new RegExp(`\\d|(${Object.keys(ENGLISH_DIGITS).join('|')})`, 'gi')
	const parser = createLineParser(pattern, createTransformer(ENGLISH_DIGITS))
	return solve(parser, input);
}

function solve(parse: Parser, input: string): number {
	return splitLines(input).map(parse).reduce((a,b) => a + b)
}

type CalibrationValue = number;
type Parser = (line: string) => CalibrationValue;
type Transformer = (match: string) => string;


function createLineParser(pattern: RegExp, transform: Transformer = identity): Parser {
	return function(line) {
		const digits: string[] = []

		for (const [match] of line.matchAll(pattern)) {
			digits.push(transform(match))	
		}

		if (digits.length === 0) {
			throw ParseError.NO_DIGITS_FOUND(line, pattern)
		}

		return parseInt(digits.at(0)! + digits.at(-1)!)
	}
}

class ParseError extends Error {
	static NO_DIGITS_FOUND(line: string, pattern: RegExp) {
		return new ParseError(`Invalid line: no digits found`, line, pattern)	
	}

	constructor(message: string, line: string, pattern: RegExp) {
		super(`${message}\n\n\tLine: "${line}"\n\tPattern: ${pattern}`);
	}
}

function createTransformer(spec: Record<string, string>): Transformer {
	return function(match) {
		if (typeof spec[match] !== "undefined") {
			return spec[match];
		}

		return match;
	}
}
