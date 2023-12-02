import fs from "node:fs/promises"
import path from "node:path"
import url from "node:url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR = path.resolve(__dirname, '../../../input')

export function readInput(filename: string): Promise<string> {
	return fs.readFile(path.join(INPUT_DIR, filename), 'utf-8')
}
