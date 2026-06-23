---
name: deploy
description: Push Shopify theme to live store and changes to GitHub
allowed-tools: [Bash, Read, Glob]
---

# Deploy to Live

Show the user what will be deployed and wait for explicit confirmation before pushing anything.

## Step 1 — Show what's changing

Run these in parallel and display a clear summary:

```
git -C ../shopify-theme status --short
git -C ../shopify-theme diff --stat HEAD
```

Also show the current git status for this repo:

```
git status --short
git log --oneline -5
```

## Step 2 — Ask for confirmation

Present a concise summary of:
- Which Shopify theme files have changed (added/modified/deleted)
- Which commits are staged to push to GitHub

Then ask the user explicitly: **"Ready to deploy to the live store and push to GitHub?"**

Do NOT proceed until the user confirms.

## Step 3 — Deploy (only after confirmation)

Run in sequence:

1. **GitHub push:**
   ```
   git add -A
   git commit -m "<brief description of changes>"
   git push
   ```
   (Use a sensible commit message based on what changed. Skip commit if nothing to commit.)

2. **Shopify push:**
   ```
   shopify theme push --theme 140973539376 --path ../shopify-theme --store himvsk-cf.myshopify.com --allow-live
   ```

Report success or any errors after each step.
