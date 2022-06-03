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
	tag := os.Getenv("TAG")

	//dropletName := "first-test-droplet"

	opt := &godo.ListOptions{}

	ctx := context.Background()

	floatingIps, _, err := client.FloatingIPs.List(ctx, opt)

	if err != nil {
		fmt.Printf("There was an error: %s", err)
	}

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

	if len(floatingIps) == 0 {
		floatingIpRequest := &godo.FloatingIPCreateRequest{
			Region:    region,
			DropletID: newDroplet.ID,
		}
		newFloatingIp, _, err := client.FloatingIPs.Create(ctx, floatingIpRequest)

		if err != nil {
			fmt.Printf("There was an error making the floating IP: %s", err)
		}

		floatingIps = append(floatingIps, *newFloatingIp)
	}

	var floatingIp *godo.FloatingIP
out:
	for _, f := range floatingIps {
		for _, d := range f.Droplet.Tags {
			if d == tag {
				floatingIp = &f
				break out
			}
		}
	}

	if floatingIp == nil {
		floatingIp = &floatingIps[0]
	}

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

	_, _, err = client.FloatingIPActions.Assign(ctx, floatingIp.IP, newDroplet.ID)

	if err != nil {
		fmt.Printf("There was an error assigning the floating IP to the new droplet: %s", err)
	}

	_, err = client.Droplets.Delete(ctx, droplets[0].ID)

	if err != nil {
		fmt.Printf("There was an error deleting the droplet: %s", err)
	}
}
