import chalk from "chalk";
import { performance } from "perf_hooks";
import { log, logSolution } from "../../../util/log";
import * as test from "../../../util/test";
import { normalizeTestCases } from "../../../util/test";
import * as util from "../../../util/util";

const YEAR = 2023;
const DAY = 1;

// solution path: /Users/oskar/Documents/coding/advent-of-code/years/2023/01/index.ts
// data path    : /Users/oskar/Documents/coding/advent-of-code/years/2023/01/data.txt
// problem url  : https://adventofcode.com/2023/day/1

const numbers: Record<string, string> = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

async function p2023day1_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");
	const linesOnlyN = lines.map(element => element.replace(/\D/g, ""));
	return linesOnlyN.reduce((acc, currValue) => (acc += Number.parseInt(currValue[0] + currValue.slice(-1))), 0);
}

async function p2023day1_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");

	const formattedLines = lines.map(line => {
		let curr = "";
		const or = line;
		line.split("").forEach(char => {
			curr += char;

			Object.keys(numbers).forEach(key => {
				if (curr.includes(key)) {
					line = line.replace(key, numbers[key]);
					curr = "";
				}
			});
		});
		return line;
	});
	const linesOnlyN = formattedLines.map(element => element.replace(/\D/g, ""));
	console.dir(linesOnlyN, { maxArrayLength: null });
	return linesOnlyN.reduce((acc, currValue) => (acc += Number.parseInt(currValue[0] + currValue.slice(-1))), 0);
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `1abc2
		pqr3stu8vwx
		a1b2c3d4e5f
		treb7uchet`,
			expected: "142",
		},
	];
	const part2tests: TestCase[] = [
		{
			input: `two1nine
		eightwothree
		abcone2threexyz
		xtwone3four
		4nineeightseven2
		zoneight234
		7pqrstsixteen`,
			expected: "281",
		},
	];

	const [p1testsNormalized, p2testsNormalized] = normalizeTestCases(part1tests, part2tests);

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of p1testsNormalized) {
			test.logTestResult(testCase, String(await p2023day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of p2testsNormalized) {
			test.logTestResult(testCase, String(await p2023day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2023day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2023day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2023, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
