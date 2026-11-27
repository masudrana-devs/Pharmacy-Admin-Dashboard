# ShebaCare Pharma OS

A mobile-first **pharmacy management admin dashboard** for **ShebaCare Pharma** (Dhanmondi, Dhaka, Bangladesh).
The app lives in **one self-contained `index.html`** (HTML + CSS + vanilla JS) with **zero external dependencies**. The optional `sw.js` adds offline reload on a hosted site.

> Language: English and বাংলা (switch from the header)
> Screen modes: Light, Dark and Eye comfort
> Demo data: realistic Bangladeshi medicines, customers, and Taka (৳) amounts, dated from the day you first open it

---

## Login, sign up and demo

The app opens on a **Log in / Sign up** page.

| Option | What happens |
|---|---|
| **Demo login** | No email or password. Opens everything with sample data, in a separate space from real accounts. Each new demo login starts fresh. A banner offers **Create account** and **Exit demo** |
| **Sign up** | Name, pharmacy name, email, password (8+ characters with a letter and a number). A **recovery code** is shown once |
| **Log in** | Email and password, with show/hide and **Keep me logged in**. Unticked, the login lasts only for that browser tab |
| **Forgot password** | Email, recovery code and a new password. No email is sent |
| **Log out** | Sidebar bottom, **Settings > Account**, or the staff lock screen |

- **There is no server.** An account exists only in the browser where it was created. It will not work on another phone or computer, and email addresses are not verified.
- **This login is not real security.** It separates and screens access in the app, but stored records are **not encrypted**, and a technical person with access to the device can read or bypass them. Protect the device itself. Real login needs a backend such as Firebase Authentication or Supabase Auth with access rules on the data.
- Passwords and recovery codes are not stored as plain text (salted PBKDF2-SHA256; a much weaker fallback is used only where the browser does not offer it, such as plain `http`).
- Each account has its own records. The **first account** created on a browser takes over any records saved there by the earlier version, so create the owner's account first.
- Without both the password and the recovery code, an account cannot be opened from the app. Keep backups.
- The customer order link opens without login.
- Staff PIN login (**Staff & Activity**) is a second, optional lock inside an account.

## Screen modes

**Light**, **Dark** and **Eye comfort** (warm paper colours with softer contrast). Choose on the login page, from the header button, or in **Settings**. The choice is remembered. Eye comfort is a colour theme, not a medical or blue-light-filter claim.

---

## What is complete and what is limited

There is **no server**. All data stays in one browser on one device.

| # | Feature | In this version |
|---|---|---|
| 1 | Barcode billing, receipt | Works: camera, USB scanner or typing. Print, or open WhatsApp with the receipt text. Camera needs `https` and permission |
| 2 | Auto reorder | Works, from the last 28 days of sales. No seasonal forecasting |
| 3 | Rx photo, repeat order | Works. Repeat loads the old items at today's prices; you confirm the sale |
| 4 | WhatsApp / SMS | **Semi-automatic.** Messages are queued and written; staff taps to send each. "Opened to send" does not prove delivery |
| 5 | MR invoice | **No built-in OCR.** Bill photo, paste text copied with Google Lens or similar (or type), check lines, then stock and payables update |
| 6 | FEFO | Works. Billing shows and deducts the earliest unexpired batch first |
| 7 | Return tracker | Works. The 30-day default window is an assumption; set each company's real one |
| 8 | Profit report | Works. Gross profit by medicine or company, before expenses |
| 9 | Discount, loyalty | Works: cards, points, role limits, staff discount log |
| 10 | Antibiotic / controlled register | Works as an **internal record**, not an official form (see below) |
| 11 | Cold chain | Manual temperature log, chart, alerts. No sensor |
| 12 | Interaction alert | Alert tool only. **Ships with no drug data** |
| 13 | Delivery, COD | Rider assignment, status, cash settlement. **No GPS or rider app** |
| 14 | Staff login | Local PIN lock, roles, activity log. **Not real security** |
| 15 | Multi-branch | Transfer record from this shop. **Branches do not sync** |
| 16 | Customer order link | Catalog link; orders come by WhatsApp and are pasted into billing. No online payment or live stock |
| 17 | PWA, CSV, backup | CSV export, medicine and customer CSV import, JSON backup and restore, offline with `sw.js` |

Real automatic SMS/WhatsApp, live multi-device use, secure login, live rider tracking and branch sync need a backend (for example Firebase or Supabase) plus the relevant messaging provider.

---

## Highlights

- **5-second dashboard:** today's sales, estimated net profit, orders, refills due, pending Rx, market due, and cash-drawer health at a glance.
- **Silent profit killers covered:** net profit tracking, petty-cash expenses, customer due ledger (বাকির খাতা), chronic-patient refill reminders, generic substitute finder, dead stock, near-expiry returns, and one-tap supplier orders.
- **Easy to control:** a **Needs attention** to-do panel, **quick find** search (orders, medicines, customers, pages; press `Ctrl K` or `/`), clickable KPI cards, and a sidebar with live badges, quick actions, and a today snapshot.
- **No CDNs, no libraries:** icons are inline SVG, the chart is pure SVG, fonts use a system stack.
- **Saved data:** sales, stock, registers and photos are kept in IndexedDB (with `localStorage` as a fallback).
- **One billing engine:** Billing, New Order and imported online orders update stock, batches, money, points and registers the same way.

---

## Features

### Dashboard
- **Needs attention** panel: Rx to verify, batches expiring, refills due today, low-stock items, and market due, each one tap away from the fix
- KPI cards are clickable and jump to the related page
- KPI cards: Today's Sales (+ Est. Net Profit), Total Orders, Customers & Refills, Pending & Market Due
- Weekly performance chart (last 7 days) with toggles: **Sales (৳)**, **Net Profit (৳)**, **Orders**, with hover/tap tooltips
- Today's collection (Cash / bKash / Nagad), petty expenses, and **Expected Cash in Drawer**
- Near-expiry alert (under 30 days) with **Mark Return**
- Recent orders table with filters and an **Order Detail** modal (Verify Rx & Deliver, Mark Pending, Cancel), which recalculates KPIs live
- Top selling medicines (units, revenue, margin %)
- Low stock alerts with **+50 Restock** and **Generate Supplier Order** (grouped by company, copy as WhatsApp-ready text)

### Orders
Full orders manager with status filters, an **Rx Pending** queue, inline **Approve Rx**, and **+ New Order** (updates stock, KPIs, payment split, and the due ledger when paid by *Due*).

### Products & Inventory
Filters for **All / Low Stock / Near-Expiry / Dead Stock (60+ days)**, search by brand, generic, company, or batch, **Find Substitute** (same generic, in stock), **5% Clearance / Return**, and **Auto Supplier Order**. Also **Add medicine / Edit** (price, cost, barcode, antibiotic or controlled flag) and a batch list with a **Sell first** mark.

### Customers
- **Chronic Refill Reminders:** bilingual WhatsApp message preview, `wa.me` link and copy button, marks the patient as *Reminded ✓*
- **Due Ledger (বাকির খাতা):** **Collect Due** reduces market due and adds to cash collection
- **All Customers:** last order, one-tap **Repeat order**, and **Add refill reminder**

### Cash & Expenses
Shift reconciliation formula (`Cash Sales + Due Collected - Petty Expenses = Expected Cash in Drawer`), daily petty-cash logger (updates drawer and net profit live), supplier payables with **Mark Paid**, and **Previous days** totals.

### Settings and Profile
- Pharmacy name, address, DGDA licence, low-stock threshold, and the WhatsApp reminder template
- **My Profile** (tap the avatar): photo from Gallery or Camera, six built-in avatars, name, role, phone, email

### New pages

**Billing (POS)**
- **Scan barcode** uses the phone's own detector where available, otherwise a built-in **EAN-13 / UPC-A** reader. USB scanners work in the search box.
- Scan an unknown code once to link it to a medicine. Many strips have no barcode; use the box code or tap the medicine.
- **Barcode labels** shows in-store demo codes (prefix `200`) for testing.
- Antibiotic sales need a prescription, customer and doctor details. Controlled medicine also needs an Rx photo and, with staff login on, a pharmacist or owner.

**Auto Reorder:** `daily sale x (days to keep + delivery days) - current stock`. Daily sale is the 28-day average.

**Purchases:** one line per medicine: `name quantity unit-cost batch expiry`, for example `Napa Extra 500mg 100 20.5 NX2601 08/28`. Only medicines already in Products are matched. Always check the lines. Cost price becomes a weighted average.

**Company Returns:** To return > Requested > Sent (leaves sellable stock) > Credit received. The credit amount is recorded on the batch; **supplier payables are not reduced automatically**.

**Messages:** order confirmations, refill reminders (due within 3 days) and due reminders.

**Drug Register:** filled from sales; cancelled sales remain as **VOID**; CSV export. Reports on the 2023 law say selling antibiotics without a registered doctor's prescription carries a Tk 20,000 fine ([UNB](https://unb.com.bd/category/Bangladesh/parliament-passes-tough-drugs-cosmetics-bill-by-voice-vote/121650), a news report on the bill, not the Act's text). No official register format was found while building this. **Confirm columns, retention and licence conditions with DGDA, and narcotic or psychotropic rules with the Department of Narcotics Control.**

**Interaction Alerts:** load only pairs a pharmacist has verified, each with its source (`generic_a,generic_b,severity,note,source`). Matching is simple text matching on generic names, against the cart and the customer's last 30 days of orders in this app. No alert never means safe.

**Cold Chain:** default range 2 to 8 C (editable). Check each product's own storage label.

**Online Order Link:** enter the shop WhatsApp number, then share the link. Names and prices are inside the link, so send a new one after changes. Controlled medicines are excluded. Check current rules on online medicine sales before public use.

**Also:** Delivery & COD, Branch Transfer, Loyalty & Discounts, Profit Report, Staff & Activity, Data & Offline.

### Changes to earlier behaviour
- Cancelling an order now reverses stock, sales, profit, payment or due, and points.
- Old orders keep the price they were sold at, even after a clearance discount.
- **+50 Restock** adds to the newest sellable batch. For a new batch, use Purchases.
- At the start of a new day, today's totals are archived (Cash > Previous days) and reset. **So demo figures such as today's sales show zero from the next day.** Use *Reset to demo data* to see them again.
- The weekly chart, top sellers and the 28-day profit history start from **demo figures** that do not reconcile with each other. Reset or replace them before real use (see below).

### Navigation
- Redesigned sidebar: **New sale** button, menu search, collapsible groups with badges, quick actions, today snapshot, user card
- Desktop (900px and up): collapse the sidebar to an icon rail
- Phones: side drawer (overlay tap, swipe, Esc) plus a bottom bar: Home, Orders, **Scan**, Stock, Menu
- **Quick find** (`Ctrl K` or `/`), clickable KPI cards, **Needs attention** tiles, live notifications
- On phones, tables turn into stacked cards

---

## Quick start

1. Download `index.html`.
2. Open it in a modern browser. The camera and app install need the hosted `https` site.

### Deploy to GitHub Pages
1. Add `index.html`, `sw.js` and this README to the repository root.
2. Go to **Settings > Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Open `https://<username>.github.io/<repo>/`. Once it has loaded, it can reload offline.
4. On Android Chrome, use **Install app** or **Add to Home screen**.

---

## Project structure

```
index.html   # the whole app
sw.js        # optional: offline cache for the hosted site
README.md    # this file
```

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

## Data, backup and privacy

| Where | Stores |
|---|---|
| IndexedDB `shebacare` (plus a suffix for later accounts and `-demo`) | Medicines, batches, orders, ledger, registers, logs, staff, other records and photos |
| `localStorage` `sc-theme`, `sc-lang`, `sc-side` | Screen mode, language, sidebar state |
| `localStorage` `sc-cfg`, `sc-prof` (suffixed per account) | Settings and profile |
| `localStorage` `sc-accounts` | Accounts (email, names, password and recovery hashes) |
| `sessionStorage` or `localStorage` `sc-session` | Who is logged in |
| `localStorage` `sc-data` | Records, only if IndexedDB is unavailable (photos are then not kept) |

- **Clearing browser data deletes everything.** Download a backup daily from **Data & Offline** and keep a copy off the device.
- Backups contain patient details and prescriptions, are **not encrypted**, and should be kept private.
- Restore keeps the current device's staff accounts and PINs.
- Only the newest open tab saves; older tabs lock to avoid overwriting data.
- Patient data in a **public** GitHub repository would be exposed. Never upload backup files there. The Pages site itself holds only the app and demo data.
- Backups hold records and photos, not login accounts.
- **Forgot PIN:** clearing the site's data removes the lock **and all records**. Keep a backup.

### Before real use
A new account (and the demo) starts with demo medicines, orders, dues, payables, sales history, fridge readings and members. There is no "start empty" button. To start clean, edit the seed data in `index.html` (`P`, `O`, `LED`, `R`, `X`, `PB`, `K`, `PAY`, `W`, and `seed()`), then use **Reset to demo data** once. Run it beside your current method and match cash and stock for a while before relying on it.

---

## Languages (EN | বাং)

The header button switches language. Bangla mode translates the interface. Medicine, company and customer names stay as entered; receipts and some pop-up messages are partly in English. To change wording, edit `DICT`.

---

## Customising

- **Brand colour:** `--pri`, `--prih`, `--tint`.
- **Pharmacy details, low-stock threshold, WhatsApp template:** **Settings**.
- **Medicines:** **Products > Add medicine / Edit**, or CSV import.
- **Loyalty, reorder, fridge limits:** on their own pages.

---

## Known limitations

- No backend, sync or real authentication.
- Camera scanning was tested in headless Chromium with a simulated camera, **not on a physical phone**. The built-in reader was tested on generated images (flipped, slightly tilted, blurred, noisy, dim). Test with your own phone and packs. Browsers without a native detector read only EAN-13 / UPC-A.
- WhatsApp opening, thermal-printer output and app installation were not tested on real devices. The receipt layout targets about 76mm width.
- Order totals are shown in whole Taka. There is no VAT calculation.
- Partial returns or editing a completed order are not supported; cancel and bill again.
- The Orders page shows the latest 200 matching orders.

---

## Roadmap

Backend with real accounts and sync, WhatsApp Business API / SMS gateway, OCR service, rider app, licensed interaction database, bKash/Nagad transaction matching, daily closing report, sales returns.

---

## Tech

Plain HTML5, CSS and vanilla JavaScript, no build step needed to run, no frameworks. Tested in Chromium. Other current browsers are expected to work but were not tested.

© ShebaCare Pharma, Dhanmondi, Dhaka.
