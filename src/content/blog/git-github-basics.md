---
title: "Getting Started with Git and GitHub"
date: 2019-04-15
description: "A hands-on tutorial covering Git fundamentals and GitHub workflows, from your first commit to pull requests and branching strategies."
tags: ["git", "github", "tutorial"]
logoImage: "/images/git-logo.svg"
---

## Why Git?

Git is the version control system that powers modern software development. Whether you're working solo or on a team of hundreds, Git tracks every change to your codebase and lets you collaborate without stepping on each other's toes.

## Setting Up

First, install Git and configure your identity:

```bash
# Install Git (macOS)
brew install git

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch name
git config --global init.defaultBranch main
```

## Core Concepts

### Repository

A repository (repo) is a directory tracked by Git. Initialize one with:

```bash
mkdir my-project
cd my-project
git init
```

### The Three States

Files in Git exist in three states:

1. **Modified** — you've changed the file but haven't staged it
2. **Staged** — you've marked the file to go into your next commit
3. **Committed** — the data is safely stored in your local database

### Basic Workflow

```bash
# Check status of your files
git status

# Stage specific files
git add index.html style.css

# Stage all changes
git add .

# Commit with a message
git commit -m "Add homepage layout and styles"

# View commit history
git log --oneline
```

## Branching

Branches let you work on features in isolation:

```bash
# Create and switch to a new branch
git checkout -b feature/user-auth

# List all branches
git branch -a

# Switch back to main
git checkout main

# Merge a feature branch
git merge feature/user-auth

# Delete a merged branch
git branch -d feature/user-auth
```

## Working with GitHub

### Connecting to a Remote

```bash
# Add a remote repository
git remote add origin https://github.com/username/repo.git

# Push your code
git push -u origin main

# Pull latest changes
git pull origin main
```

### Pull Request Workflow

The standard collaboration flow on GitHub:

1. Fork the repository (if you don't have write access)
2. Create a feature branch
3. Make your changes and commit
4. Push the branch to GitHub
5. Open a Pull Request (PR)
6. Get code review and address feedback
7. Merge the PR

### Useful GitHub Features

- **Issues** — track bugs and feature requests
- **Actions** — automate CI/CD pipelines
- **Projects** — organize work with kanban boards
- **Releases** — tag and distribute versions

## Common Commands Cheatsheet

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git checkout -- .

# Stash changes temporarily
git stash
git stash pop

# View diff of staged changes
git diff --staged

# Rebase onto main
git rebase main

# Interactive rebase (squash commits)
git rebase -i HEAD~3
```

## Next Steps

Once you're comfortable with the basics, explore topics like rebasing strategies, Git hooks, signed commits, and monorepo tooling. Git is deep — but the fundamentals covered here will carry you through 90% of daily development work.
