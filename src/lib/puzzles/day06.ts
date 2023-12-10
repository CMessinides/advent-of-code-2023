import { splitLines } from "../utils/text";

export function solvePuzzle1(input: string): number {
	const races = parse(input)
	return races.reduce((product, race) => product * countWinningSpeeds(race), 1)
}

type Race = {
	duration: number,
	recordDistance: number,
}

function countWinningSpeeds(race: Race): number {
	let count = 0;

	const midpoint = Math.floor(race.duration / 2)

	for (let s = 1; s <= midpoint; s++) {
		let distance = calculateDistance(race.duration, s)

		if (distance > race.recordDistance) {
			count++
		}
	}

	const total = (count * 2) - ((race.duration - 1) % 2)
	return total
}

function calculateDistance(duration: number, speed: number): number {
	return (duration - speed) * speed;
}

function parse(input: string): Race[] {
	const [durations, distances] = splitLines(input).map(parseLine)

	if (durations.length !== distances.length) {
		throw new Error('Invaid input: unequal number of durations and distances')
	}

	return durations.map((duration, i) => {
		return {
			duration,
			recordDistance: distances[i],
		}
	})
}

function parseLine(line: string): number[] {
	return line
		.split(":")[1]
		.trim()
		.split(/ +/)
		.map(part => parseInt(part))
}
