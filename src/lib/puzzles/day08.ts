import { splitLines, splitParagraphs } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const map = parse(input)
	return findPath(map, "AAA", "ZZZ").length
}

type Direction = "L" | "R"

type DesertMapNode = [left: string, right: string]

type DesertMap = {
	directions: Direction[],
	graph: Map<string, DesertMapNode>
}

function findPath(map: DesertMap, from: string, to: string): string[] {
	const steps: string[] = []
	let current = from

	while (current !== to) {
		current = stepOnce(map, current, steps.length)
		steps.push(current)
	}

	return steps
}

function stepOnce(map: DesertMap, current: string, step: number): string {
	const direction = map.directions[step % map.directions.length]
	const [left, right] = map.graph.get(current)!
	return direction === 'L' ? left : right;
}

function parse(input: string): DesertMap {
	const [header, body] = splitParagraphs(input)

	return {
		directions: [...header] as Direction[],
		graph: parseNodes(body),
	}
}

function parseNodes(input: string): Map<string, DesertMapNode> {
	const graph = new Map<string, DesertMapNode>

	for (const line of splitLines(input)) {
		const [_, id, left, right] = line.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/)!
		graph.set(id, [left, right])
	}

	return graph
}
