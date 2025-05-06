# Docker Clusters

It can be useful to create clusters of Docker images for purposes of continuous
integration. In this section, we provide an example of spawning a cluster of two
nodes and executing commands in them.

## Setup

First, cd into the correct tutorial directory.
```bash
cd ${SCS_TUTORIAL}/5.2.docker_clusters
```

This directory contains two files:
1. Dockerfile
2. docker-compose.yml

### Create SSH keys

Next we need to create SSH keys. We will place the SSH keys
in the current working directory, **NOT** in ~/.ssh. Data cannot
be copied to a Docker container at build time unless that data
is a subdirectory of the current working directory.

```bash
ssh-keygen -t rsa -f ${PWD}/id_rsa -N "" -q
```
* ``-t rsa`` uses RSA for the algorithm.
* ``-f ${PWD}/id_rsa`` defines the output for the private key to be in this directory.
* ``-N ""`` indicates no password should be generated.
* ``-q`` disables interactive prompts.

## OpenSSH-Server Dockerfile

We have a sample [Dockerfile](https://github.com/scs-lab/scs-tutorial/blob/main/5.2.docker_clusters/Dockerfile) which provides passwordless openssh
daemon in ubuntu 20.04. We describe the sections of the Dockerfile below.

### Install OpenSSH

First, we install openssh, sudo, some text editors, and git.
Technically, git and the text editors aren't required, but they
almost always come in useful in real projects.

```dockerfile
# Install ubuntu 20.04
FROM ubuntu:20.04
LABEL maintainer="llogan@hawk.iit.edu"
LABEL version="0.0"
LABEL description="An example docker image"

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Update ubuntu
RUN apt update && apt install

# Install some basic packages
RUN apt install -y \
    openssh-server \
    sudo git nano vim
```

### Create a user

Next, we create a new user called "sshuser". Many tools complain about
using root mode for everything. While technically safe to do in a container,
we make a custom user anyway.

```dockerfile
# Create a new user
# -m makes the home directory
RUN useradd -m sshuser

# Make the user an admin
RUN usermod -aG sudo sshuser

# Disable password for this user
RUN passwd -d sshuser
```

### Copy SSH keys

We now copy the SSH keys from the host machine to the client machine and give
them the proper permissions. The SSH keys we created in section 5.2.2 should be
located in the same directory as this Dockerfile.

```dockerfile
# Copy the host's SSH keys
# Docker requires COPY be relative to the current working
# directory. We cannot pass ~/.ssh/id_rsa unfortunately...
RUN sudo -u sshuser mkdir ${SSHDIR}
COPY id_rsa ${SSHDIR}/id_rsa
COPY id_rsa.pub ${SSHDIR}/id_rsa.pub

# Authorize host SSH keys
RUN sudo -u sshuser touch ${SSHDIR}/authorized_keys
RUN cat ${SSHDIR}/id_rsa.pub >> ${SSHDIR}/authorized_keys

# Set SSH permissions
RUN chmod 700 ${SSHDIR}
RUN chmod 644 ${SSHDIR}/id_rsa.pub
RUN chmod 600 ${SSHDIR}/id_rsa
RUN chmod 600 ${SSHDIR}/authorized_keys
```

### Start SSH server

Lastly, we configure the openssh server to allow for empty passwords and
then start it.
```dockerfile
# Enable passwordless SSH
# Replaces #PermitEmptyPasswords no with PermitEmptyPasswords yes
RUN sed -i 's/#PermitEmptyPasswords no/PermitEmptyPasswords yes/' /etc/ssh/sshd_config

# Create this directory, because sshd doesn't automatically
RUN mkdir /run/sshd

# Start SSHD
CMD ["/usr/sbin/sshd", "-D"]
```

## Docker Compose File

Docker compose is used to spawn multiple docker containers. This has
a separate configuration.

Below is our example [docker-compose.yaml](https://github.com/scs-lab/scs-tutorial/blob/main/5.2.docker_clusters/docker-compose.yaml)
```yaml
version: "3"

services:
  node1:
    build: .
    links:
      - node2
    networks:
      - net
    hostname: node1
    stdin_open: true
    tty: true

  node2:
    build: .
    networks:
      - net
    hostname: node2
    stdin_open: true
    tty: true

networks:
  net:
    driver: bridge
```

Here we create two nodes: node1 and node2. The "services" section represents the
set of nodes that will be spawned.
1. node1 and node2 are the names of the containers that will be spawned.
2. build: where docker-compose will search for the Dockerfile. In our case,
its the local directory. We used the default names for the Dockerfile and
docker-compose.yaml.
3. networks: label the network the containers are apart of.
"net" is not special; it is just a name, it can be anything.
4. hostname: the name of the host on the network. We force the containers
hostname to be equivalent to the name of the container.
5. links: enable communication between two nodes. Note, node2 doesn't specify
a link to node1. This is because links are already two-way, so it will
result in a cyclic dependency error.

## Build the cluster

First we have to build the container images for the cluster. This will
parse docker-compose.yaml (which is the default name used by docker-compose)
```bash
sudo HOST_USER=${USER} docker-compose build
```

## Spawn the cluster

To spawn the cluster, run the following command
```bash
sudo HOST_USER=${USER} docker-compose up -d
```

## Execute commands

First, we will verify node1 and node2 can be accessed:
```bash
sudo docker-compose exec -u sshuser node1 hostname
sudo docker-compose exec -u sshuser node2 hostname
```

These commands should print "node1" and "node2".

Next, we will try performing ssh from one node into the other.
```bash
sudo docker-compose exec -u sshuser node1 ssh node2 hostname
```

The above command will execute "ssh node2 hostname" in node1.

## Interactive shell with cluster nodes

To get an interactive shell of a node in the cluster, do the following
```bash
sudo docker-compose exec -u sshuser node1 /bin/bash
```

## Shutdown the cluster
```bash
sudo docker-compose down
```
