export const webPages = [
  {
    rel: '42.2 Web Security/Authentication flaws/index.mdx',
    title: 'Authentication Flaws',
    description:
      'Design and implementation bugs that let attackers become someone else: weak credentials, broken session binding, and missing step-up.',
    body: `
**Authentication** answers who you are. Flaws here skip, replay, or confuse that check. The result is account takeover. This is not the same as authorization (what you may do once signed in). Most incidents are boring: credential stuffing, reset-token leaks, session IDs in URLs, and "login" APIs that trust a client-supplied user id.

## 1. Deep Dive and Mechanics

A solid login issues a **new session** after verifying a secret (password KDF, WebAuthn, or a one-time code) and binds that session to a random, high-entropy identifier stored in an HttpOnly Secure cookie. Flaws appear when any piece is guessable, reusable, or confused with identity.

**Common failure classes.** Predictable session IDs. Session fixation (keeping a pre-login ID). Password reset tokens in referrer logs. Missing invalidation on logout or password change. User enumeration via distinct error texts. MFA that can be skipped on an alternate path. "Login with JWT" that accepts alg=none or a public key as HMAC secret.

**Defend in layers.** Rate-limit and lock out with care (do not create an account-lock DoS). Require phishing-resistant MFA for privileged roles. Treat every alternate login (magic link, SSO callback, legacy SOAP) as a first-class auth surface.

<Callout icon="warning" title="SSO does not erase your session bugs">
If the callback creates a session without checking state/nonce, or if you mint cookies on an open redirect, the IdP cannot save you.
</Callout>

## 2. Mathematical / Theoretical Foundation

Authentication is a protocol with a freshness requirement. Tokens must be unguessable (CSPRNG, 128+ bits) and **single-purpose**. Challenge-response (WebAuthn) beats shared passwords because the secret never leaves the authenticator. Formal models (BAN-style intuition, modern Tamarin proofs) keep asking: can an attacker who controls the network and some old tokens produce a new accepted session?

<ComparisonTable
  headers={['Check', 'Good', 'Flaw']}
  rows={[
    ['Credential', 'Argon2id + MFA', 'SHA-1 password, no rate limit'],
    ['Session id', 'New 256-bit cookie', 'User id in the cookie value'],
    ['Reset', 'Short TTL, single use', 'Token in query string forever'],
    ['Step-up', 'WebAuthn for admin', 'MFA skip on mobile API'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import secrets
from hashlib import sha256

def new_session_id() -> str:
    return secrets.token_urlsafe(32)

def store_reset_token(db, user_id: str) -> str:
    raw = secrets.token_urlsafe(32)
    db.put_reset(user_id, sha256(raw.encode()).hexdigest(), ttl_s=900)
    return raw  # send via email; store only the hash
TICK3

Rotate the session id after login and after privilege step-up. Invalidate the family of sessions on password change.

## 4. Visualizations

TICK3mermaid
flowchart TD
    U[User secret] --> V[Verify KDF or WebAuthn]
    V --> Rot[Rotate session id]
    Rot --> C[HttpOnly Secure cookie]
    C --> A[Later requests]
    A --> Bind[Lookup session, check expiry and IP/UA policy]
TICK3

## 5. Interview Prep

**Q: Authentication vs authorization?**
**A:** Authn is identity. Authz is permission. Broken object-level authz often happens after a perfect login.

**Q: Why rotate the session at login?**
**A:** Stops session fixation: an attacker who planted a pre-auth cookie cannot keep that id after you authenticate.

**Q: Is JWT in localStorage fine?**
**A:** XSS can steal it. Prefer a short-lived access cookie plus a refresh story with rotation, or a BFF pattern.

## 6. Production Use Cases

- **Consumer login** with credential-stuffing defenses.
- **Workforce SSO** plus step-up for admin consoles.
- **Password reset and magic-link** pipelines treated as auth protocols.

<Callout icon="tip" title="Log auth events without logging secrets">
Record success/fail, method, and session rotation. Never record passwords, raw tokens, or full cookie headers.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Broken access control/index.mdx',
    title: 'Broken Access Control',
    description:
      'The OWASP number-one class: the server fails to enforce who may touch which object or function.',
    body: `
**Broken access control** is the most common serious web bug. The UI hides a button; the API still performs the action. A user changes an id in a request and reads someone else's record (IDOR). An anonymous caller hits an admin route that only checked a cookie's presence, not a role. Defense is **server-side enforcement on every request**, deny-by-default.

## 1. Deep Dive and Mechanics

Every request names a principal and a resource. The policy must answer: is this principal allowed this verb on this object in this tenant? Enforcement belongs in a shared layer (middleware, gateway, or capability check), not in each React view.

**Object level.** Look up the object, then check ownership or ACL. Do not trust a client-supplied owner id. **Function level.** Admin RPCs need a role or permission bit. **Tenant level.** Cross-tenant ids are a frequent SaaS fail.

**Horizontal vs vertical.** Horizontal: same role, other user's object. Vertical: lesser role reaches a privileged function.

<Callout icon="error" title="Never trust the client for authorization">
Hidden fields, disabled buttons, and JWT claims the client sends back are not enforcement. Re-load the user and policy on the server.
</Callout>

## 2. Mathematical / Theoretical Foundation

Access control models: ACL, RBAC, ABAC, ReBAC (relationship graphs). Formal safety asks whether a given state can reach an unauthorized grant (Harrison-Ruzzo-Ullman is undecidable in general). In practice you pick a model, centralize the decision, and test it with adversarial ids. Capability tokens (signed, scoped, short-lived) reduce ambient authority.

<ComparisonTable
  headers={['Pattern', 'Question', 'Typical bug']}
  rows={[
    ['RBAC', 'Does this role include the verb?', 'Role in an unsigned cookie'],
    ['ABAC', 'Do attributes satisfy the rule?', 'Attribute supplied by client'],
    ['ReBAC', 'Is user related to object?', 'Forgot the relation check'],
    ['Capability', 'Does this token name this object?', 'Over-broad token reuse'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def get_invoice(db, principal, invoice_id: str):
    inv = db.invoices.get(invoice_id)
    if inv is None:
        raise NotFound()
    if inv.tenant_id != principal.tenant_id or not principal.can('invoice:read', inv):
        raise Forbidden()
    return inv
TICK3

Return the same 404 for "does not exist" and "exists but not yours" when enumeration is a risk.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Req[Request + session] --> Ident[Resolve principal]
    Ident --> Load[Load object]
    Load --> Pol[Policy decision]
    Pol --> Allow[200]
    Pol --> Deny[403 or 404]
TICK3

## 5. Interview Prep

**Q: What is IDOR?**
**A:** Insecure Direct Object Reference: the API accepts an object id and forgets to check the caller may access it.

**Q: Why is this OWASP number one?**
**A:** It is easy to miss on every new endpoint, automated scanners are weak at it, and impact is direct data loss.

**Q: Deny by default or allow by default?**
**A:** Deny. New routes should 403 until a test asserts the grant.

## 6. Production Use Cases

- **Multi-tenant SaaS** object APIs.
- **Admin consoles** with extra function-level checks.
- **Export and bulk** endpoints that must re-apply the same filters as the UI.

<Callout icon="tip" title="Write authorization tests with two users">
For each resource route, call it as Alice on Bob's id and expect failure. One test per handler catches most IDORs.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/CORS vulnerabilities/index.mdx',
    title: 'CORS Vulnerabilities',
    description:
      'Misconfigured Cross-Origin Resource Sharing that lets a hostile page read authenticated API responses from a victim browser.',
    body: `
**CORS** is a browser privilege the server opts into. By default, a page on evil.example cannot read the body of a response from api.yourbank.example even if the browser attached cookies. If your API reflects Access-Control-Allow-Origin: the request Origin and sets Allow-Credentials, you have given that page the keys to the user's session.

## 1. Deep Dive and Mechanics

Simple requests may be sent cross-origin (the old web). JavaScript may not read the response unless ACAO matches the requesting origin (or is a careful * without credentials). Preflight (OPTIONS) asks permission for custom headers or methods.

**Dangerous patterns.** Reflect any Origin. Allow-Origin: * plus cookies (browsers block this combo; people then "fix" it by reflecting). Trusting null. Trusting a regex that matches evilyourbank.example. CORS is not an access-control list for mobile apps or curl; those do not enforce it.

**CSRF vs CORS.** CORS mistakes leak responses. CSRF makes the browser send a state-changing request. You often need both a strict CORS allowlist and CSRF tokens.

<Callout icon="warning" title="CORS is a browser rule, not a network firewall">
A stolen cookie used from a script outside the browser ignores CORS entirely. Still enforce authz on the server.
</Callout>

## 2. Mathematical / Theoretical Foundation

The Same-Origin Policy is a tuple match (scheme, host, port). CORS is a structured exception: the server names which other tuples may read. Credentials change the algebra: * is forbidden with credentials, so implementations switch to reflection and accidentally become "any site". Treat the allowlist as an exact set, not a substring search.

<ComparisonTable
  headers={['Header combo', 'Browser effect', 'Safe?']}
  rows={[
    ['No CORS headers', 'JS cannot read cross-origin body', 'Default-safe'],
    ['ACAO * , no credentials', 'Public read', 'OK for public APIs'],
    ['Reflect Origin + credentials', 'That origin can read as the user', 'Only if allowlisted'],
    ['Allow-Origin null + creds', 'Sandbox / unique origins', 'Usually unsafe'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
ALLOWED = {'https://app.example.com', 'https://admin.example.com'}

def cors_headers(origin: str | None) -> dict:
    if origin in ALLOWED:
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
            'Vary': 'Origin',
        }
    return {}
TICK3

Use an exact set. Do not endswith or contains.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Hostile page
    participant B as Browser
    participant A as API
    P->>B: JS fetch with cookies
    B->>A: Request + Origin
    A->>B: ACAO must match allowlist
    B->>P: Body only if ACAO matches
TICK3

## 5. Interview Prep

**Q: Does CORS stop CSRF?**
**A:** No. CSRF does not need to read the response. It needs a cookie to be sent. Use SameSite and tokens.

**Q: Why Vary: Origin?**
**A:** So caches do not store one user's ACAO and serve it to another origin.

**Q: Is ACAO * fine?**
**A:** For truly public, cookie-free APIs, yes. Never combine a wildcard mindset with credentialed session APIs.

## 6. Production Use Cases

- **SPA on a different origin** than its API.
- **Partner widgets** with a tiny explicit allowlist.
- **Public JSON** APIs that opt into * without cookies.

<Callout icon="tip" title="Prefer same-site deployments">
Host the SPA and API on one registrable domain with a reverse proxy. No CORS means no CORS bugs.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/CSP/index.mdx',
    title: 'Content Security Policy (CSP)',
    description:
      'A response header that tells browsers which scripts, styles, and connections a page may use, shrinking XSS impact.',
    body: `
**Content Security Policy (CSP)** is a defense-in-depth header. It does not fix bad HTML encoding, but it can stop a stolen inline script from running, block unexpected script hosts, and restrict form targets and connections. A useful CSP is a deny-by-default allowlist plus **nonces or hashes** for the scripts you actually ship.

## 1. Deep Dive and Mechanics

The browser parses Content-Security-Policy and applies directives: default-src, script-src, style-src, img-src, connect-src, frame-ancestors, base-uri, form-action, object-src. The first matching source wins; 'none' is empty. **script-src 'nonce-...'** lets that exact script element run. 'unsafe-inline' undoes most XSS value.

**Report-Only** lets you collect violations before enforce. Start there on a legacy app, then flip to enforcing.

**Bypass reality.** JSONP, open redirects in script-src, and 'unsafe-eval' punch holes. CSP is necessary on modern apps, not sufficient.

<Callout icon="warning" title="unsafe-inline plus a rich page is a placebo">
If any script can run inline, a typical XSS gadget is enough. Use nonces or hashes and ban eval.
</Callout>

## 2. Mathematical / Theoretical Foundation

CSP is a whitelist policy language evaluated by the browser before running a resource. Nonces must be unique per response and unguessable; reuse turns them into a static allow. Hashes bind exact bytes of inline blocks. frame-ancestors replaces X-Frame-Options with a clearer embedding policy.

<ComparisonTable
  headers={['Directive', 'Job', 'Strict default']}
  rows={[
    ['script-src', 'Who may run JS', "nonce or hash, no unsafe-inline"],
    ['object-src', 'Plugins', "'none'"],
    ['base-uri', 'Stops base-tag hijack', "'self' or 'none'"],
    ['frame-ancestors', 'Who may embed you', "'none' or self"],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import secrets

def csp_header() -> tuple[str, str]:
    nonce = secrets.token_urlsafe(16)
    policy = (
        "default-src 'self'; "
        f"script-src 'nonce-{nonce}' 'strict-dynamic'; "
        "object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    )
    return nonce, policy
TICK3

Put the nonce on each script tag you emit. Do not put it on user-controlled HTML.

## 4. Visualizations

TICK3mermaid
flowchart TD
    HTML[HTML response + nonce] --> CSP[CSP header]
    CSP --> Allow[Script with matching nonce]
    CSP --> Block[Injected inline script]
    Allow --> Run[Execute]
    Block --> Stop[Blocked + report]
TICK3

## 5. Interview Prep

**Q: Does CSP replace output encoding?**
**A:** No. Encoding stops injection. CSP limits what runs if injection still happens.

**Q: What is strict-dynamic?**
**A:** Scripts trusted via nonce may load children, so you do not keep growing a host allowlist. Still requires a nonce on the root.

**Q: Why object-src none?**
**A:** Flash and plugin vectors. Easy win.

## 6. Production Use Cases

- **First-party SPAs** with nonce-based script loading.
- **Marketing sites** that slowly kill inline analytics tags.
- **Admin consoles** where XSS is catastrophic.

<Callout icon="tip" title="Ship Report-Only to a sink you actually read">
A policy nobody monitors will never become enforcing. Wire reports to your SOC or error pipeline.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/CSRF/index.mdx',
    title: 'Cross-Site Request Forgery (CSRF)',
    description:
      'Tricks a victim browser into sending an authenticated state-changing request the user did not intend.',
    body: `
**CSRF** abuses the browser's habit of attaching cookies to a request the user did not mean to make. A hostile page can trigger a POST to your origin. If session cookies are enough to change email or transfer funds, the action runs as the victim. Defense is a **secret the hostile page cannot read**: a synchronizer token, or SameSite cookies plus careful method use.

## 1. Deep Dive and Mechanics

Conditions: a session cookie (or other ambient credential) is sent cross-site; the request changes state; there is no unguessable request token. GET that mutates state makes CSRF trivial via images and prefetch. JSON APIs with custom headers often require a preflight, which helps, but cookie-authenticated form posts do not.

**Synchronizer token.** Server stores a random value in the session, embeds it in forms, and rejects POSTs that omit it. **Double-submit** cookies are weaker if you lack SameSite and prefix cookies. **SameSite=Lax/Strict** stops many cross-site cookie sends; still use tokens for sensitive actions and for older browsers you claim to support.

<Callout icon="info" title="CORS will not save you from CSRF">
CSRF does not need to read the response. It only needs the side effect. Tokens and SameSite do the work.
</Callout>

## 2. Mathematical / Theoretical Foundation

CSRF is a confused-deputy problem: the browser is the deputy with the user's cookie jar. A capability (the CSRF token) should be unguessable and bound to the session. SameSite changes the cookie-sending rule from "every request to this host" to "same-site requests", which shrinks the deputy's automatic authority.

<ComparisonTable
  headers={['Defense', 'Stops classic form CSRF', 'Notes']}
  rows={[
    ['Synchronizer token', 'Yes', 'Best for cookie sessions'],
    ['SameSite=Lax', 'Most GET/POST from other sites', 'Not enough alone for all cases'],
    ['SameSite=Strict', 'Stronger', 'Breaks some inbound links'],
    ['Origin / Referer check', 'Helps', 'Combine, do not rely alone'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import secrets

def issue_csrf(session: dict) -> str:
    token = secrets.token_urlsafe(32)
    session['csrf'] = token
    return token

def require_csrf(session: dict, posted: str) -> None:
    if not posted or posted != session.get('csrf'):
        raise Forbidden('csrf')
TICK3

Embed the token as a hidden field or a custom header your own JS reads from a cookie that is not the session cookie.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant H as Hostile page
    participant B as Browser
    participant A as App
    H->>B: Auto POST to app origin
    B->>A: Cookies attached
    A->>A: CSRF token missing or wrong
    A->>B: 403
TICK3

## 5. Interview Prep

**Q: Why are GET mutations dangerous?**
**A:** Images, prefetch, and link prefetch become write operations. Use GET for reads only.

**Q: Does JWT in a header need CSRF tokens?**
**A:** If the browser does not auto-attach the JWT, CSRF is largely gone. If you put the JWT in a cookie, you are back in cookie-CSRF land.

**Q: SameSite=Lax vs Strict?**
**A:** Lax sends cookies on top-level GETs. Strict does not send them on any cross-site request, including clicks from email.

## 6. Production Use Cases

- **Cookie-session web apps** with forms.
- **Banking and settings** POSTs with extra re-auth.
- **Legacy** apps getting SameSite plus tokens as a retrofit.

<Callout icon="tip" title="Change-email and payout routes need step-up">
CSRF tokens stop forged clicks. They do not stop a stolen session. Re-auth for irreversible actions.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Clickjacking/index.mdx',
    title: 'Clickjacking',
    description:
      'UI redressing that overlays or iframes a real site so the victim clicks an action they cannot see.',
    body: `
**Clickjacking** (UI redressing) places your authenticated page under a transparent iframe or next to a fake button so the user's click lands on "Transfer" or "Allow camera". The request is first-party and has a real CSRF token. Token defenses do not help. You must **stop other sites from embedding you**, or use Permissions-Policy and explicit user gestures for dangerous APIs.

## 1. Deep Dive and Mechanics

Classic attack: attacker page iframes https://app.example/settings, styles the iframe as opacity 0, and positions it under a decoy. The victim is logged into app.example. Defense: **Content-Security-Policy frame-ancestors 'none'** (or a tiny allowlist). **X-Frame-Options: DENY** is the older equivalent.

**When you must embed yourself.** Use frame-ancestors with exact origins for your help-center or partner console. Avoid * and avoid reflecting arbitrary parents.

**Not only frames.** Overlaps, pointer-events, and picture-in-picture tricks exist. Sensitive actions should require a typed confirmation or WebAuthn, not a single unmarked click.

<Callout icon="info" title="X-Frame-Options vs frame-ancestors">
If both are present, CSP frame-ancestors wins in modern browsers. Set both during migration.
</Callout>

## 2. Mathematical / Theoretical Foundation

Clickjacking is a composition problem: the OS and browser compose pixels from multiple origins, but the user mentally attributes the click to the top origin. Framing policies restore a 1:1 origin-to-pixel relationship for your document. They do not fix social engineering on your own origin.

<ComparisonTable
  headers={['Control', 'Effect', 'Use']}
  rows={[
    ["frame-ancestors 'none'", 'Nobody embeds you', 'Most apps'],
    ["frame-ancestors self", 'Only same origin', 'Your own frames'],
    ['X-Frame-Options DENY', 'Legacy deny', 'Old browsers'],
    ['Require re-auth', 'Click is not enough', 'Money / OAuth grant'],
  ]}
/>

## 3. Real-World Implementation

TICK3http
Content-Security-Policy: frame-ancestors 'none';
X-Frame-Options: DENY
TICK3

Add a tiny framebusting script only as a last resort for ancient browsers; headers are the real control.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Att[Attacker page] --> Iframe[Transparent iframe of victim app]
    User[User click] --> Iframe
    Iframe --> Action[Unintended authenticated action]
    Header[frame-ancestors none] --> Block[Browser refuses to embed]
TICK3

## 5. Interview Prep

**Q: Why don't CSRF tokens stop clickjacking?**
**A:** The click is real and same-site. Tokens are present and valid. The user was misled about what they clicked.

**Q: When is embedding legitimate?**
**A:** Payment widgets, SSO, and design systems. Name those parents in frame-ancestors, never the open web.

**Q: What about your site embedding untrusted third parties?**
**A:** That is the inverse problem (clickjacking them, or being framed by their XSS). Use sandbox iframes and tight CSP.

## 6. Production Use Cases

- **Banking and admin** consoles that must never be framed.
- **OAuth consent** screens.
- **Embedded support** widgets with an explicit ancestor allowlist.

<Callout icon="tip" title="Test with a local HTML file that iframes prod">
If the iframe loads, your headers are wrong. This is a one-minute regression test.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Command injection/index.mdx',
    title: 'Command Injection',
    description:
      'Untrusted input reaching a shell or process launcher so the operating system runs attacker-controlled commands.',
    body: `
**Command injection** happens when an application builds an OS command with string concatenation and a shell. The process launcher then interprets metacharacters as syntax, not data. The fix is structural: **do not invoke a shell**, pass arguments as an array, and prefer a library that does the job without exec.

## 1. Deep Dive and Mechanics

Dangerous pattern: interpolating user input into a string passed to a shell. Safe pattern: TICK1subprocess.run(["convert", src, dest], check=True)TICK1 with a fixed executable and an argument list. The OS then cannot treat argument bytes as shell syntax.

**If you must call a binary.** Allowlist the executable path. Allowlist flags. Validate that file operands resolve inside an intended directory (see directory traversal). Drop privileges. Set timeouts. Never pass raw user strings as the command name.

**Language-specific traps.** eval, Template(user).substitute into a shell, SQL drivers that are not the issue here, and "helper" wrappers that still call sh -c.

<Callout icon="error" title="Escaping for the shell is a last resort">
Every engine has a different metacharacter set. Argument arrays plus no-shell is the reliable fix.
</Callout>

## 2. Mathematical / Theoretical Foundation

A shell is a language. Concatenation mixes program and data in one string, which is the same confusion as SQL injection. The secure API is a **separate channel** for argv. Capability reduction (seccomp, containers, least-privilege users) bounds leftover risk if a binary itself is buggy.

<ComparisonTable
  headers={['Approach', 'Shell', 'Safe for untrusted args']}
  rows={[
    ['String + shell=True', 'Yes', 'No'],
    ['argv list, no shell', 'No', 'Usually yes'],
    ['Native library', 'No', 'Best'],
    ['Manual escape', 'Yes', 'Fragile'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import subprocess
from pathlib import Path

def thumbnail(src: Path, dest: Path) -> None:
    if not src.resolve().is_relative_to(Path('/data/uploads').resolve()):
        raise ValueError('path')
    subprocess.run(
        ['/usr/bin/convert', str(src), '-thumbnail', '128x128', str(dest)],
        check=True,
        timeout=10,
    )
TICK3

No user-controlled flags. No shell.

## 4. Visualizations

TICK3mermaid
flowchart LR
    In[User input] --> Bad[String built for a shell]
    Bad --> Shell[Shell parses syntax]
    In --> Good[argv array, shell off]
    Good --> Exec[execve fixed binary]
TICK3

## 5. Interview Prep

**Q: SQL injection vs command injection?**
**A:** Same class: mixing data into a language. Different sink (database vs OS). Same cure: parameterized APIs.

**Q: Is subprocess with a list always safe?**
**A:** Safer. The binary can still be abused if it interprets flags or writes arbitrary paths. Allowlist and path checks remain.

**Q: When is a shell required?**
**A:** Almost never in a web request path. If operators need pipelines, give them a reviewed job runner, not a web param.

## 6. Production Use Cases

- **Image and document** processors.
- **Legacy admin** "ping this host" tools that should die.
- **CI plugins** that wrap CLIs.

<Callout icon="tip" title="Delete the feature if a library exists">
An image resize package beats convert plus twenty years of argv bugs.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Directory traversal/index.mdx',
    title: 'Directory Traversal',
    description:
      'Untrusted path fragments that escape an intended directory and read or write files elsewhere on the host.',
    body: `
**Directory traversal** (path traversal) occurs when you join a user-supplied filename onto a base directory and the result walks upward with TICK1..TICK1 segments or absolute paths. The user then reads TICK1/etc/passwdTICK1-class files or overwrites config. The fix is to **resolve the path, then check it still lives under the root**.

## 1. Deep Dive and Mechanics

Unsafe: TICK1root / request.args['file']TICK1 then open. Safe: resolve symlinks, then TICK1resolved.is_relative_to(root)TICK1. Reject absolute inputs. Do not strip TICK1..TICK1 with regex; encodings and double-dots will win.

**Download and upload both matter.** Traversal on upload overwrites. Traversal on download leaks. Archives (zip slip) are the same bug inside a zip: entries with TICK1..TICK1 must be checked the same way.

**Object storage** is not immune if you treat keys as paths on a local cache.

<Callout icon="warning" title="Canonicalize then allowlist">
String prefix checks fail on TICK1/var/www-backupTICK1 versus TICK1/var/wwwTICK1. Use resolved relative-to, not startswith.
</Callout>

## 2. Mathematical / Theoretical Foundation

A filesystem path is not a string; it is a walk on a DAG with TICK1.TICK1, TICK1..TICK1, and symlinks. Security is a **containment predicate** after normalization: the resolved inode path must be a descendant of the jail root. Unicode, null bytes, and overlong UTF-8 are historical bypasses; use the language's path library, not homemade parsers.

<ComparisonTable
  headers={['Check', 'Works', 'Fails on']}
  rows={[
    ['Ban .. in the string', 'Sometimes', 'Encodings, nested zips'],
    ['startswith base', 'Sometimes', 'base-extra names, no resolve'],
    ['resolve + is_relative_to', 'Yes', 'TOCTOU if you later follow a new symlink'],
    ['Random object ids, no user paths', 'Best', 'If you still need filenames, map in a DB'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from pathlib import Path

ROOT = Path('/var/app/uploads').resolve()

def open_upload(name: str):
    candidate = (ROOT / name).resolve()
    if not candidate.is_relative_to(ROOT):
        raise ValueError('path')
    return candidate.open('rb')
TICK3

Prefer storing files under random ids and keeping the display name in the database.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Base[Jail root] --> Join[Join user fragment]
    Join --> Res[Resolve symlinks]
    Res --> Ok[Inside root: open]
    Res --> Bad[Outside root: reject]
TICK3

## 5. Interview Prep

**Q: What is zip slip?**
**A:** Archive entries that unpack to parent directories. Apply the same resolve-and-contain check per entry.

**Q: Why not only reject dots?**
**A:** Absolute paths, symlink hops, and encodings bypass naive filters. Normalization is the invariant.

**Q: Does a CDN path parameter need this?**
**A:** If it maps to a filesystem or to an origin URL you fetch, yes. Treat it as untrusted.

## 6. Production Use Cases

- **User file download** endpoints.
- **Template or plugin** loaders.
- **Backup extract** jobs.

<Callout icon="tip" title="Give files random names on disk">
If the URL only has an opaque id, traversal strings have nowhere to go.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Insecure deserialization/index.mdx',
    title: 'Insecure Deserialization',
    description:
      'Turning untrusted bytes into live objects so attacker-controlled types or gadgets run during load.',
    body: `
**Insecure deserialization** is reconstructing objects from bytes you did not sign and trusting the result. Some formats can name classes to instantiate. During load, constructors and magic methods run. That is a remote code-execution class in several ecosystems. The safe default is **dumb data formats plus a schema**, or signed tokens you verify before parse.

## 1. Deep Dive and Mechanics

JSON with a schema is data. Language-native pickles, Java serialization, .NET BinaryFormatter, PHP unserialize, and YAML load (not safe_load) can become code. The attacker does not need a "payload tutorial" from you: they need you to stop calling those APIs on untrusted input.

**What to do.** Prefer JSON, protobuf, or CBOR with explicit types you allocate. If you must persist objects, encrypt-and-MAC them with a server key and a version field. Java and .NET teams should use serialization filters / allowlists if a legacy protocol cannot die yet.

**JWT and cookies.** Deserialize only after signature verify. Do not parse then verify.

<Callout icon="error" title="Never pickle untrusted data">
Python pickle is a bytecode loader. The same spirit applies to other native serializers. Delete the endpoint or switch to JSON.
</Callout>

## 2. Mathematical / Theoretical Foundation

A serializer is a programming language if it can name methods. Safe decoders implement a **total function from bytes to a closed value type**. Object graphs with dynamic dispatch are not that function. Signing (HMAC or public-key) reduces the source of bytes to "us", which is necessary but not sufficient if your own writer can be tricked to emit hostile graphs.

<ComparisonTable
  headers={['Format', 'Code during load', 'Untrusted data']}
  rows={[
    ['JSON + schema', 'No', 'OK'],
    ['protobuf', 'No', 'OK'],
    ['pickle / BinaryFormatter', 'Yes', 'Never'],
    ['YAML safe_load', 'No', 'OK if you stay on safe_load'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import json
from pydantic import BaseModel, ValidationError

class Settings(BaseModel):
    theme: str
    page_size: int

def load_settings(raw: bytes) -> Settings:
    return Settings.model_validate(json.loads(raw))
TICK3

Reject unknown fields if your threat model includes smuggling.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Bytes[Untrusted bytes] --> Native[Native deserialize]
    Native --> Gadget[Constructor / magic]
    Bytes --> Schema[JSON + schema]
    Schema --> Values[Plain values]
TICK3

## 5. Interview Prep

**Q: Why is JSON usually safer?**
**A:** It describes numbers, strings, arrays, and objects — not class names and method calls.

**Q: Is a signed pickle safe?**
**A:** Safer against network attackers, still unsafe if any writer is compromised or confused. Prefer not to pickle.

**Q: How do you migrate a Java app?**
**A:** Enable serialization filters, stop exposing endpoints, move to JSON, monitor.

## 6. Production Use Cases

- **Session stores** that used to pickle user objects.
- **Job queues** with typed protobuf messages.
- **Legacy RMI / Java** services in retirement.

<Callout icon="tip" title="Treat deserialize as an interpreter">
If the API docs mention "object graph" or "class name", it is not a data parser.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/OWASP Top 10/index.mdx',
    title: 'OWASP Top 10',
    description:
      'A consensus risk list of the most critical web application security classes, used as a training and coverage map — not a complete standard.',
    body: `
The **OWASP Top 10** is a periodically updated list of the most important web risk categories. The 2021 edition leads with **Broken Access Control**, then crypto failures, injection, insecure design, misconfiguration, vulnerable components, identification failures, software and data integrity, logging failures, and SSRF. Use it as a **coverage checklist**, not as the only thing you test.

## 1. Deep Dive and Mechanics

OWASP aggregates CVE data, survey input, and incident themes. Each item is a **class**, not a single CVE. Injection covers SQL, command, and template injection. Cryptographic failures cover TLS, hashing, and random numbers. Insecure design covers missing threat models, not just missing patches.

**How teams use it.** Map each product surface to the ten. Require at least one automated and one manual control per class. Pair with ASVS or a threat model for depth. Do not write "we are OWASP Top 10 compliant" as if it were ISO 27001.

**2021 shifts.** Access control rose to #1. SSRF became its own item. XSS folded into injection. Integrity (CI/CD, unsigned updates) arrived as its own theme.

<Callout icon="info" title="Top 10 is not a pentest scope">
A real review still includes business-logic abuse, race conditions, and your specific protocols. The list is the floor.
</Callout>

## 2. Mathematical / Theoretical Foundation

The Top 10 is a risk ranking: roughly frequency times impact, filtered by what the community can measure. It is not a formal taxonomy (CWE is closer). Treat it as a prior over where to spend verification effort. Coverage metrics (percent of routes with authz tests) beat "we trained on the slide deck".

<ComparisonTable
  headers={['2021 item', 'Example control', 'Common miss']}
  rows={[
    ['A01 Access control', 'Server-side policy tests', 'UI-only hiding'],
    ['A02 Crypto', 'TLS 1.3 + Argon2id', 'Home-rolled tokens'],
    ['A03 Injection', 'Parameterized APIs', 'String-built SQL'],
    ['A10 SSRF', 'Egress allowlist', 'Open URL fetch'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Tiny mapping used in a security review checklist
CONTROLS = {
    'A01': 'authz tests for every object route',
    'A02': 'TLS min version + KMS envelopes',
    'A03': 'no string-built SQL or shell',
    'A07': 'session rotation + MFA for admin',
}
TICK3

Turn each line into a CI check or a quarterly audit question with an owner.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Data[CVE + survey] --> Rank[OWASP ranking]
    Rank --> Train[Training]
    Rank --> Tests[Test coverage map]
    Tests --> ASVS[Deeper ASVS / threat model]
TICK3

## 5. Interview Prep

**Q: Why is access control number one?**
**A:** High incidence, high impact, weak automation. Almost every new endpoint can get it wrong.

**Q: Top 10 vs SANS Top 25 vs CWE?**
**A:** Top 10 is outreach and coverage. CWE is the dictionary. SANS Top 25 is weakness types often seen in code.

**Q: Does passing a scanner mean you passed the Top 10?**
**A:** No. Scanners miss design and access control. You need tests and review.

## 6. Production Use Cases

- **Onboarding** engineers to AppSec.
- **Vendor questionnaires** as a shared vocabulary.
- **Quarterly** gap analysis against your actual bugs.

<Callout icon="tip" title="Track your own top 10">
Your last two years of tickets beat a global list. Use OWASP to notice blind spots, then prioritize local data.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/SQL injection/index.mdx',
    title: 'SQL Injection',
    description:
      'Untrusted input concatenated into SQL so the database parses it as syntax instead of a literal value.',
    body: `
**SQL injection** is the database instance of mixing code and data. If a query string is built with concatenation, input can change the statement's structure. The reliable fix is **parameterized queries** (prepared statements): the SQL text is constant; values travel out of band. Query builders and ORMs are safe only when you stay on the parameter APIs and never interpolate raw fragments.

## 1. Deep Dive and Mechanics

The database engine parses SQL first, then binds parameters as typed literals. That split is the entire defense. Escaping quotes by hand fails on encodings, numeric contexts, and second-order storage. Dynamic identifiers (ORDER BY column names) cannot be bound as values; use an **allowlist** of column names, never the raw string.

**Stored procedures** are not automatically safe if they concatenate inside the procedure. **Least privilege** DB roles limit damage if a bug remains.

<Callout icon="error" title="String-built SQL is the bug">
If you can print the final query with user bytes inside it, you are one mistake away from injection. Keep the text static.
</Callout>

## 2. Mathematical / Theoretical Foundation

SQL is a language with a grammar. Concatenation is context-free mixing of nonterminals. Parameterization restores a **homomorphism**: values cannot jump to operator or identifier tokens. Formal work on "language-theoretic security" (Brumley, Su, etc.) is this idea generalized. Allowlists for identifiers are finite sets; that is the only sound approach when the grammar position is an identifier.

<ComparisonTable
  headers={['API', 'SQL text', 'Safe']}
  rows={[
    ['Concatenated string', 'Varies with input', 'No'],
    ['Prepared statement', 'Constant', 'Yes for values'],
    ['ORM filter API', 'Constant', 'Yes if no raw()'],
    ['Allowlisted identifier', 'Chosen from a set', 'Yes'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def find_user(db, email: str):
    return db.execute(
        'SELECT id, email FROM users WHERE email = %s',
        (email,),
    ).fetchone()

SORTABLE = {'created_at', 'email'}

def list_users(db, sort: str):
    col = sort if sort in SORTABLE else 'created_at'
    return db.execute(f'SELECT id, email FROM users ORDER BY {col}').fetchall()
TICK3

The ORDER BY fragment is interpolated only after an allowlist hit. Values stay parameterized.

## 4. Visualizations

TICK3mermaid
flowchart LR
    SQL[Static SQL text] --> Eng[Database engine]
    Val[Bound values] --> Eng
    Eng --> Plan[Parse then substitute literals]
    Bad[Concatenated string] --> Parse[Parser sees extra syntax]
TICK3

## 5. Interview Prep

**Q: Why is escaping not enough?**
**A:** Different contexts (string, number, identifier, LIKE) need different rules, and drivers already implement the correct one via binds.

**Q: Does an ORM make injection impossible?**
**A:** No. Raw fragments, format strings, and extra() calls reintroduce it.

**Q: What is second-order SQLi?**
**A:** Malicious data stored earlier and later concatenated when some other feature uses it. Parameterize every query, not only login.

## 6. Production Use Cases

- **Every application SQL** path, including reports and migrations that take input.
- **Search** features that used to build WHERE clauses.
- **Multi-tenant** filters that must stay parameterized.

<Callout icon="tip" title="Lint for string-built queries">
A CI rule that bans interpolate-into-execute catches regressions faster than yearly pentests.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/SSRF/index.mdx',
    title: 'Server-Side Request Forgery (SSRF)',
    description:
      'The server fetches a caller-supplied URL and reaches internal hosts, metadata APIs, or unexpected schemes.',
    body: `
**SSRF** is your server acting as a proxy because a feature takes a URL (preview, webhook test, import-from-link) and fetches it. The caller then aims that fetch at 169.254.169.254, localhost admin ports, or file URLs. Cloud metadata credentials are a frequent prize. Defense is **deny by default**: allowlist schemes and hosts, block link-local and private ranges after DNS resolve, and do not follow redirects off the allowlist.

## 1. Deep Dive and Mechanics

Unsafe: TICK1requests.get(user_url)TICK1. Safer: parse the URL, require https, resolve DNS yourself, check every A/AAAA against a deny list of private, loopback, link-local, and named metadata ranges, then connect to that IP with redirects disabled or re-validated.

**Blind SSRF** still matters: timing and error differences can map an internal network. **Protocol smuggling** (gopher, dict, file) is why scheme allowlists exist.

**Product design.** Prefer that the user upload a file rather than give you a URL. For webhooks, have the customer register a host you verify out of band.

<Callout icon="error" title="DNS rebinding beats a check-then-connect">
Resolve, check, then connect to the same IP you checked. Do not let the HTTP client resolve again. Re-check after every redirect.
</Callout>

## 2. Mathematical / Theoretical Foundation

SSRF is a confused deputy with network reachability. The deputy (your app) has a more powerful view of the network than the caller. Controls are a **policy on destinations** (allowlist) plus **identity isolation** (IMDSv2 hop limit, no cloud creds on the fetcher role). Formalize destinations as a set of (scheme, resolved IP, port) tuples; membership tests must happen on the resolved tuple, not the hostname string.

<ComparisonTable
  headers={['Control', 'Stops', 'Misses']}
  rows={[
    ['Scheme allowlist https', 'file and gopher', 'https to metadata'],
    ['Private-IP deny after resolve', 'Naive localhost', 'Open redirect to public then back'],
    ['Host allowlist', 'Most SSRF', 'Forgotten subdomain'],
    ['No user URLs', 'The class', 'If product insists on URLs'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from ipaddress import ip_address
from urllib.parse import urlparse

BLOCKED = {'127.0.0.1', '169.254.169.254', '::1'}

def assert_public_https(url: str, resolved_ip: str) -> None:
    p = urlparse(url)
    if p.scheme != 'https' or not p.hostname:
        raise ValueError('url')
    ip = ip_address(resolved_ip)
    if ip.is_private or ip.is_loopback or ip.is_link_local or resolved_ip in BLOCKED:
        raise ValueError('dest')
TICK3

Pin the socket to TICK1resolved_ipTICK1 and set the Host header to the original hostname if you still need TLS SNI.

## 4. Visualizations

TICK3mermaid
flowchart TD
    U[User URL] --> Parse[Parse scheme and host]
    Parse --> DNS[Resolve]
    DNS --> Pol[Allowlist / deny private]
    Pol --> Fetch[Fetch pinned IP]
    Pol --> Reject[Reject]
TICK3

## 5. Interview Prep

**Q: Why is cloud metadata special?**
**A:** Link-local services hand out temporary credentials to whatever can reach them. IMDSv2 and hop limits reduce that, but the fetcher should not run with those creds at all if possible.

**Q: Allowlist vs denylist?**
**A:** Allowlist of hosts you intend to fetch. Denylists miss IPv6, new ranges, and redirect tricks.

**Q: Does a WAF replace SSRF controls?**
**A:** It may catch obvious IPs in parameters. It will not understand your redirector. Fix the fetcher.

## 6. Production Use Cases

- **Link unfurl and screenshot** workers in an isolated egress VPC.
- **Webhook delivery** testers.
- **Document import** from customer URLs.

<Callout icon="tip" title="Put URL fetchers in their own role and subnet">
No cloud metadata, no RFC1918 routes, dedicated DNS. Even a missed check then hits a wall.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Security headers/index.mdx',
    title: 'Security Headers',
    description:
      'HTTP response headers that steer browser security behavior: HTTPS, framing, referrers, content types, and CSP.',
    body: `
**Security headers** are cheap, declarative controls the browser enforces. They do not replace authz or encoding, but they close entire bug classes (clickjacking, MIME sniffing) and make XSS and cookie theft harder. Set them on every HTML response from a shared middleware, then test with a header scanner and a real browser.

## 1. Deep Dive and Mechanics

Core set: **Strict-Transport-Security** (HSTS) so the browser refuses HTTP after the first HTTPS hit. **Content-Security-Policy** for script control. **frame-ancestors** or X-Frame-Options against framing. **X-Content-Type-Options: nosniff**. **Referrer-Policy**. **Permissions-Policy** to turn off camera, geolocation, and payment APIs you do not use. **Cross-Origin-Opener-Policy** and **Cross-Origin-Resource-Policy** for isolation.

**Cookies are headers too.** Secure, HttpOnly, SameSite, and the __Host- prefix belong in the same review.

<Callout icon="info" title="HSTS has a long memory">
A max-age of months plus includeSubDomains can lock a broken subdomain out of HTTP forever. Roll out on the apex with care, then raise max-age.
</Callout>

## 2. Mathematical / Theoretical Foundation

Headers are a policy language evaluated by the user agent. They change the default ambient authority of a page (who can frame it, what it can load, whether HTTP is allowed). They cannot constrain curl, mobile apps, or a compromised origin. Think of them as shrinking the browser's confused-deputy surface.

<ComparisonTable
  headers={['Header', 'Job', 'Typical value']}
  rows={[
    ['Strict-Transport-Security', 'Force HTTPS', 'max-age=31536000; includeSubDomains'],
    ['Content-Security-Policy', 'Constrain resources', 'nonce-based, object-src none'],
    ['X-Content-Type-Options', 'No MIME sniff', 'nosniff'],
    ['Referrer-Policy', 'Limit URL leaks', 'strict-origin-when-cross-origin'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
SECURITY_HEADERS = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
}
TICK3

Add CSP per-route if nonces differ. Do not attach HSTS on a plaintext HTTP response you still need for the redirect.

## 4. Visualizations

TICK3mermaid
flowchart LR
    App[App response] --> MW[Header middleware]
    MW --> Br[Browser policy engine]
    Br --> HSTS[Upgrade to HTTPS]
    Br --> Frame[Block unexpected frames]
    Br --> Script[Apply CSP]
TICK3

## 5. Interview Prep

**Q: HSTS vs a 301 to HTTPS?**
**A:** A 301 still allows a first HTTP hit and SSL-strip. HSTS makes later visits HTTPS-only. preload lists go further.

**Q: Why nosniff?**
**A:** Browsers used to guess content types and might execute a user-uploaded file as script.

**Q: Are security headers enough for XSS?**
**A:** No. They reduce impact. Encoding and safe frameworks remain required.

## 6. Production Use Cases

- **Every public HTML** app.
- **API error pages** that still render HTML.
- **Admin** hosts with extra-strict CSP and COOP.

<Callout icon="tip" title="Fail CI if a baseline header disappears">
A one-line middleware regression should page you before a scanner customer does.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/Session hijacking/index.mdx',
    title: 'Session Hijacking',
    description:
      'Stealing or predicting a session identifier so the attacker inherits an authenticated browser session.',
    body: `
**Session hijacking** is using someone else's session id as your own. The id might leak from a URL, a log, XSS reading a non-HttpOnly cookie, a MITM on HTTP, or a predictable generator. Defense is **unguessable ids, TLS everywhere, cookie flags, rotation, and binding**.

## 1. Deep Dive and Mechanics

Issue 128+ bits from a CSPRNG. Put the id in a **Secure; HttpOnly; SameSite** cookie, preferably with the __Host- prefix. Never put it in a query string (Referer leaks). Rotate on login, privilege change, and periodically. Invalidate on logout and password change — including other devices if the user asks.

**Detection.** Sudden ASN or country change can trigger step-up, not a silent lockout that creates support DoS. Store a hash of the session id at rest so a stolen DB of sessions is not immediately usable if you also HMAC with a server secret.

<Callout icon="warning" title="XSS plus a readable session cookie is game over">
HttpOnly stops trivial JS reads. It does not stop the script from acting as the user on your origin. Fix XSS too.
</Callout>

## 2. Mathematical / Theoretical Foundation

A session id is a bearer capability. Security is entropy plus confidentiality of the channel plus **narrowing** (SameSite, binding, short TTL). Prediction attacks are just low-entropy generators (incrementing ints, time-only seeds). Fixing the generator is information-theoretic: the attacker should need 2^128 guesses, which is not online-feasible.

<ComparisonTable
  headers={['Leak path', 'Mitigation']}
  rows={[
    ['HTTP cookie', 'HTTPS + HSTS + Secure flag'],
    ['XSS reads document.cookie', 'HttpOnly + CSP + encoding'],
    ['URL / Referer', 'Never put ids in query strings'],
    ['Shared computer', 'Short TTL, logout, no persist on kiosks'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import secrets

def issue_session(resp, store):
    sid = secrets.token_urlsafe(32)
    store.save(sid)
    resp.set_cookie(
        '__Host-sid',
        sid,
        secure=True,
        httponly=True,
        samesite='Lax',
        path='/',
    )
TICK3

__Host- requires Secure, no Domain attribute, and Path=/.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Login[Login] --> New[New random sid]
    New --> Cookie[Secure HttpOnly cookie]
    Cookie --> Use[Authenticated requests]
    Use --> Rot[Rotate on step-up]
    Leak[sid leak] --> Hijack[Attacker replay]
    TLS[TLS + flags] --> Block[Harder leak]
TICK3

## 5. Interview Prep

**Q: Session fixation vs hijacking?**
**A:** Fixation plants an id before login. Hijacking steals a live id. Rotate-at-login kills fixation; TLS and HttpOnly shrink hijacking.

**Q: Should you bind sessions to IP?**
**A:** Optional signal. Mobile IPs change. Use it for step-up, not hard fail, unless you have a static workforce.

**Q: Server-side session vs JWT?**
**A:** Server sessions revoke instantly. JWTs need short TTL or a blocklist to revoke. Hijacking math is similar if the token is a bearer.

## 6. Production Use Cases

- **Cookie sessions** for web apps.
- **Admin consoles** with 15-minute idle timeout and device lists.
- **Shared-device** modes that skip "remember me".

<Callout icon="tip" title="Offer a session list in account settings">
Users who can revoke other devices close hijacks you will never see in logs in time.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/XSS (Stored, Reflected, DOM-based)/index.mdx',
    title: 'Cross-Site Scripting (XSS)',
    description:
      'Untrusted data treated as HTML or JS so a victim browser runs attacker-controlled script in your origin.',
    body: `
**XSS** is injecting script into a page that other users (or you) load. The browser then trusts that script as your origin: it can act as the user, read non-HttpOnly storage, and rewrite the DOM. There are three delivery styles — **stored**, **reflected**, **DOM-based** — and one family of fixes: **encode for the context, use safe APIs, and add CSP**.

## 1. Deep Dive and Mechanics

**Stored:** hostile data saved (comment, name) and later rendered. **Reflected:** data from the request bounced into HTML. **DOM-based:** your JavaScript takes a value from location or the DOM and assigns it to a sink such as innerHTML.

**Context is everything.** HTML body, HTML attribute, JS string, URL, and CSS each need a different encoder. Frameworks (React text children, auto-escaping templates) close the common sinks if you do not bypass them with dangerouslySetInnerHTML or raw filters.

**Sanitize HTML** only with a maintained library when you truly need rich text. Do not regex-strip tags.

<Callout icon="error" title="Do not write demo attack strings into docs or tests you copy around">
Test with inert markers and framework unit tests that assert encoding. You do not need a live payload to prove a sink is closed.
</Callout>

## 2. Mathematical / Theoretical Foundation

The browser parses a grammar. XSS is a grammar confusion: data crosses into script or markup nonterminals. Contextual encoding is a **homomorphism into the correct terminal alphabet**. CSP adds a second policy (which scripts may run) so a single encoding slip is less likely to become code. Trusted Types make dangerous sinks throw unless a policy created the string.

<ComparisonTable
  headers={['Kind', 'Where data waits', 'First control']}
  rows={[
    ['Stored', 'Database', 'Encode on output'],
    ['Reflected', 'Request', 'Encode + avoid reflecting into markup'],
    ['DOM-based', 'Client JS', 'textContent, not innerHTML'],
    ['Mutated', 'Browser "helpfully" fixes HTML', 'Do not rely on filters'],
  ]}
/>

## 3. Real-World Implementation

TICK3javascript
el.textContent = userName; // safe for text
el.setAttribute('href', safeHttpUrl(userUrl)); // allowlist scheme

// React: default interpolation is text. Avoid raw HTML APIs.
TICK3

Server templates: use the engine's auto-escape and never mark user input as safe.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Data[Untrusted string] --> Enc[Context encoder]
    Enc --> Text[HTML text node]
    Data --> Sink[Raw HTML or JS sink]
    Sink --> Run[Script in your origin]
TICK3

## 5. Interview Prep

**Q: Why encode on output, not input?**
**A:** The same stored value may appear in HTML, JSON, and CSV. Input filtering loses data and misses contexts. Output encoding matches the sink.

**Q: Does CSP make XSS impossible?**
**A:** No. It raises the bar. Nonce leaks, gadget scripts, and 'unsafe-inline' still fail closed or open depending on the policy.

**Q: DOM XSS vs reflected?**
**A:** Reflected is server-rendered. DOM XSS can happen with a static HTML file if client JS copies location.hash into innerHTML.

## 6. Production Use Cases

- **Comment and profile** fields.
- **Search pages** that echo the query.
- **Markdown / WYSIWYG** with a sanitizer.

<Callout icon="tip" title="Ban innerHTML in lint for app code">
Allow it only in a sanitizer module. Most DOM XSS is one assignment.
</Callout>
`,
  },
  {
    rel: '42.2 Web Security/XXE/index.mdx',
    title: 'XML External Entity (XXE)',
    description:
      'XML parsers that expand external entities and leak files or cause the server to fetch attacker-chosen URLs.',
    body: `
**XXE** is a parser-configuration bug. XML allows entities that expand to file contents or remote URLs. If you parse untrusted XML with defaults from older libraries, those entities resolve on the server. The fix is **disable DTDs and external entities**, or stop using XML.

## 1. Deep Dive and Mechanics

A hostile document can define an entity that points at a local file or an internal URL (SSRF-by-XML). Some parsers also expand parameter entities in ways that lead to denial of service (billion laughs is a related expansion bomb).

**Safe settings.** Disable DTDs, external general entities, and external parameter entities. Do not enable XInclude unless you must, and never on untrusted docs. Prefer JSON APIs.

**Where it hides.** SAML, SOAP, office document formats, RSS importers, and "just upload this XML config" admin tools.

<Callout icon="warning" title="Default parser settings have been wrong for a decade">
If you did not explicitly harden the parser, assume it is unsafe until you prove otherwise on your library version.
</Callout>

## 2. Mathematical / Theoretical Foundation

XML is a document plus an optional DTD language that can perform substitution. Security is turning off that language. Entity expansion is also a complexity attack (exponential or quadratic blow-up). Caps on entity count and size are a resource bound, not a substitute for disabling external resolution.

<ComparisonTable
  headers={['Parser setting', 'Intent', 'Untrusted XML']}
  rows={[
    ['DTDs enabled', 'Legacy docs', 'Off'],
    ['External entities', 'Includes', 'Off'],
    ['XInclude', 'Modular XML', 'Off'],
    ['JSON instead', 'Avoid the class', 'Preferred'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from defusedxml import ElementTree

def parse_upload(raw: bytes):
    return ElementTree.fromstring(raw)
TICK3

defusedxml rejects the dangerous features. In Java, set the equivalent factory features to false and add unit tests that a DTD-bearing fixture fails closed.

## 4. Visualizations

TICK3mermaid
flowchart TD
    XML[Uploaded XML] --> Soft[Default parser]
    Soft --> Ent[Resolve external entity]
    Ent --> Leak[File or internal HTTP]
    XML --> Hard[DTD-disabled parser]
    Hard --> DOM[Safe element tree]
TICK3

## 5. Interview Prep

**Q: XXE vs SSRF?**
**A:** XXE can cause SSRF (the parser fetches a URL). SSRF is the broader class of server fetches. Fix both the parser and any explicit URL fetchers.

**Q: Is JSON immune?**
**A:** JSON has no DTD entity system. You still need schema validation. You do not need XXE hardening.

**Q: How do you test without leaking files?**
**A:** Feed a fixture with a DTD and assert the parser errors. Do not point entities at real secrets in tests.

## 6. Production Use Cases

- **Document import** (DOCX/ODF are zip+XML).
- **SAML** libraries — keep them patched and configured.
- **Legacy SOAP** that you should front with a hardened gateway.

<Callout icon="tip" title="Add a unit test that DTD parsing fails">
Configuration drifts when someone "fixes" a customer file by turning DTDs back on. The test is the lock.
</Callout>
`,
  },
]
