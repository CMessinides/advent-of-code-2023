export type Vector2D = [x: number, y: number]

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
} as const satisfies Record<string, DirectionIterable>;

export type DirectionIterable = Iterable<Direction>

export class Grid<T> {
	static empty<T = any>(width: number, height: number): Grid<T> {
		const items = new Array<T>(width * height)
		return new Grid(width, height, items)
	}

	width: number;
	height: number;
	items: T[];

	constructor(width: number, height: number, items: T[]) {
		if (items.length !== width * height) {
			throw new Error(`Invalid size for grid: items.length (${items.length}) must equal width (${width}) * height (${height}) (= ${width * height}).`)
		}

		this.width = width;
		this.height = height;
		this.items = items;
	}

	get length() {
		return this.items.length
	}

	at(x: number, y: number): GridCell<T>
	at(i: number): GridCell<T>
	at(...args: [i: number] | Vector2D): GridCell<T> {
		let i = args.length === 1 ? args[0] : this.index(...args)
		return new GridCell(this, i)
	}

	contains(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x < this.width && y < this.height
	}
	
	index(x: number, y: number): number {
		return this.width * y + x
	}
}

export class GridCell<T> {
	protected grid: Grid<T>;
	index: number;

	constructor(grid: Grid<T>, index: number) {
		this.grid = grid;
		this.index = index;
	}

	get x(): number {
		return this.index % this.grid.width
	}

	get y(): number {
		return Math.floor(this.index / this.grid.width)
	}

	get coords(): [x: number, y: number] {
		return [this.x, this.y]
	}

	get value(): T | undefined {
		return this.grid.items.at(this.index)
	}

	set value(v: T) {
		this.grid.items[this.index] = v
	}

	*neighbors(directions: DirectionIterable = Directions.ALL): IterableIterator<GridCell<T>> {
		for (const [dx, dy] of directions) {
			const x = this.x + dx
			const y = this.y + dy
			if (this.grid.contains(x, y)) {
				yield this.grid.at(x, y)
			}
		}
	}
}
