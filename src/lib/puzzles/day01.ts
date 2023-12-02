export function solvePuzzle1(input: string): number {
	return parse(input).reduce((total, entry) => total + Number(entry), 0)
}

function parse(input: string): CalibrationDocument {
	let line = 1;
	let entries: CalibrationDocument = [];
	
	const head = () => {
		if (line > entries.length) {
			entries.push(new CalibrationEntry(line));
		}

		return entries.at(-1)!;
	}

	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		
		if (isDigit(char)) {
			head().push(char)
		} else if (char === '\n') {
			line++;
		}
	}

	return entries;
}

function isDigit(char: string): boolean {
	return char >= '0' && char <= '9'
}

type CalibrationDocument = CalibrationEntry[]

class CalibrationEntry {
	readonly line: number;
	private digits: string[] = []

	constructor(line: number) {
		this.line = line;
	}

	push(digit: string): number {
		return this.digits.push(digit)
	}

	valueOf() {
		if (this.digits.length === 0) {
			throw new Error(`Invalid calibration entry: no digits found on line ${this.line}`)
		}

		const firstDigit = this.digits.at(0)
		const lastDigit = this.digits.at(-1)

		return parseInt(firstDigit + lastDigit)
	}
}
