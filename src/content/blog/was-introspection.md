---
title: "WebSphere Application Server Introspection and Troubleshooting"
date: 2018-03-15
description: "A practical guide to introspecting and troubleshooting WebSphere Application Server environments, covering key diagnostic tools and techniques."
tags: ["websphere", "java", "middleware"]
---

## Why Introspection Matters

When you're managing enterprise Java applications on WebSphere Application Server (WAS), things will eventually go sideways. Thread hangs, memory leaks, classloader conflicts — the usual suspects. Having a solid introspection workflow saves hours of guesswork.

This post covers the diagnostic tools and techniques I've relied on across dozens of WAS environments.

## Key Diagnostic Tools

### Server Logs

The first place to look is always the server logs. WAS writes to several log files:

- `SystemOut.log` — standard output, application messages
- `SystemErr.log` — error output, stack traces
- `native_stderr.log` / `native_stdout.log` — JVM-level output
- `trace.log` — detailed trace when enabled

```bash
# Tail the logs in real time
tail -f /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/server1/SystemOut.log
```

### Thread Dumps

Thread dumps are invaluable for diagnosing hangs and deadlocks. You can trigger them from the admin console or via the command line:

```bash
# Generate a thread dump using kill -3 (SIGQUIT)
kill -3 <was_pid>

# Or use the wsadmin tool
wsadmin -lang jython -c "AdminControl.invoke(AdminControl.completeObjectName('type=JVM,process=server1,*'), 'dumpThreads')"
```

Look for threads stuck in `BLOCKED` or `WAITING` states. Multiple thread dumps taken 10-30 seconds apart help identify patterns.

### Heap Dumps

For memory issues, heap dumps tell you exactly what's consuming memory:

```bash
# Trigger a heap dump via wsadmin
wsadmin -lang jython -c "AdminControl.invoke(AdminControl.completeObjectName('type=JVM,process=server1,*'), 'generateHeapDump')"
```

Use IBM's Memory Analyzer or Eclipse MAT to analyze the dump. Look for dominator trees and leak suspects.

## Common Issues and Fixes

### ClassLoader Conflicts

WAS uses a hierarchical classloader model. When you see `ClassCastException` or `NoClassDefFoundError`, it's usually a classloader ordering issue.

Check your application's classloader policy:
1. Open the admin console
2. Navigate to Applications → Your App → Class loading and update detection
3. Set class loader order to "Classes loaded with local class loader first (parent last)"

### Connection Pool Exhaustion

If your app suddenly stops responding, check the JDBC connection pool:

```bash
# Check pool stats via wsadmin
wsadmin -lang jython -c "print AdminControl.getAttribute(AdminControl.completeObjectName('type=DataSource,name=YourDS,*'), 'connectionPoolContents')"
```

Key metrics to watch: pool size, number of waiters, and average wait time.

## Wrapping Up

Effective WAS troubleshooting comes down to knowing which tool to reach for and building a repeatable diagnostic workflow. Start with logs, move to thread dumps for hangs, heap dumps for memory, and always check classloader configuration when you see class-related exceptions.
