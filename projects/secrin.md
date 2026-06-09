> **One line:** Engineering teams lose the *reasoning* behind their decisions. Secrin captures that context and makes it queryable — like talking to the memory of your own codebase.

## The Problem

Every engineering org leaks knowledge. A decision gets made in a Slack thread, justified in a Jira comment, refined in a pull request, and documented (maybe) in Confluence. Six months later nobody remembers *why* the auth service was split in two, or why that "temporary" Redis cache became permanent.

The code tells you *what* exists. It almost never tells you *why*. That "why" is the single most expensive thing to lose — it's what new hires spend months reconstructing and what causes teams to re-litigate decisions they already made.

I built Secrin to stop that bleed.

## What I Built

Secrin is a context engine that ingests the full surface of developer activity and turns it into a searchable knowledge graph you can question in plain English.

- **Unified ingestion pipeline** — GitHub, Jira, and Confluence flow into one place, killing the context-switching tax and the fragmentation of having the story spread across five tools.
- **Conversational query layer** — a Next.js dashboard where a developer can ask *"why did we move off Postgres for the events table?"* and get an answer stitched from the actual history, with sources.
- **Knowledge graph core** — Neo4j embeddings link commits, issues, and docs into a navigable graph instead of a flat search index, so relationships between decisions are first-class.
- **Local-first architecture** — historical context can be queried offline, which lowers external dependencies and keeps the system reliable even when upstream APIs are down.
- **High-throughput retrieval** — Python ingestion and retrieval pipelines with Redis rate limiting to stay fast and stable under real usage.

## Why It Matters

The payoff is compounding. Once unstructured developer activity becomes searchable knowledge:

- **Debugging gets faster** — you find the original intent instead of guessing.
- **Onboarding gets clearer** — new engineers query the system's memory instead of interrupting senior devs.
- **Architecture decisions get better** — you stop repeating mistakes you've already made and forgotten.

## What I'd Do Next

The graph is the foundation. The next frontier is *proactive* context — surfacing the relevant history automatically inside the PR you're reviewing or the ticket you're picking up, before you even think to ask.

Secrin started as an answer to a frustration I felt on every team I've worked on. Turning that frustration into infrastructure — something other engineers actually adopt — is the part I'm proudest of.
