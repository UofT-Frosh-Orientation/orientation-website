package main

import (
	"context"
	"fmt"
	"github.com/digitalocean/godo"
	"time"
	"os"
)

func main() {
	client := godo.NewFromToken(os.Getenv("DIGITALOCEAN_API_KEY"))
	userData := os.Getenv("USER_DATA")
	region := os.Getenv("REGION")
	name := os.Getenv("NAME")
	ip := os.Getenv("IP")

	//dropletName := "first-test-droplet"

	opt := &godo.ListOptions{}

	ctx := context.Background()

	droplets, _, err := client.Droplets.List(ctx, opt)

	createRequest := &godo.DropletCreateRequest{
		Name:   name,
		Region: region,
		Size:   "s-1vcpu-1gb",
		Image: godo.DropletCreateImage{
			Slug: "docker-20-04",
		},
		UserData: userData,
	}

	newDroplet, _, err := client.Droplets.Create(ctx, createRequest)

	if err != nil {
		fmt.Printf("Something bad happened: %s\n\n", err)
	}
	fmt.Printf("New droplet created!\nName: %s\nCreated at: %s\nStatus: %s\n", newDroplet.Name, newDroplet.Created, newDroplet.Status)

	dropletId := newDroplet.ID
	for {
		newDroplet, _, err = client.Droplets.Get(ctx, dropletId)
		if newDroplet.Status == "active" {
			fmt.Printf("Droplet is active!\n")
			break
		} else {
			fmt.Printf("Client has status: %s\n", newDroplet.Status)
			time.Sleep(15 * time.Second)
		}
	}

	_, _, err = client.FloatingIPActions.Assign(ctx, ip, newDroplet.ID)

	if err != nil {
		fmt.Printf("There was an error assigning the floating IP to the new droplet: %s", err)
	}

	_, err = client.Droplets.Delete(ctx, droplets[0].ID)

	if err != nil {
		fmt.Printf("There was an error deleting the droplet: %s", err)
	}
}
