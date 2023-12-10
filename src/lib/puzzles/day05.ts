import { search, type BinarySearchTree, type Comparator } from "../utils/binary-search"
import { splitLines, splitParagraphs } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const [head, ...body] = splitParagraphs(input)
	const seeds = parseSeeds(head)
	const ciphers = body.map(parseCipher)

	const seedToLocation = decodePoint(ciphers)

	return seeds.reduce((lowest, seed) => {
		const location = seedToLocation(seed)
		return Math.min(lowest, location)
	}, Number.MAX_SAFE_INTEGER)
}

export function solvePuzzle2(input: string): number {
	const [head, ...body] = splitParagraphs(input)
	const seedRanges = parseSeedRanges(head).sort(byRangeStart)
	const ciphers = body.map(parseCipher)

	const locationRanges = decodeRanges(ciphers)(seedRanges)

	return locationRanges[0].start
}

type Range = {
	start: number,
	end: number
}

type CipherRule = {
	range: Range,
	offset: number,
}
type Cipher = BinarySearchTree<CipherRule>
type PointDecoder = (input: number) => number;
type RangeDecoder = (ranges: Range[]) => Range[];

function decodePoint(ciphers: Cipher[]): PointDecoder {
	return function (input) {
		return ciphers.reduce((value, cipher) => {
			const offset = search(ruleContainsPoint, cipher, value)?.offset ?? 0
			return value + offset
		}, input)
	}
}

function decodeRanges(ciphers: Cipher[]): RangeDecoder {
	return function (ranges) {
		return ciphers.reduce((ranges, cipher) => {
			return translate(cipher, ranges)
		}, ranges)
	}
}

const ruleContainsPoint: Comparator<CipherRule, number> = (rule, input) => {
	if (input < rule.range.start) {
		return -1
	}

	if (input > rule.range.end) {
		return 1
	}

	return 0
}

function translate(cipher: Cipher, ranges: Range[]): Range[] {
	if (cipher.length === 0) {
		return ranges
	}

	const translated: Range[] = []
	const ruleQueue = [...cipher]

	for (const range of ranges) {
		const { start, end } = range
	
		const intersecting: CipherRule[] = []
		for (let i = 0; i < ruleQueue.length; i++) {
			const rule = ruleQueue[i];
			if (rangesIntersect(range, rule.range)) {
				intersecting.push(rule)
			}

			if (rule.range.start > end) {
				break
			}
		}

		for (const rule of intersecting) {
			translated.push({
				start: Math.max(rule.range.start, start) + rule.offset,
				end: Math.min(rule.range.end, end) + rule.offset,
			})
			
			if (rule.range.end <= end) {
				ruleQueue.shift()
			}
		}
	}

	return translated.sort(byRangeStart)
}

function rangesIntersect(a: Range, b: Range): boolean {
	return (a.start >= b.start && a.start <= b.end || a.end <= b.end && a.end >= b.start)
}

function byRangeStart(a: Range, b: Range): number {
	return a.start - b.start
}

function parseSeeds(line: string): number[] {
	return line.split(":")[1].trim().split(" ").map(p => parseInt(p))
}

function parseSeedRanges(line: string): Range[] {
	return line.split(":")[1].trim().split(" ").reduce((ranges, current, i, parts) => {
		if (i % 2) {
			const start = parseInt(parts[i - 1])
			const length = parseInt(current)
			ranges.push({
				start,
				end: start + length - 1,
			})
		}

		return ranges
	}, [] as Range[])
}

function parseCipher(input: string): Cipher {
	const lines = splitLines(input).slice(1)
	const rules = lines.map(line => parseCipherRule(line)).sort((a, b) => byRangeStart(a.range, b.range))
	return normalize(rules)
}

function parseCipherRule(line: string): CipherRule {
	const [dest, source, length] = line.split(" ").map(p => parseInt(p))
	const offset = dest - source
	const end = source + length - 1
	return {
		range: {
			start: source,
			end,
		},
		offset
	}
}

function normalize(cipher: Cipher): Cipher {
	if (cipher.length === 0) {
		return []
	}

	let normalized: Cipher = []
	let next = 0

	for (const rule of cipher) {
		if (rule.range.start > next) {
			normalized.push({ 
				range: {
					start: next,
					end: rule.range.start - 1,
				},
				offset: 0
			})
		}

		normalized.push(rule)
		next = rule.range.end + 1
	}

	const last = normalized.at(-1)!
	if (last.range.end < Number.MAX_SAFE_INTEGER) {
		normalized.push({ 
			range: {
				start: last.range.end + 1,
				end: Number.MAX_SAFE_INTEGER,
			},
			offset: 0
		})
	}

	return normalized
}
