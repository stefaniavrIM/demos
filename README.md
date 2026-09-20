# Intro to Hacking 🕵️

Two deliberately-vulnerable little websites for a beginner-friendly cybersecurity talk.
Everything runs **locally**, needs **nothing installed** (just Python 3), and stores **nothing**.

> ⚠️ **These sites are vulnerable on purpose, for teaching.** Run them on your own laptop.
> Do **not** deploy them to the public internet. Everything here — the people, the club,
> the data — is invented.

## Run it

```bash
python3 app.py
```

Then open **one** link in your browser:

```
http://localhost:8000
```

Pick a demo from the landing page.

---

## Demo 1 — Poison a page to display what we want (XSS) 🍳  (`/blog`)

Stefania's cooking blog has a guestbook. It takes whatever you type in a comment and
drops it **straight into the page** for every future visitor — without escaping it.
That means a comment isn't just text; it can be **code**.

Try posting these as comments, one at a time:

1. `<b>hello</b>` — your text shows up **bold**. (A normal site would print the tags as text.)
2. `<script>alert('xss')</script>` — you just ran JavaScript on the page.
3. `<script src="/hack.js"></script>` — loads an external script that **defaces the whole blog**.

Because the comment is *stored*, everyone who opens the blog runs it too — that's **stored XSS**.

Click **reset the blog** (bottom of the page) to clean it up.

**The fix:** escape/encode user input before putting it in HTML, and use a Content-Security-Policy.

---

## Demo 2 — Gain unauthorized database access (SQL Injection) 🔒  (`/club`)

Stefania's members-only club is behind a login. You're not a member. But the login builds
its database query by **gluing your text straight into SQL**:

```sql
SELECT username FROM members WHERE username = '<what you typed>' AND password = '<what you typed>'
```

1. Try a normal wrong login (e.g. `admin` / `guess`) → **ACCESS DENIED**.
2. Now put this in the **username** box (password can be anything):

   ```
   ' OR 1=1 --
   ```

   The query becomes `... WHERE username = '' OR 1=1 --' AND password = '...'`.
   `1=1` is always true and `--` comments out the rest, so the check passes: **you're in**,
   as the founder — and the whole member table (emails + plaintext passwords) is yours.

Click **reset** (bottom of the page) to log back out.

**The fix:** never build SQL by string concatenation — use parameterized queries. And never
store passwords in plain text (hash them, e.g. with bcrypt/argon2).

---

## What's the lesson?

Both demos are the same mistake wearing two costumes: **never trust input.**
A page that trusts what a user types — whether it lands in HTML or in a SQL query — hands
control to the user.

## Requirements

- Python 3 (standard library only — no `pip install` needed).
