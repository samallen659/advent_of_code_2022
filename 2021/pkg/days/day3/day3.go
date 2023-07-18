package day3

import (
	"strconv"
	"strings"

	"github.com/samallen659/advent_of_code/2021/pkg/utils"
)

func Part1() int64 {
	input := utils.ReadInput("/inputs/day3/input1.txt")
	data := strings.Split(input, "\n")
	gammaStr := getGamma(data)
	epsilonStr := getEpsilon(gammaStr)
	gamma, _ := strconv.ParseInt(gammaStr, 2, 64)
	epsilon, _ := strconv.ParseInt(epsilonStr, 2, 64)
	return gamma * epsilon
}

func getGamma(data []string) string {
	lineLen := len(data[0])
	gamma := ""
	for i := 0; i < lineLen; i++ {
		oneCount := 0
		zeroCount := 0
		for j := 0; j < len(data)-1; j++ {
			if strings.Split(data[j], "")[i] == "1" {
				oneCount++
				continue
			}
			zeroCount++
		}
		if oneCount > zeroCount {
			gamma = gamma + "1"
			continue
		}
		gamma = gamma + "0"
	}
	return gamma
}

func getEpsilon(gamma string) string {
	epsilon := ""
	for _, s := range gamma {
		if string(s) == "1" {
			epsilon = epsilon + "0"
			continue
		}
		epsilon = epsilon + "1"
	}
	return epsilon
}
