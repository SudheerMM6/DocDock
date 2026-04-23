# VERIFY REPORT

Date: 2026-04-07
Repo: `D:/DocDock`
OS/Shell: Windows / PowerShell

## Step A - Git Sync Sanity

Result: **PASS**

### 1) `git status` (before fetch)
```text
On branch main
Your branch is behind 'origin/main' by 6 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

### 2) `git remote -v`
```text
origin  https://github.com/SudheerMM6/DocDock.git (fetch)
origin  https://github.com/SudheerMM6/DocDock.git (push)
```

### 3) `git fetch origin`
```text
(no output)
```

### 4) `git status` (after fetch)
```text
On branch main
Your branch is behind 'origin/main' by 6 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

### 5) `git log --oneline --decorate --graph --max-count 15`
```text
* df2bb09 (HEAD -> main) Updated README for DocDock
* 238abe0 Initial release under Sudheer
```

### Fast-forward pull (required because branch was behind)
Command: `git pull --ff-only`
```text
Updating df2bb09..61e8a95
Fast-forward
 README.md                             | 23 +++++++++++++----------
 backend/controllers/userController.js | 12 ++++++++----
 backend/middlewares/authUser.js       | 10 ++++------
 backend/routes/userRoute.js           |  4 ++--
 4 files changed, 27 insertions(+), 22 deletions(-)
```

Post-pull checks (`git status; git log -1 --oneline`)
```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
61e8a95 Update authUser.js
```

## Step B - Repo Structure

Result: **PASS**

Checks:
- `backend/` exists and contains `backend/package.json`
- `frontend/` exists and contains `frontend/package.json`
- `admin/` exists and contains `admin/package.json`

Command output (`ls` at repo root):
```text
Directory: D:\DocDock

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        24-09-2025     00:39                admin
d-----        24-09-2025     00:39                backend
d-----        24-09-2025     00:39                frontend
-a----        24-09-2025     00:39            283 .gitignore
-a----        07-04-2026     19:33           2091 README.md
```

## Step C - Install + Build Checks

### Runtime versions (run once)
Command: `npm --version; node --version`
```text
11.6.1
v25.2.1
```

### Backend (`backend/`)
Result: **FAIL**

`npm install`
```text
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated npmlog@5.0.1: This package is no longer supported.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated q@1.5.1: You or someone you depend on is using Q, the JavaScript Promise library that gave JavaScript developers strong feelings about promises. They can almost certainly migrate to the native JavaScript promise now. Thank you literally everyone for joining me in this bet against the odds. Be excellent to each other.
npm warn deprecated
npm warn deprecated (For a CapTP with native promises, see @endo/eventual-send and @endo/captp)
npm warn deprecated are-we-there-yet@2.0.0: This package is no longer supported.
npm warn deprecated gauge@3.0.2: This package is no longer supported.

added 218 packages, and audited 219 packages in 14s

26 packages are looking for funding
  run `npm fund` for details

15 vulnerabilities (1 low, 2 moderate, 11 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
npm notice
npm notice New minor version of npm available! 11.6.1 -> 11.12.1
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.12.1
npm notice To update run: npm install -g npm@11.12.1
npm notice
```

No `build` script in `backend/package.json`, so fallback used: `npm test`
```text
> backend@1.0.0 test
> echo "Error: no test specified" && exit 1

"Error: no test specified"
```

### Frontend (`frontend/`)
Result: **PASS**

`npm install; npm run build`
```text
added 316 packages, and audited 317 packages in 17s

63 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (2 low, 4 moderate, 9 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

> frontend@0.0.0 build
> vite build

vite v6.2.3 building for production...
transforming...
Browserslist: browsers data (caniuse-lite) is 14 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ 149 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                0.57 kB │ gzip:   0.35 kB
dist/assets/razorpay_logo-C6aP63br.png         4.49 kB
dist/assets/Gastroenterologist-d3bRTDBt.svg    5.15 kB │ gzip:   1.92 kB
dist/assets/Gynecologist-PQkK9dDU.svg          7.45 kB │ gzip:   3.09 kB
dist/assets/logo-BjWpwWtV.svg                  9.61 kB │ gzip:   3.86 kB
dist/assets/Pediatricians-CPBIsWN8.svg        10.22 kB │ gzip:   2.75 kB
dist/assets/Neurologist-B3JnjsXg.svg          12.83 kB │ gzip:   5.69 kB
dist/assets/group_profiles-BCL6AVF5.png       14.98 kB
dist/assets/profile_pic-D58ifz71.png          70.26 kB
dist/assets/doc10-CAm4njsj.png                87.92 kB
dist/assets/doc1-DpAa9vNj.png                 96.61 kB
dist/assets/doc14-DFAA3xQf.png                98.77 kB
dist/assets/doc6-BBgIGkd-.png                 99.23 kB
dist/assets/doc3-D46sSx07.png                103.54 kB
dist/assets/doc2-Y_tw-_wb.png                105.13 kB
dist/assets/doc12-DnN3-E9a.png               106.75 kB
dist/assets/doc5-DMyOgDQL.png                109.89 kB
dist/assets/doc15-wRQogShG.png               111.60 kB
dist/assets/doc7-Jj6FmILj.png                113.81 kB
dist/assets/doc4-BJ7TwJ-q.png                114.17 kB
dist/assets/doc11-Dhd97DEN.png               116.69 kB
dist/assets/doc9-DFlzAwfe.png                120.51 kB
dist/assets/doc8-IA4IHo5Z.png                124.59 kB
dist/assets/doc13-iluopkgH.png               126.46 kB
dist/assets/appointment_img-DzbZlMsi.png     380.57 kB
dist/assets/about_image-MG9zrc7b.png         439.55 kB
dist/assets/header_img-DhAi3lLA.png          465.14 kB
dist/assets/contact_image-IJu_19v_.png       727.14 kB
dist/assets/index-CGU-zNTg.css                31.23 kB │ gzip:   6.59 kB
dist/assets/index-bnoQUgPG.js                335.89 kB │ gzip: 109.79 kB
✓ built in 3.65s
```

### Admin (`admin/`)
Result: **PASS**

`npm install; npm run build`
```text
added 315 packages, and audited 316 packages in 9s

63 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (2 low, 4 moderate, 9 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

> admin@0.0.0 build
> vite build

vite v6.2.3 building for production...
transforming...
Browserslist: browsers data (caniuse-lite) is 14 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ 121 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                        0.48 kB │ gzip:   0.30 kB
dist/assets/admin_logo-BXaN--dQ.svg   21.79 kB │ gzip:   8.14 kB
dist/assets/index-BHzsZoim.css        26.61 kB │ gzip:   5.68 kB
dist/assets/index-D0Ftxwiv.js        339.96 kB │ gzip: 108.39 kB
✓ built in 3.38s
```

## Step D - Runtime Prerequisites / Secrets Scan

Result: **PASS (with notes)**

### Env requirements found
From backend `process.env` usage:
- `PORT`
- `JWT_SECRET`
- `KEY_ID`
- `KEY_SECRET`
- `CURRENCY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `MONGODB_URI`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`

README sample also includes:
- `MONGO_URI` (note: backend code currently references `MONGODB_URI`)

### Secret scan findings (no real secrets committed found)
Pattern checks found placeholder-style entries in docs, not live credentials:
- `README.md`: `MONGO_URI=your_mongodb_connection_string`
- `README.md`: `JWT_SECRET=your_secret_key`

No committed `JWT_SECRET=...` / `MONGO_URI=...` values with real-looking secrets were found in tracked source files during this scan.

### MongoDB runtime requirement
Backend `mongodb.js` requires `MONGODB_URI`; runtime verification needs a reachable MongoDB URI.  
Build/install checks can still pass without running a live DB instance.

## Overall Status

- Git sync: **PASS**
- Backend install/build: **FAIL** (fallback `npm test` script is a placeholder that exits 1)
- Frontend install/build: **PASS**
- Admin install/build: **PASS**
- Env requirements: **Listed above**

## How To Run (short)

```bash
# backend
cd backend
npm install
npm start

# frontend
cd ../frontend
npm install
npm run dev

# admin
cd ../admin
npm install
npm run dev
```
