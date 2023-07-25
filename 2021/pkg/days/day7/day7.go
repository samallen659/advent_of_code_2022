package day7

import (
	// "fmt"
	"math"
	"sort"
	"strconv"
	"strings"

	"github.com/samallen659/advent_of_code/2021/pkg/utils"
)

var input = utils.ReadInput("/inputs/day7/input1.txt")
var data = strings.Split(input, ",")

func Part1() int {
	var crabPosition []int
	for _, posStr := range data {
		posInt, _ := strconv.Atoi(posStr)
		crabPosition = append(crabPosition, posInt)
	}
	sort.Ints(crabPosition)
	var med = crabPosition[int(math.Round(float64(len(crabPosition)/2)))]

	fuelTotal := 0
	for _, posInt := range crabPosition {
		fuelTotal += Abs(posInt - med)
	}

	return fuelTotal
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
