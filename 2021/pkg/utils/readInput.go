package utils

import (
	"io/ioutil"
	"log"
	"os"
)

func ReadInput(filePath string) string {
	pwd, _ := os.Getwd()
	relativePath := pwd + filePath
	content, err := ioutil.ReadFile(relativePath)

	if err != nil {
		log.Fatal(err)
	}

	return string(content)
}
