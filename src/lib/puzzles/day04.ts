import { splitLines } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const lines = splitLines(input)
	const cards = lines.map(parseCard)
	return cards.reduce((total, card) => total + score(card), 0)
}

export function solvePuzzle2(input: string): number {
	const lines = splitLines(input)
	const cards = lines.map(parseCard)
	const cardTable = new Map(cards.map(card => [card.id, card]))

	let scratchcards = [...cardTable.values()]

	for (let i = 0; i < scratchcards.length; i++) {
		const card = scratchcards[i]
		const hits = intersection(card.winning, card.actual)
		for (let h = 0; h < hits.size; h++) {
			const wonCard = cardTable.get(card.id + h + 1)
			if (wonCard) {
				scratchcards.push(wonCard)
			}
		}
	}

	return scratchcards.length
}

type Card = {
	id: number,
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
	const [_, id, winning, actual] = line.trim().match(/^Card +(\d+): (.+) \| (.+)$/)!

	const toInts = (text: string) => text
		.trim()
		.split(/ {1,2}/)
		.map(part => parseInt(part))

	return {
		id: parseInt(id),
		winning: new Set(toInts(winning)),
		actual: new Set(toInts(actual)),
	}
}
