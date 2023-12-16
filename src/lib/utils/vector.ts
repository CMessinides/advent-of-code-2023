export type Vector2D = [x: number, y: number]

export function equals(a: Vector2D, b: Vector2D): boolean {
	return a[0] === b[0] && a[1] === b[1]
}

export function invert(v: Vector2D): Vector2D {
	return [v[0] * -1, v[1] * -1]
}

export const Direction = {
	N:  [ 0, -1],
	NE: [ 1, -1],
	E:  [ 1,  0],
	SE: [ 1,  1],
	S:  [ 0,  1],
	SW: [-1,  1],
	W:  [-1,  0],
	NW: [-1, -1],
} as const satisfies Record<string, Vector2D>;

export type Direction = typeof Direction[keyof typeof Direction]

export const Directions = {
	CARDINAL: new Set([
		Direction.N,
		Direction.E,
		Direction.S,
		Direction.W
	]),
	ORTHOGONAL: new Set([
		Direction.NE,
		Direction.SE,
		Direction.SW,
		Direction.NW,
	]),
	ALL: new Set([
		Direction.N,
		Direction.NE,
		Direction.E,
		Direction.SE,
		Direction.S,
		Direction.SW,
		Direction.W,
		Direction.NW,
	]),
} as const satisfies Record<string, Set<Direction>>;
