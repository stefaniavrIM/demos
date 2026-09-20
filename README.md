# Intro to Hacking 🕵️

Two deliberately-vulnerable little web pages for a beginner-friendly cybersecurity talk.
They run **entirely in the browser** — no server, no backend — so you can host them on
**GitHub Pages** and give students one link to follow along with. Each student's browser
is its own sandbox, so nobody can mess up anyone else's copy.

> ⚠️ **These pages are vulnerable on purpose, for teaching.** The people, the club and the
> data are all invented, and nothing is sent anywhere. The point is to *show* how the attacks
> work — don't reuse this code in a real app.

## Put it online (GitHub Pages)

1. Create a new **public** repository on GitHub (e.g. `intro-to-hacking`).
2. Upload **all** the files in this folder (keep `sql-wasm.js`, `sql-wasm.wasm` and `.nojekyll`).
3. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   pick branch `main` and folder `/ (root)`, and **Save**.
4. Wait ~1 minute. Your site is live at:

   ```
   https://<your-username>.github.io/intro-to-hacking/
   ```

Share that link. Students open it and click a demo.

*(To try it locally first: run `python3 -m http.server` in this folder and open
`http://localhost:8000`.)*

---

## Demo 1 — Poison a page to display what we want (XSS) 🍳

Open **Demo 1**. Stefania's cooking blog has a guestbook that drops whatever you type
**straight into the page** — so a comment can be **code**, not just text. Post these one
at a time:

1. `<b>hello</b>` — shows up **bold** (a safe site would print the tags as text).
2. `<img src=x onerror=alert('xss')>` — you just ran JavaScript.
3. `<script src="hack.js"></script>` — loads the attacker's script and **defaces the whole page**.

Because the comment is *saved*, the defacement comes back every time the page is opened —
that's **stored XSS**. Click **Reset the blog** to clean it up.

**The fix:** escape user input before putting it in HTML; add a Content-Security-Policy.

## Demo 2 — Gain unauthorized database access (SQL Injection) 🔒

Open **Demo 2**. Stefania's members-only club has a login that builds its database query by
**gluing your text straight into SQL** (this runs a *real* SQLite database in your browser):

```sql
SELECT username FROM members WHERE username = '<you>' AND password = '<you>'
```

1. Try a wrong login (`admin` / `guess`) → **ACCESS DENIED**.
2. Put this in the **username** box (password can be anything):

   ```
   ' OR 1=1 --
   ```

   Now the check is always true and the password part is commented out, so you're let in as
   the founder — and the whole member table (emails + plaintext passwords) is dumped.

Click **Reset** to log back out.

**The fix:** never build SQL by pasting in user input — use parameterized queries. And never
store passwords in plain text (hash them with bcrypt/argon2).

---

## The lesson

Both demos are the same mistake in two costumes: **never trust input.** A page that trusts what
a user types — whether it lands in HTML or in a SQL query — hands control to the user.

## Files

| File | What it is |
|---|---|
| `index.html` | Landing page (pick a demo) |
| `blog.html` | Demo 1 — the XSS cooking blog |
| `club.html` | Demo 2 — the SQL-injection club |
| `hack.js` | The attacker's defacement payload (loaded by the XSS) |
| `sql-wasm.js`, `sql-wasm.wasm` | SQLite compiled to WebAssembly (runs the real database in-browser) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

No installation, no dependencies to fetch — everything is in this folder.
