export type CompareFn<T> = (a: T, b: T) => number

export function sortBy<T>(...compareFns: CompareFn<T>[]): CompareFn<T> {
	return function (a, b) {
		for (const compare of compareFns) {
			const diff = compare(a, b)

			if (diff !== 0) {
				return diff
			}
		}

		return 0
	}
}

export function sortByProperty<T, P extends keyof T>(property: P, ...compareFns: CompareFn<T[P]>[]): CompareFn<T> {
	const innerCompare = sortBy(...compareFns)
	return function (a, b) {
		return innerCompare(a[property], b[property])
	}
}

