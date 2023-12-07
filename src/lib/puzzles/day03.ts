import { Array2D } from "../utils/array2d";
import { textToArray2D } from "../utils/text";

export function solvePuzzle1(input: string): number {
	const schematic = textToArray2D(input)
	const engine = createEngine(schematic)
	const adjacentPartNumbers = new Set(engine.adjacencies.map(([_sym, num]) => num))
	return [...adjacentPartNumbers].reduce((sum, num) => sum + num.value, 0)
}

export function __v2__solvePuzzle1(input: string): number {
	const schematic = textToArray2D(input)
	const engine = __v2__createEngine(schematic)
	const adjacentPartNumbers = new Set(engine.adjacencies.map(([_sym, num]) => num))
	return [...adjacentPartNumbers].reduce((sum, num) => sum + num.value, 0)
}

export function solvePuzzle2(input: string): number {
	const schematic = textToArray2D(input)
	const engine = createEngine(schematic)
	const gearAdjacencies = engine.adjacencies.filter(([sym]) => sym.symbol === "*")
	const valuesByGear = gearAdjacencies.reduce((map, [sym, num]) => {
		if (!map.has(sym)) {
			map.set(sym, [])
		}

		map.get(sym)!.push(num.value)

		return map
	}, new Map<EngineSymbol, number[]>())

	return [...valuesByGear.values()]
			.filter((values) => values.length === 2)
			.reduce((sum, [left, right]) => sum + left * right, 0)
}

export function __v2__solvePuzzle2(input: string): number {
	const schematic = textToArray2D(input)
	const engine = __v2__createEngine(schematic)
	const gearAdjacencies = engine.adjacencies.filter(([sym]) => sym.symbol === "*")
	const valuesByGear = gearAdjacencies.reduce((map, [sym, num]) => {
		if (!map.has(sym)) {
			map.set(sym, [])
		}

		map.get(sym)!.push(num.value)

		return map
	}, new Map<EngineSymbol, number[]>())

	return [...valuesByGear.values()]
			.filter((values) => values.length === 2)
			.reduce((sum, [left, right]) => sum + left * right, 0)
}

type Schematic = Array2D<string>

type PartNumber = {
	value: number,
	index: number,
	length: number,
}

type EngineSymbol = {
	symbol: string,
	index: number,
}

type Engine = {
	partNumbers: PartNumber[],
	symbols: EngineSymbol[],
	adjacencies: [EngineSymbol, PartNumber][],
}

function __v2__createEngine(schematic: Schematic): Engine {
	const engine: Engine = {
		...findAllParts(schematic),
		adjacencies: []
	}

	const partNumberIndices = Array2D.empty<number>(schematic.width, schematic.height)
	engine.partNumbers.forEach((num, pni) => {
		for (let i = num.index; i < num.index + num.length; i++) {
			partNumberIndices.set(i, pni)
		}
	})

	for (const sym of engine.symbols) {
		const adjNumbers = new Set<PartNumber>()

		for (const neighbor of schematic.neighbors(sym.index)) {
			const pni = partNumberIndices.at(neighbor)
			if (typeof pni !== "undefined") {
				adjNumbers.add(engine.partNumbers[pni])
			}
		}

		for (const num of adjNumbers) {
			engine.adjacencies.push([sym, num])
		}
	}

	return engine
}

function createEngine(schematic: Schematic): Engine {
	const engine: Engine = {
		...findAllParts(schematic),
		adjacencies: []
	}

	for (const sym of engine.symbols) {
		const neighbors = [...schematic.neighbors(sym.index)]

		for (const num of engine.partNumbers) {
			const start = num.index
			const end = start + num.length

			if (neighbors.some(n => n >= start && n < end)) {
				engine.adjacencies.push([sym, num])
			}
		}
	}

	return engine
}

type EngineParts = Pick<Engine, "partNumbers" | "symbols">

function findAllParts(schematic: Schematic): EngineParts {
	const parts: EngineParts = {
		partNumbers: [],
		symbols: []
	}

	let i = 0

	const advance = () => { i++ }
	const current = () => schematic.at(i)

	const isSameRow = (a: number, b: number) => {
		const y1 = schematic.indexToCoords(a)[1]
		const y2 = schematic.indexToCoords(b)[1]

		return y1 === y2
	}

	while (i < schematic.length) {
		const c = current()!

		if (c === '.') {
			advance()
			continue
		}

		if (isDigit(c)) {
			const start = i

			while (isDigit(current()!) && isSameRow(start, i)) {
				advance()
			}

			const word = schematic.items.slice(start, i).join('')
			parts.partNumbers.push({
				value: parseInt(word),
				index: start,
				length: word.length,
			})

			continue
		}

		parts.symbols.push({
			symbol: c,
			index: i,
		})
		advance()
	}

	return parts
}

function isDigit(char: string): boolean {
	return char >= '0' && char <= '9'
}
