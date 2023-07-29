package day9

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/samallen659/advent_of_code/2021/pkg/utils"
)

var input = utils.ReadInput("/inputs/day9/input1.txt")
var lines = strings.Split(input, "\n")

func Part1() int {
	var heightMap [][]int
	for _, line := range lines {
		var lineMap []int
		lineSplit := strings.Split(line, "")
		for _, height := range lineSplit {
			heightInt, _ := strconv.Atoi(height)
			lineMap = append(lineMap, heightInt)
		}
		heightMap = append(heightMap, lineMap)
	}
	var lowPoints []int
	for y := 0; y < len(heightMap); y++ {
		for x := 0; x < len(heightMap[y]); x++ {
			switch {
			case y > 0 && heightMap[y-1][x] <= heightMap[y][x]:
				continue
			case y < len(heightMap)-1 && heightMap[y+1][x] <= heightMap[y][x]:
				continue
			case x > 0 && heightMap[y][x-1] <= heightMap[y][x]:
				continue
			case x < len(heightMap[y])-1 && heightMap[y][x+1] <= heightMap[y][x]:
				continue
			default:
				lowPoints = append(lowPoints, heightMap[y][x])
			}
		}
	}

	total := 0
	for _, point := range lowPoints {
		total += point + 1
	}

	return total
}

func Part2() {

}
