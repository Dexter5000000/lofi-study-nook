let lastError: unknown = null;

if (typeof process !== "undefined" && process.on) {
  try {
    process.on("uncaughtException", (err) => { lastError = err; });
    process.on("unhandledRejection", (err) => { lastError = err; });
  } catch { /* ignore */ }
}

export function consumeLastCapturedError(): unknown {
  const e = lastError;
  lastError = null;
  return e;
}
