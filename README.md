# ShebaCare Pharma OS

A mobile-first **pharmacy management admin dashboard** for **ShebaCare Pharma** (Dhanmondi, Dhaka, Bangladesh).
Everything lives in **one self-contained `index.html`** (HTML + CSS + vanilla JS) with **zero external dependencies**, so it opens instantly on slow networks, on Android (`content://`), and on GitHub Pages.

> Language: English and বাংলা (switch from the header)
> Theme: light and dark
> Demo data: realistic Bangladeshi medicines, customers, and Taka (৳) amounts, dated 26 Nov 2026

---

## Highlights

- **5-second dashboard:** today's sales, estimated net profit, orders, refills due, pending Rx, market due, and cash-drawer health at a glance.
- **Silent profit killers covered:** net profit tracking, petty-cash expenses, customer due ledger (বাকির খাতা), chronic-patient refill reminders, generic substitute finder, dead stock, near-expiry returns, and one-tap supplier orders.
- **Easy to control:** a **Needs attention** to-do panel, **quick find** search (orders, medicines, customers, pages; press `Ctrl K` or `/`), clickable KPI cards, and a sidebar with live badges, quick actions, and a today snapshot.
- **No CDNs, no libraries:** icons are inline SVG, the chart is pure SVG, fonts use a system stack.
- **Crash-proof:** every `localStorage` call is wrapped in `try/catch`; the page never renders blank.

---

## Features

### Dashboard
- **Needs attention** panel: Rx to verify, batches expiring, refills due today, low-stock items, and market due, each one tap away from the fix
- KPI cards are clickable and jump to the related page
- KPI cards: Today's Sales (+ Est. Net Profit), Total Orders, Customers & Refills, Pending & Market Due
- Weekly performance chart (Fri to Thu) with toggles: **Sales (৳)**, **Net Profit (৳)**, **Orders**, with hover/tap tooltips
- Today's collection (Cash / bKash / Nagad), petty expenses, and **Expected Cash in Drawer**
- Near-expiry alert (under 30 days) with **Mark Return**
- Recent orders table with filters and an **Order Detail** modal (Verify Rx & Deliver, Mark Pending, Cancel), which recalculates KPIs live
- Top selling medicines (units, revenue, margin %)
- Low stock alerts with **+50 Restock** and **Generate Supplier Order** (grouped by company, copy as WhatsApp-ready text)

### Orders
Full orders manager with status filters, an **Rx Pending** queue, inline **Approve Rx**, and **+ New Order** (updates stock, KPIs, payment split, and the due ledger when paid by *Due*).

### Products & Inventory
Filters for **All / Low Stock / Near-Expiry / Dead Stock (60+ days)**, search by brand, generic, company, or batch, **Find Substitute** (same generic, in stock), **5% Clearance / Return**, and **Auto Supplier Order**.

### Customers
- **Chronic Refill Reminders:** bilingual WhatsApp message preview, `wa.me` link and copy button, marks the patient as *Reminded ✓*
- **Due Ledger (বাকির খাতা):** **Collect Due** reduces market due and adds to cash collection

### Cash & Expenses
Shift reconciliation formula (`Cash Sales + Due Collected - Petty Expenses = Expected Cash in Drawer`), daily petty-cash logger (updates drawer and net profit live), and supplier payables with **Mark Paid**.

### Settings and Profile
- Pharmacy name, address, DGDA licence, low-stock threshold, and the WhatsApp reminder template
- **My Profile** (tap the avatar): photo from Gallery or Camera, six built-in avatars, name, role, phone, email

### Navigation
- Sidebar groups (Main, Finance, System) with live count badges, **Quick actions** (New Order, Supplier Order, Shift Closing), and a **Today** snapshot (sales, cash in drawer, pending orders)
- **Quick find** in the top bar: type to jump to a page, order, medicine, or customer; `Enter` opens the first result; `Esc` closes
- Filter pills on Products and Customers show live counts
- Desktop and Android "Desktop site" mode (900px and up): permanent left sidebar
- Phones: ☰ opens a side drawer (overlay tap, item tap, swipe, or Esc closes it; swipe from the left edge opens it)
- On phones, data tables turn into stacked cards, so nothing scrolls sideways

---

## Quick start

1. Download `index.html`.
2. Open it in any modern browser (double-click, or open from your phone's file manager).

### Deploy to GitHub Pages
1. Create a repository and add `index.html` (and this README) to the root.
2. Go to **Settings > Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Your dashboard appears at `https://<username>.github.io/<repo>/`.

---

## Project structure

```
index.html   # the whole app: <style> (design system) + HTML shell + <script> (data, views, i18n)
README.md    # this file
```

Inside `index.html`:

| Section | What it holds |
|---|---|
| `:root` / `[data-theme="dark"]` | CSS variables (colours, shadows) for light and dark |
| SVG sprite | All icons as `<symbol>`, used with `<use href="#i-name">` |
| Data (`P`, `O`, `LED`, `R`, `X`, `PB`) | Medicines, orders, due ledger, refills, expenses, payables |
| State (`S`, `K`, `PAY`, `PF`) | UI state, KPI counters, payment split, profile |
| Views | `dashboard()`, `orders()`, `products()`, `customers()`, `cash()`, `settings()` |
| Modals | order detail, new order, substitutes, supplier PO, reminder, collect due, profile |
| i18n (`DICT`, `tr()`) | English to Bangla dictionary applied to the rendered page |

---

## Design system

| Token | Light | Dark |
|---|---|---|
| Primary (teal) | `#0F766E` | `#2DD4BF` |
| Page / Card | `#F1F5F9` / `#FFFFFF` | `#020617` / `#0F172A` |
| Text / Muted | `#020617` / `#475569` | `#FFFFFF` / `#CBD5E1` |
| Border | `#CBD5E1` | `#475569` |

Status colours are used **only** for badges and alerts: green (Delivered, Verified, In Stock, Paid), amber (Pending, Low, Due), rose (Cancelled, Critical, Expiring, Dead Stock).

Breakpoints: `640px` (tablet cards, 2-column KPIs), `900px` (permanent sidebar), `1100px` (4-column KPIs and side-by-side analytics).

---

## Data and persistence

Demo orders, stock, ledger, and expenses live **in memory**: they react live while the page is open and reset on reload. These are saved in the browser (`localStorage`):

| Key | Stores |
|---|---|
| `sc-dark` | Theme (`1` = dark) |
| `sc-lang` | Language (`en` or `bn`) |
| `sc-cfg` | Settings (name, address, licence, threshold, WhatsApp template) |
| `sc-prof` | Profile (name, role, phone, email, photo, avatar) |

To use real data, replace the arrays at the top of the script, or connect the view functions to your own API or database.

---

## Languages (EN | বাং)

The capsule button in the header shows only the **active** language and switches on tap; the choice is remembered. Bangla mode translates the interface (menus, cards, tables, badges, buttons, modals, notifications, toasts, chart labels). Medicine names, company names, customer names, and numbers stay in English. To change wording or add phrases, edit the `DICT` array.

---

## Customising

- **Brand colour:** change `--pri`, `--prih`, `--tint` in `:root` and `[data-theme="dark"]`.
- **Pharmacy details:** edit them in **Settings**, or change the defaults in `S.cfg`.
- **Low-stock threshold:** **Settings**, or `S.cfg.thr` (default 15).
- **Medicines, customers, orders:** edit `P`, `CU`/`O`, `LED`, `R`.
- **WhatsApp reminder text:** **Settings**, using `{name}` and `{meds}` placeholders.

---

## Known limitations

- **Profile photo upload** needs a regular browser (Chrome, Safari, Firefox). Some in-app previews do not provide a file picker; use one of the built-in avatars there.
- Data is demo-only and not synced across devices. There is no login or backend.
- Bangla mode translates the interface only, not the data.
- `wa.me` links open WhatsApp; copy-to-clipboard requires a secure context or falls back to a legacy method.

---

## Roadmap ideas

Quick billing (POS) with printable receipts, WhatsApp bill sharing, offline PWA install, daily closing report (PDF/WhatsApp), delivery rider assignment and COD tracking, bKash/Nagad TrxID matching, staff logins and sales logs, CSV import/export, supplier phone directory, and expiry-first (FEFO) selling hints.

---

## Tech

Plain HTML5, CSS custom properties, and vanilla JavaScript (ES5-style, no build step, no frameworks). Works in current Chrome, Edge, Firefox, and Safari.

© ShebaCare Pharma, Dhanmondi, Dhaka.
