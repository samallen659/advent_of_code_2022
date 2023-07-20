package day4

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/samallen659/advent_of_code/2021/pkg/utils"
)

func Part1() {
	input := utils.ReadInput("/inputs/day4/input1.txt")
	data := strings.Split(input, "\n\n")
	// moves := strings.Split(data[0], ",")
	boardData := data[1 : len(data)-1]
	var boards []board
	for _, board := range boardData {
		boards = append(boards, createBoard(board))
	}
	fmt.Println(boards[0].left)
}

func createBoard(data string) board {
	boardData := strings.Split(data, "\n")
	colLen := len(boardData)
	rowLen := len(boardData[0])
	var newBoard board
	newBoard.left = make(map[int]bool)
	for i := 0; i < colLen; i++ {
		rowIndex := 0
		for j := 2; j < rowLen+1; j++ {
			if (j+1)%3 == 0 {
				number, _ := strconv.Atoi(strings.Replace(boardData[i][j-2:j], " ", "0", 1))
				newBoard.tiles[i][rowIndex] = number
				newBoard.left[number] = true
				rowIndex++
			}
		}
	}
	return newBoard
}

type board struct {
	tiles [5][5]int
	left  map[int]bool
}

// func (b board) CheckWin() bool {
// 	for i := 0; i < len(b.tiles); i++ {

// 	}
// }
