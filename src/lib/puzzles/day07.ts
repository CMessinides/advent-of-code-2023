import { sortByProperty } from "../utils/sort"
import { splitLines } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const handsWithBids = parse(input)
	const sorted = handsWithBids.sort(sortByProperty('hand', compareHandType, compareCardwise))
	return sorted.reduce((sum, { bid }, i, list) => {
		const rank = list.length - i
		return sum + bid * rank
	}, 0)
}

type HandWithBid = {
	hand: Hand,
	bid: number,
}

type Hand = {
	type: HandType,
	cards: string,
}

enum HandType {
	HIGH_CARD,
	ONE_PAIR,
	TWO_PAIR,
	THREE_OF_A_KIND,
	FULL_HOUSE,
	FOUR_OF_A_KIND,
	FIVE_OF_A_KIND,
}

const Cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const
const CardStrengths = new Map<string, number>(Cards.map((card, i) => [card, i]))

function compareHandType(a: Hand, b: Hand): number {
	return b.type - a.type
}

function compareCardwise(a: Hand, b: Hand): number {
	for (let i = 0; i < 5; i++) {
		const cardA = a.cards[i]
		const cardB = b.cards[i]

		const diff = CardStrengths.get(cardB)! - CardStrengths.get(cardA)!

		if (diff !== 0) {
			return diff
		}
	}

	return 0
}

function parse(input: string): HandWithBid[] {
	return splitLines(input).map(parseLine)
}

function parseLine(line: string): HandWithBid {
	const [handPart, bidPart] = line.split(" ").map(part => part.trim())

	return {
		hand: parseHand(handPart),
		bid: parseInt(bidPart),
	}
}

function parseHand(cards: string): Hand {
	return {
		cards,
		type: parseHandType(cards),
	}
}

function parseHandType(cards: string): HandType {
	const counts: Record<string, number> = {}

	for (const card of cards) {
		const count = counts[card] ?? 0
		counts[card] = count + 1
	}

	const countPattern = Object.values(counts).sort().join(',')
	switch (countPattern) {
		case '5':
			return HandType.FIVE_OF_A_KIND
		case '1,4':
			return HandType.FOUR_OF_A_KIND
		case '2,3':
			return HandType.FULL_HOUSE
		case '1,1,3':
			return HandType.THREE_OF_A_KIND
		case '1,2,2':
			return HandType.TWO_PAIR
		case '1,1,1,2':
			return HandType.ONE_PAIR
		default:
			return HandType.HIGH_CARD
	}
}
