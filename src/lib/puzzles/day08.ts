import { lcm } from "../utils/integers"
import { splitLines, splitParagraphs } from "../utils/text"

export function solvePuzzle1(input: string): number {
	const map = parse(input)
	return countSteps(map, "AAA", "ZZZ")
}

export function solvePuzzle2(input: string): number {
	const map = parse(input)
	const startNodes = new Set([...map.graph.keys()].filter(id => id.endsWith('A')))
	return countStepsMany(map, startNodes, (node) => node.endsWith('Z'))
}

type Direction = "L" | "R"

type DesertMapNode = [left: string, right: string]

type DesertMap = {
	directions: Direction[],
	graph: Map<string, DesertMapNode>
}

function countSteps(map: DesertMap, start: string, goal: string | ((node: string) => boolean)): number {
	const predicate = typeof goal === "function" ? goal : (node: string) => node === goal

	let step = 0
	let current = start

	while (!predicate(current)) {
		current = stepOnce(map, current, step++)
	}

	return step
}

function countStepsMany(map: DesertMap, start: Set<string>, goal: Set<string> | ((node: string) => boolean)): number {
	const predicate = typeof goal === "function" ? goal : (node: string) => goal.has(node)
	const stepCounts = [...start].map(node => countSteps(map, node, predicate))

	return stepCounts.sort().reduceRight(lcm)
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
		const [_, id, left, right] = line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/)!
		graph.set(id, [left, right])
	}

	return graph
}
