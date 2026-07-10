import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEBOUNCE_DELAY_MS = 15000; // 15 seconds debounce to avoid committing on half-typed saves
const WATCH_DIRS = ['src', 'public', '.'];
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'dist', '.gemini']);

let timeoutId = null;
let isPushing = false;
let pendingChanges = false;

function log(msg, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${msg}`);
}

function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function triggerAutoCommitAndPush() {
  if (isPushing) {
    pendingChanges = true;
    return;
  }

  try {
    isPushing = true;
    
    // Check if there are any git changes
    const statusOutput = await executeCommand('git status --porcelain');
    if (!statusOutput) {
      isPushing = false;
      return;
    }

    log('Changes detected. Staging files...');
    await executeCommand('git add .');

    const timestamp = new Date().toLocaleString();
    const commitMsg = `Auto-save commit: ${timestamp}`;
    
    log(`Committing: "${commitMsg}"...`);
    await executeCommand(`git commit -m "${commitMsg}"`);

    log('Pushing to GitHub (origin main)...');
    await executeCommand('git push origin main');

    log('Successfully pushed changes to GitHub!', 'success');
  } catch (err) {
    // If commit fails because nothing changed or push fails due to network
    if (err && err.stdout && err.stdout.includes('nothing to commit')) {
      // Nothing to commit
    } else {
      log(`Error during auto-push: ${err?.error?.message || err.stderr || err}`, 'error');
    }
  } finally {
    isPushing = false;
    if (pendingChanges) {
      pendingChanges = false;
      scheduleAutoPush();
    }
  }
}

function scheduleAutoPush() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  log(`Change detected. Auto-push scheduled in ${DEBOUNCE_DELAY_MS / 1000}s...`);
  timeoutId = setTimeout(() => {
    triggerAutoCommitAndPush();
  }, DEBOUNCE_DELAY_MS);
}

function setupWatcher(dirPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) return;

    for (const entry of entries) {
      if (entry.isDirectory() && !IGNORE_DIRS.has(entry.name)) {
        const fullPath = path.join(dirPath, entry.name);
        try {
          fs.watch(fullPath, (eventType, filename) => {
            if (filename && !filename.startsWith('.git') && filename !== 'auto-push.js') {
              scheduleAutoPush();
            }
          });
          setupWatcher(fullPath); // Recursive watch
        } catch (e) {
          // Ignore watch errors on unreadable directories
        }
      }
    }
  });
}

log('Starting Auto-Push Watcher...', 'success');
log(`Watching project directory for changes (Debounce: ${DEBOUNCE_DELAY_MS / 1000}s)...`);
log('Any changes you save will automatically commit and push to GitHub.');

// Watch top-level directory and subdirectories
try {
  fs.watch(__dirname, (eventType, filename) => {
    if (filename && !filename.startsWith('.git') && !IGNORE_DIRS.has(filename) && filename !== 'auto-push.js') {
      scheduleAutoPush();
    }
  });
  WATCH_DIRS.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
      setupWatcher(fullPath);
    }
  });
} catch (e) {
  log(`Failed to setup watch: ${e.message}`, 'error');
}
