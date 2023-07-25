package main

import (
	"fmt"
	"os"

	"github.com/samallen659/advent_of_code/2021/pkg/days/day1"
	"github.com/samallen659/advent_of_code/2021/pkg/days/day2"
	"github.com/samallen659/advent_of_code/2021/pkg/days/day3"
	"github.com/samallen659/advent_of_code/2021/pkg/days/day4"
	"github.com/samallen659/advent_of_code/2021/pkg/days/day5"
	"github.com/samallen659/advent_of_code/2021/pkg/days/day6"
)

func main() {
	dayArgument := os.Args[1:][0]
	switch dayArgument {
	case "1":
		fmt.Printf("%d\n", day1.Part1())
		fmt.Printf("%d\n", day1.Part2())
	case "2":
		fmt.Printf("%d\n", day2.Part1())
		fmt.Printf("%d\n", day2.Part2())
	case "3":
		fmt.Printf("%d\n", day3.Part1())
		fmt.Printf("%d\n", day3.Part2())
	case "4":
		fmt.Printf("%d\n", day4.Part1())
		fmt.Printf("%d\n", day4.Part2())
	case "5":
		fmt.Printf("%d\n", day5.Part1())
		fmt.Printf("%d\n", day5.Part2())
	case "6":
		fmt.Printf("%d\n", day6.Part1())
		fmt.Printf("%d\n", day6.Part2())
	}
}
