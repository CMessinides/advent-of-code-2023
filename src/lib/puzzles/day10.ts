import { GridCell } from "../utils/grid";
import { textToGrid } from "../utils/text";
import { Direction, Directions, equals as vectorEquals, invert as vectorInvert } from "../utils/vector";

export function solvePuzzle1(input: string): number {
	const grid = textToGrid(input)
	const start = grid.find(cell => cell.value === 'S')!
	
	return digPipeCircuit(start).depth
}

type PipeChar = '|' | '-' | 'L' | 'J' | '7' | 'F'
type PipeSpec = [conn1: Direction, conn2: Direction]
const Pipes = new Map<PipeChar, PipeSpec>([
	['|', [Direction.N, Direction.S]],
	['-', [Direction.E, Direction.W]],
	['L', [Direction.N, Direction.E]],
	['J', [Direction.N, Direction.W]],
	['7', [Direction.S, Direction.W]],
	['F', [Direction.S, Direction.E]],
])

function isPipe(char: unknown): char is PipeChar {
	return Pipes.has(char as PipeChar)
}

function followPipeGoing(dir: Direction, char: PipeChar): Direction {
	const [conn1, conn2] = Pipes.get(char)!

	if (vectorEquals(dir, vectorInvert(conn1))) {
		return conn2
	} else if (vectorEquals(dir, vectorInvert(conn2))) {
		return conn1
	} else {
		throw new Error(`Pipe "${char}" cannot be followed going "${printDirection(dir)}"`)
	}
}

function pipeOpensToward(dir: Direction, char: PipeChar): boolean {
	const [conn1, conn2] = Pipes.get(char)!
	const inverted = vectorInvert(dir)
	return vectorEquals(conn1, inverted) || vectorEquals(conn2, inverted)
}

type DiggerState = {
	direction: Direction,
	cell: GridCell<string>,
}

type DigResult = {
	depth: number
}

function digPipeCircuit(start: GridCell<string>): DigResult {
	let depth = 0;
	let diggers: DiggerState[] = [...start.neighbors(Directions.CARDINAL)]
		.filter(([direction, cell]) => {
			return isPipe(cell.value) && pipeOpensToward(direction, cell.value)
		})
		.map(([direction, cell]) => ({
			direction,
			cell,
		}))

	while (diggers.length) {
		depth++
		diggers = diggers.reduce((keep, digger) => {
			const step = advance(digger)
			
			if (!step.done) {
				keep.push(step.next)
			}

			return keep
		}, [] as DiggerState[])
	}

	return { depth }
}

type DiggerStep = {
	done: true,
} | {
	done: false,
	next: DiggerState
}

function advance(digger: DiggerState): DiggerStep {
	const { cell, direction } = digger
	const { grid } = cell

	if (!isPipe(cell.value)) {
		throw new Error(`Invalid digger state: current position (${cell.x}, ${cell.y}) is not a pipe (actual: "${cell.value}")`)
	}

	const nextDirection = followPipeGoing(direction, cell.value)

	const x = cell.x + nextDirection[0]
	const y = cell.y + nextDirection[1]

	if (!grid.contains(x, y)) {
		return { done: true }
	}

	const nextCell = grid.at(x, y)
	if (!isPipe(nextCell.value) || !pipeOpensToward(nextDirection, nextCell.value)) {
		return { done: true }
	}

	cell.value = '.'
	return {
		done: false,
		next: {
			direction: nextDirection,
			cell: nextCell,
		}
	}
}

function printDirection(d: Direction): string {
	if (vectorEquals(d, Direction.N)) return "N"
	if (vectorEquals(d, Direction.S)) return "S"
	if (vectorEquals(d, Direction.E)) return "E"
	if (vectorEquals(d, Direction.W)) return "W"

	return "?"
}
