package day6

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/samallen659/advent_of_code/2021/pkg/utils"
)

var input = utils.ReadInput("/inputs/day6/input1.txt")
var data = strings.Split(input, ",")

func Part1() {
	var lanternFish []int
	for _, fishStr := range data {
		fishNum, _ := strconv.Atoi(fishStr)
		lanternFish = append(lanternFish, fishNum)
	}

	for i := 0; i < 80; i++ {
		for i, fish := range lanternFish {
			if fish == 0 {
				lanternFish[i] = 6
				lanternFish = append(lanternFish, 8)
			} else {
				lanternFish[i]--
			}
		}
	}
	fmt.Println(len(lanternFish))
}
