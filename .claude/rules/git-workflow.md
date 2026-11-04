# Git workflow

Each task in [.plan/BACKLOG.md](../../.plan/BACKLOG.md) gets its own branch and reaches `master` through a pull request. Task types, the backlog format and expanded plans are described in [CLAUDE.md](../../CLAUDE.md).

## Branches

The branch name is the task's exact name from the backlog: `<type>/<short-slug>`.

- The prefix is `infra/`, `test/` or `docs/`. Don't use any other.
- The slug is lowercase and uses hyphens.
- Each task gets one branch. If a piece of work spans more than one type, split it into separate tasks.

Never commit directly to `master`.

## Working on a task

1. Find the task in the backlog, or add it if it isn't listed.
2. Create the branch from an up-to-date `master`:

   ```
   git checkout master
   git pull origin master
   git checkout -b test/portfolio-pagination
   ```

3. Mark the task `[~]` in the backlog, and write the expanded plan if the task needs one.
4. Do the work on that branch, keeping to the task's scope. If you find other work, add it to the backlog as a new task.
5. Mark the task `[x]` in the same branch, so the status reaches `master` with the merge. Keep the expanded plan as a record.
6. Push the branch and open a pull request to `master`:

   ```
   git push -u origin test/portfolio-pagination
   gh pr create --base master
   ```
