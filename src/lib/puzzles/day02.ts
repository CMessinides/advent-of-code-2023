import { splitLines } from "../utils/text";

export function solvePuzzle1(input: string): number {
	const constraint = new Bag({ red: 12, green: 13, blue: 14 })
	const games = parseGames(input)
	
	return games.reduce((sum, game) => {
		const requiredBag = calculateRequiredBag(game)
		return constraint.contains(requiredBag) ? sum + game.id : sum;
	}, 0)
}

export function solvePuzzle2(input: string): number {
	const games = parseGames(input)
	const requiredBags = games.map(calculateRequiredBag)
	return requiredBags.reduce((sum, bag) => sum + bag.power, 0)
}

type Game = {
	id: number;
	samples: Bag[];
}
type Color = 'red' | 'green' | 'blue';
type BagInit = Partial<Record<Color, number>>

class Bag {
	static empty() {
		return new Bag()
	}

	red: number;
	green: number;
	blue: number;

	constructor({
		red = 0,
		green = 0,
		blue = 0
	}: BagInit = {}) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	get power() {
		return this.red * this.green * this.blue;
	}

	contains(other: Bag) {
		return this.red >= other.red
			&& this.green >= other.green
			&& this.blue >= other.blue;
	}

	max(other: Bag) {
		return new Bag({
			red: Math.max(this.red, other.red),
			green: Math.max(this.green, other.green),
			blue: Math.max(this.blue, other.blue),
		})
	}
}

function calculateRequiredBag(game: Game): Bag {
	return game.samples.reduce((acc, bag) => acc.max(bag))
}

function parseGames(input: string): Game[] {
	return splitLines(input).map(parseLine)
}

function parseLine(line: string): Game {
	const [header, body] = line.split(': ')
	const id = parseInt(header.match(/Game (\d+)/)![1])
	const samples = body.split('; ').map(parseSample)

	return {
		id,
		samples
	}
}

function parseSample(text: string): Bag {
	const bag = Bag.empty()
	const counts = text.split(', ').map(parseCount)

	for (const [color, count] of counts) {
		bag[color] = count;
	}

	return bag; 
}

function parseCount(text: string): [color: Color, count: number] {
	const match = text.match(/(?<count>\d+) (?<color>red|green|blue)/)
	return [match!.groups!.color as Color, parseInt(match!.groups!.count)] 
}
