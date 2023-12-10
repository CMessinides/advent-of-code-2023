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
	/*
	  The winning speeds in these races have a symmetric distribution,
	  where the midpoint between 0 and the duration is always the optimal
	  speed. So, we can calculate the total number of winning speeds by
	  finding the midpoint, finding the minimum winning speed, and
	  doubling the difference between the two (roughly - see caveats below)
	*/
	const midpoint = Math.floor(race.duration / 2)

	for (let s = 1; s <= midpoint; s++) {
		let distance = calculateDistance(race.duration, s)

		if (distance > race.recordDistance) {
			/*
			  s is the minimum winning speed, so now the calculation:
			  
			  - (midpoint - s + 1) gives us the number of winning speeds
			    between the minimum speed and midpoint (inclusive)
			  - We double that value to give us the full count, _if_ the
			    total number of available speeds is even.
			  - In races where the total number of speeds is _odd_, we'll
			    have counted the midpoint twice. To account for this, we
			    subtract (race.duration % 2 ^ 1). race.duration % 2 is 1
			    if the duration is odd, and 0 if even. The bitwise xor
			    (^ 1) inverts that value, because an even duration implies
			    an odd number of speeds, and vice versa.
			*/
			return (midpoint - s + 1) * 2 - (race.duration % 2 ^ 1)
		}
	}

	return 0
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
