import dedent from 'dedent'

export type Coords = [x: number, y: number]

export type Array2DReducer<T = any, U = T> = (acc: U | undefined, value: T, index: number, array: Array2D<T>) => U | undefined

export class Array2D<T> {
	static empty<T = any>(width: number, height: number): Array2D<T> {
		const items = new Array<T>(width * height)
		return new Array2D(width, height, items)
	}

	width: number;
	height: number;
	items: T[];

	constructor(width: number, height: number, items: T[]) {
		if (items.length !== width * height) {
			throw new Error(dedent`
				Invalid size for 2D array: items.length must equal width * height.

					width: ${width}
					height: ${height}
					items.length: ${items.length}
			`)
		}

		this.width = width;
		this.height = height;
		this.items = items;
	}

	get length() {
		return this.items.length
	}

	at(i: number): T | undefined {
		return this.items.at(i)
	}

	set(i: number, value: T): this {
		this.items[i] = value;
		return this;
	}

	map<U>(fn: (value: T, index: number, array: this) => U): Array2D<U> {
		return new Array2D<U>(
			this.width,
			this.height,
			this.items.map((value, i) => fn(value, i, this))
		)
	}

	reduce<U = T>(reducer: Array2DReducer<T, U>, init?: U): U | undefined {
		return this.items.reduce((acc, value, i) => reducer(acc, value, i, this), init)
	}

	coordsToIndex([x, y]: Coords): number {
		return y * this.width + x
	}

	indexToCoords(i: number): Coords {
		const x = i % this.width
		const y = (i - x) / this.width;
		return [x, y]
	}

	contains([x, y]: Coords): boolean {
		return x >= 0 && y >= 0 && x < this.width && y < this.height
	}

	*rows(): IterableIterator<T[]> {
		for (let r = 0; r < this.height; r++) {
			const offset = r * this.width
			yield this.items.slice(offset, offset + this.width) 
		}
	}

	*neighbors(i: number): IterableIterator<number> {
		const [x, y] = this.indexToCoords(i)
	
		const vectors = [
			[-1, -1],
			[ 0, -1],
			[ 1, -1],
			[-1,  0],
			[ 1,  0],
			[-1,  1],
			[ 0,  1],
			[ 1,  1],
		]

		for (const [dx, dy] of vectors) {
			const adj: Coords = [x + dx, y + dy]
			if (this.contains(adj)) {
				yield this.coordsToIndex(adj)
			}
		}
	}
}
