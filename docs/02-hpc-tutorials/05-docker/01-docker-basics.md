# Docker Guide
This is a brief guide on how to use Docker. Docker is a containerization
framework. Containers are used run multiple OSes at once without
having to reboot or log out. There are many uses for containers:
1. Portability: For example, code programmed on for a Linux system
can now execute on a Mac or Windows machine.
2. Testing: You can test your code on multiple OSes just by spawning
different containers for each OS and running your unit tests there.
3. Reliability: Containers can be migrated if a machine is expected
to go down. This is frequently done by cloud providers

## Installation

The official install guide is [here](https://docs.docker.com/engine/install/).
You do need root priviliges to install and use docker.

## Docker Basics

In this section, we go through an example of a Dockerfile and how to create a
container.

### Setup

First, cd into the tutorial directory.
```bash
cd ${SCS_TUTORIAL}/5.1.docker_basics
```

This directory contains a single file: Dockerfile

## Create a Dockerfile
Below is an example [Dockerfile](https://github.com/grc-iit/grc-tutorial/blob/main/docker/01-docker-basics/Dockerfile) which creates a basic Ubuntu20.04 container.
```docker
# Install ubuntu 20.04
FROM ubuntu:20.04
LABEL maintainer="llogan@hawk.illinoistech.edu"
LABEL version="0.0"
LABEL description="An example docker image"

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Update ubuntu
RUN apt update && apt install

# Install some basic packages
RUN apt install -y \
    openssh-server \
    sudo

# Set an environment variable
ENV MY_VAR=hi

# Print environment variable
RUN echo ${MY_VAR}
```

1. FROM ubuntu:20.04 indicates the OS version that docker should install.
There are other OSes, such as fedora:latest, ubuntu:latest, centos:centos8.
This can be useful for testing portability.
2. LABEL parameters are just metadata
3. RUN executes a command as if in a terminal
4. ENV sets an environment variable

## Build the container image

First, the container image must be built. This will parse the Dockerfile, install the OS, and run all commands in the Dockerfile.
The syntax is as follows:
```bash
sudo docker build -t [IMAGE_NAME] [DOCKERFILE_DIR, can be a github link] -f [DOCKERFILE_NAME]
```
1. IMAGE_NAME: a semantic name for the image being built. NOTE: the name must be in snake case (i.e., no caps).
2. DOCKERFILE_DIR: the directory containing the Dockerfile.
3. DOCKERFILE_NAME: the name of the dockerfile in that directory. This is optional. Default: Dockerfile.

Let's say that our Dockerfile is located at ``${HOME}/MyDockerfiles/Dockerfile``.
We could build the image two ways:
```
# Option 1: a single command
sudo docker build -t myimage ${HOME}/MyDockerfiles

# Option 2: cd into the directory
cd ${HOME}/MyDockerfiles
sudo docker build -t myimage .
```

## Run the container

Next, we must run the container. This will create a container from the container image. There can be multiple containers made from the same image.
The syntax is as follows:
```bash
sudo docker run [OPTIONS] [IMAGE_NAME] [COMMAND (optional)]
```
1. OPTIONS: There are many settings which docker provides. We'll go over some of them below.
2. IMAGE_NAME: The semantic name of the image to build the container from
3. COMMAND: An optional command to run within the container.

This command will create a container CONTAINER_ID from IMAGE_NAME which uses the host network to connect to the internet and download packages.

In our case, we want to make the container interactive (i.e., have a shell):
```
sudo docker run -it --name mycontainer --network host myimage
```
We use the option "-it" to specify this is an interactive session.

## Interacting with the container

You can reconnect to an interactive container's shell using docker exec. The syntax is as follows:
```bash
sudo docker exec [CONTAINER_ID] /bin/bash
```

You can now run commands within the image. For us, this would be:
```bash
sudo docker exec mycontainer /bin/bash
```

## Useful Commands
```bash
# Run a container with a shared directory between guest and host
sudo docker run -it --name [CONTAINER_ID] --mount src=[HOST_PATH],target=[CONTAINER_PATH],type=bind --network host [IMAGE_NAME]

# List all running containers
sudo docker container ls

# List all container IDs
sudo docker container ls --all

# Get interactive shell for container
sudo docker exec [CONTAINER_ID] /bin/bash

# Execute command in container
docker exec [CONTAINER_ID] [COMMAND]

# Kill a running container
sudo docker stop [CONTAINER_ID]

# Delete a container
sudo docker rm [CONTAINER_ID]

# Commit the state of a container CONTAINER_ID into a new container
# COPY_CONTAINER_ID
sudo docker commit [CONTAINER_ID] [COPY_CONTAINER_ID]
```
