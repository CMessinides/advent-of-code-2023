/**
 * Represents a binary search tree as a sorted array of nodes of type N
 */
export type BinarySearchTree<N> = N[]

/**
 * A comparator takes a node and a search value and returns:
 *
 * - -1 if the search value is less than the node
 * -  0 if the search value is equal to the node
 * -  1 if the search value is greater than the node
 */
export type Comparator<N, S = N> = (node: N, search: S) => -1 | 0 | 1

export function search<N, S = N>(compare: Comparator<N, S>, tree: BinarySearchTree<N>, input: S): N | null {
		if (tree.length === 0) {
			return null
		}

		const midpoint = Math.floor(tree.length / 2)
		const root = tree[midpoint]

		switch (compare(root, input)) {
			case -1:
				return search(compare, tree.slice(0, midpoint), input)
			case 1:
				return search(compare, tree.slice(midpoint + 1), input)	
			default:
				return root
		}
}
