# CLAUDE.md

Playwright API and UI tests for Stonewake. See [README.md](README.md) for an overview.

## Workflow

All work is tracked as tasks in the [.plan/](.plan/) folder, and each task gets its own branch.

```
.plan/
  BACKLOG.md                      every task, one line each
  infra/use-env-credentials.md    expanded plan for one task, only if needed
```

### Task types

| Type    | Use it for                                        |
| ------- | ------------------------------------------------- |
| `infra` | Changing infrastructure: CI, config, dependencies |
| `test`  | Adding tests                                      |
| `docs`  | Adding documentation                              |

If a piece of work spans more than one type, split it into separate tasks.

### Task format

Tasks live in [.plan/BACKLOG.md](.plan/BACKLOG.md) under the heading for their type:

```
- [ ] test/portfolio-pagination: cover paging in the portfolio list endpoint
```

The status is `[ ]` for todo, `[~]` for in progress, or `[x]` for done.

The part before the colon, `<type>/<short-slug>`, is also the branch name. The slug is lowercase and uses hyphens.

### Expanded plans

Add an expanded plan when a task has several steps, an order that matters, or decisions worth recording. A task that one line describes fully doesn't need one.

The plan goes at `.plan/<type>/<short-slug>.md`, matching the branch name, and its backlog line links to it:

```
- [ ] infra/use-env-credentials: move hardcoded credentials to env vars ([plan](infra/use-env-credentials.md))
```

### Working on a task

1. Find the task in the backlog, or add it if it isn't listed.
2. Create the branch from an up-to-date `master`, using the task's exact name:
   `git checkout -b test/portfolio-pagination`
3. Mark the task `[~]` in the backlog, and write the expanded plan if the task needs one.
4. Do the work on that branch, keeping to the task's scope. If you find other work, add it to the backlog as a new task.
5. Mark the task `[x]` in the same branch, so the status reaches `master` with the merge. Keep the expanded plan as a record.
6. Open a pull request to `master`.

Never commit directly to `master`, and don't use a branch prefix other than `infra/`, `test/` or `docs/`.
