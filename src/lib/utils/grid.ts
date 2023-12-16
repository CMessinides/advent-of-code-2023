import { Directions, type Direction, type Vector2D } from "./vector";

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

	find(predicate: (cell: GridCell<T>) => boolean): GridCell<T> | null {
		for (let i = 0; i < this.items.length; i++) {
			const cell = new GridCell(this, i)
			if (predicate(cell)) {
				return cell
			} 
		}

		return null
	}
}

export class GridCell<T> {
	grid: Grid<T>;
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

	*neighbors(directions: Iterable<Direction> = Directions.ALL): IterableIterator<[direction: Direction, cell: GridCell<T>]> {
		for (const dir of directions) {
			const [dx, dy] = dir
			const x = this.x + dx
			const y = this.y + dy
			if (this.grid.contains(x, y)) {
				yield [dir, this.grid.at(x, y)]
			}
		}
	}
}
