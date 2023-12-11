import { sortByProperty, type CompareFn } from "../utils/sort"
import { splitLines } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const rules: GameRules = {
		cards: '23456789TJQKA',
		wildCard: null,
	}

	return scoreGame(input, rules)
}

export function solvePuzzle2(input: string): number {
	const rules: GameRules = {
		cards: 'J23456789TQKA',
		wildCard: 'J',
	}

	return scoreGame(input, rules)
}

export function scoreGame(input: string, rules: GameRules): number {
	const handsWithBids = parse(input, rules)
	const sorted = handsWithBids.sort(
		sortByProperty('hand',
			compareHandType,
			compareCardwiseWith(rules)
		)
	)

	return sorted.reduce((sum, { bid }, i, list) => {
		const rank = list.length - i
		return sum + bid * rank
	}, 0)
}

type GameRules = {
	cards: string,
	wildCard: string | null
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

function compareHandType(a: Hand, b: Hand): number {
	return b.type - a.type
}

function compareCardwiseWith(rules: GameRules): CompareFn<Hand> {
	const cardStrength = new Map([...rules.cards].map((card, i) => [card, i]))

	return function (a, b) {
		for (let i = 0; i < 5; i++) {
			const cardA = a.cards[i]
			const cardB = b.cards[i]

			const diff = cardStrength.get(cardB)! - cardStrength.get(cardA)!

		if (diff !== 0) {
				return diff
			}
		}

		return 0
	}
}

function promote(current: HandType): HandType {
	switch (current) {
		case HandType.FOUR_OF_A_KIND:
			return HandType.FIVE_OF_A_KIND
		case HandType.THREE_OF_A_KIND:
			return HandType.FOUR_OF_A_KIND
		case HandType.TWO_PAIR:
			return HandType.FULL_HOUSE
		case HandType.ONE_PAIR:
			return HandType.THREE_OF_A_KIND
		case HandType.HIGH_CARD:
			return HandType.ONE_PAIR
		default:
			return current
	}
}

function parse(input: string, rules: GameRules): HandWithBid[] {
	const parseHand = parseHandWith(rules)

	return splitLines(input).map((line) => {
		const [handPart, bidPart] = line.split(" ").map(part => part.trim())

		return {
			hand: parseHand(handPart),
			bid: parseInt(bidPart),
		}
	})
}

type HandParser = (cards: string) => Hand

function parseHandWith(rules: GameRules): HandParser {
	return rules.wildCard ? parseHandWithWildCard(rules.wildCard) : parseHandSimple
}

function parseHandWithWildCard(wildCard: string): HandParser {
	return function (cards) {
		let nonWildCards = '';
		let wildCardCount = 0;

		for (const card of cards) {
			if (card === wildCard) {
				wildCardCount++
			} else {
				nonWildCards += card
			}
		}

		let handType = parseHandType(nonWildCards)
		while (wildCardCount > 0) {
			handType = promote(handType)
			wildCardCount--
		}

		return {
			cards,
			type: handType,
		}
	}
}

function parseHandSimple(cards: string): Hand {
	return {
		cards,
		type: parseHandType(cards),
	}
}

const HandPatterns = new Map<HandType, string>([
	[HandType.FIVE_OF_A_KIND, '#5'],
	[HandType.FOUR_OF_A_KIND, '#4'],
	[HandType.FULL_HOUSE, '#3#2'],
	[HandType.THREE_OF_A_KIND, '#3'],
	[HandType.TWO_PAIR, '#2#2'],
	[HandType.ONE_PAIR, '#2'],
])

function parseHandType(cards: string): HandType {
	const counts: Record<string, number> = {}

	for (const card of cards) {
		const count = counts[card] ?? 0
		counts[card] = count + 1
	}

	const handPattern = Object.values(counts).sort().reduceRight(
		(pattern, count) => pattern + '#' + count,
		'',
	)

	for (const [type, pattern] of HandPatterns) {
		if (handPattern.startsWith(pattern)) {
			return type
		}	
	}

	return HandType.HIGH_CARD
}
