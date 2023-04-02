package main

import (
	"admin-server/admin"
	"net/http"
)

func main() {
	http.ListenAndServe(":3000", admin.NewHttpHandler())
}
