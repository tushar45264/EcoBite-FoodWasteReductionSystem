package main

import (
	"log"
	"net/http"

	"github.com/foodWasteReductionSystem/api-backend/routes"
)

func main() {
	router := routes.SetupRoutes()
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
