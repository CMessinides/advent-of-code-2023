import { splitLines } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const lines = splitLines(input)
	const cards = lines.map(parseCard)
	return cards.reduce((total, card) => total + score(card), 0)
}

export function solvePuzzle2(input: string): number {
	const lines = splitLines(input)
	const cards = lines.map(parseCard)

	let stack = cards.map((_, i) => i)
	let count = stack.length
	let cache: number[][] = cards.map(winCards)

	while (stack.length) {
		const i = stack.pop()!
		const wonCards = cache[i]
		count += wonCards.length
		stack.push(...wonCards)
	}

	return count
}

type Card = {
	winning: Set<number>,
	actual: Set<number>,
}

function score(card: Card): number {
	const hits = intersection(card.winning, card.actual)

	if (hits.size === 0) {
		return 0
	}

	return Math.pow(2, hits.size - 1)
}

function winCards(card: Card, index: number): number[] {
	const hits = intersection(card.winning, card.actual)
	return new Array(hits.size).fill(index + 1).map((x, i) => x + i)
}

function intersection<T = any>(a: Set<T>, b: Set<T>): Set<T> {
	const result = new Set<T>()

	const [larger, smaller] = a.size > b.size ? [a, b] : [b, a];

	for (const value of smaller) {
		if (larger.has(value)) {
			result.add(value)
		}
	}

	return result
}

function parseCard(line: string): Card {
	const body = line.split(":")[1]
	const [winning, actual] = body.split(" | ")

	const toInts = (text: string) => text
		.trim()
		.split(/ {1,2}/)
		.map(part => parseInt(part))

	return {
		winning: new Set(toInts(winning)),
		actual: new Set(toInts(actual)),
	}
}
