package day4

import (
	"fmt"
	"github.com/samallen659/advent_of_code/2021/pkg/utils"
	"strconv"
	"strings"
)

func Part1() int {
	input := utils.ReadInput("/inputs/day4/input1.txt")
	data := strings.Split(input, "\n\n")
	moves := strings.Split(data[0], ",")
	boardData := data[1:]
	var boards []board
	for _, bd := range boardData {
		boards = append(boards, createBoard(bd))
	}
	var winner board
	var finalMove int
turn:
	for _, move := range moves {
		fmt.Printf("Move: %s\n", move)
		for _, b := range boards {
			moveNum, _ := strconv.Atoi(move)
			b.MarkNumber(moveNum)
			if b.CheckWin() {
				winner = b
				finalMove = moveNum
				break turn
			}
		}
	}
	return finalMove * sumUnmakedNumberes(winner)
}

func sumUnmakedNumberes(b board) int {
	sum := 0
	for key, _ := range b.left {
		sum += key
	}
	return sum
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

func (b board) MarkNumber(num int) {
	if b.left[num] {
		delete(b.left, num)
	}
}

func (b board) CheckWin() bool {
	for i := 0; i < 5; i++ {
		row := 0
		for j := 0; j < 5; j++ {
			if b.left[b.tiles[i][j]] {
				break
			} else {
				row++
			}
		}
		if row == 5 {
			return true
		}
		col := 0
		for j := 0; j < 5; j++ {
			if b.left[b.tiles[j][i]] {
				break
			} else {
				col++
			}
		}
		if col == 5 {
			return true
		}
	}
	return false
}
