---
title: "Introduction to Linux Containers"
date: 2019-08-10
description: "Understanding Linux containers from the ground up — namespaces, cgroups, and how Docker builds on these primitives to simplify application deployment."
tags: ["linux", "containers", "docker"]
---

## What Are Containers?

Containers are lightweight, isolated environments for running applications. Unlike virtual machines, containers share the host OS kernel, making them fast to start and efficient with resources.

Think of a container as a process (or group of processes) that has its own isolated view of the system — its own filesystem, network stack, and process tree.

## The Building Blocks

Linux containers are built on two kernel features: namespaces and cgroups.

### Namespaces

Namespaces provide isolation. Each namespace type isolates a different aspect of the system:

| Namespace | Isolates |
|-----------|----------|
| `pid` | Process IDs |
| `net` | Network interfaces and routing |
| `mnt` | Filesystem mount points |
| `uts` | Hostname and domain name |
| `ipc` | Inter-process communication |
| `user` | User and group IDs |

```bash
# List namespaces for a process
ls -la /proc/$$/ns/

# Run a command in a new namespace
unshare --pid --fork --mount-proc bash
```

### Control Groups (cgroups)

Cgroups limit and account for resource usage:

```bash
# View cgroup hierarchy
ls /sys/fs/cgroup/

# Check memory limit for a cgroup
cat /sys/fs/cgroup/memory/docker/<container_id>/memory.limit_in_bytes

# Check CPU usage
cat /sys/fs/cgroup/cpu/docker/<container_id>/cpuacct.usage
```

## Docker: Containers Made Simple

Docker wraps these Linux primitives into a developer-friendly workflow.

### Key Concepts

- **Image** — a read-only template with your application and dependencies
- **Container** — a running instance of an image
- **Dockerfile** — instructions for building an image
- **Registry** — a repository for sharing images (e.g., Docker Hub)

### Your First Container

```bash
# Pull and run an image
docker run -it ubuntu:22.04 bash

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container_id>
```

### Writing a Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run it:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## Container Networking

Docker creates a virtual network bridge by default:

```bash
# List networks
docker network ls

# Create a custom network
docker network create my-network

# Run containers on the same network
docker run --network my-network --name api my-api
docker run --network my-network --name web my-web
```

Containers on the same network can reach each other by name — `web` can call `http://api:3000`.

## Volumes and Data Persistence

Containers are ephemeral by default. Use volumes to persist data:

```bash
# Create a named volume
docker volume create my-data

# Mount it to a container
docker run -v my-data:/app/data my-app

# Bind mount a host directory
docker run -v $(pwd)/config:/app/config my-app
```

## When to Use Containers

Containers shine when you need:

- **Consistent environments** — "works on my machine" becomes "works everywhere"
- **Fast scaling** — spin up new instances in seconds
- **Microservices** — isolate services with their own dependencies
- **CI/CD pipelines** — reproducible build and test environments

## What's Next

Once you're comfortable with single containers, explore Docker Compose for multi-container applications, then move on to orchestration with Kubernetes or Amazon ECS for production workloads. The container ecosystem is vast, but these fundamentals are the foundation everything else builds on.
