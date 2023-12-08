import { search, type BinarySearchTree } from "../utils/binary-search"
import { splitLines, splitParagraphs } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const [seeds, ciphers] = parse(input)

	const seedToLocation = decode(ciphers)

	return seeds.reduce((lowest, seed) => {
		const location = seedToLocation(seed)
		return Math.min(lowest, location)
	}, Number.POSITIVE_INFINITY)
}

type CipherRule = {
	start: number,
	end: number,
	offset: number,
}
type Cipher = BinarySearchTree<CipherRule>
type Decoder = (input: number) => number;

function decode(ciphers: Cipher[]): Decoder {
	return function (input) {
		return ciphers.reduce((value, cipher) => {
			const offset = search(compareRule, cipher, value)?.offset ?? 0
			return value + offset
		}, input)
	}
}

function compareRule(rule: CipherRule, input: number): -1 | 0 | 1 {
	if (input < rule.start) {
		return -1
	}

	if (input > rule.end) {
		return 1
	}

	return 0
}

function parse(input: string): [seeds: number[], ciphers: Cipher[]] {
	const [seedInput, ...cipherInputs] = splitParagraphs(input)

	return [
		parseSeeds(seedInput),
		cipherInputs.map(parseCipher),
	]
}

function parseSeeds(line: string): number[] {
	return line.split(":")[1].trim().split(" ").map(p => parseInt(p))
}

function parseCipher(input: string): Cipher {
	const lines = splitLines(input).slice(1)
	const rules = lines.map(line => parseCipherRule(line)).sort((a, b) => a.start - b.start)
	return rules
}

function parseCipherRule(line: string): CipherRule {
	const [dest, source, length] = line.split(" ").map(p => parseInt(p))
	const offset = dest - source
	const end = source + length - 1
	return {
		start: source,
		end,
		offset
	}
}
