let runId: string | undefined

/** Returns the run id: unique per run and stable within a process. */
export function buildRunId(): string {
  if (!runId) {
    runId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  }
  return runId
}

/** Returns `qa-<runId>-<label>`, the name for anything a test creates. */
export function buildName(label: string): string {
  return `qa-${buildRunId()}-${label}`
}
