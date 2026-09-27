# dodo-example-merchant-site

A stand-in for any website that has embedded Dodo's checkout. In real life
this would be an actual store, SaaS billing page, etc. — this repo just
proves the SDK integration works and gives evaluators a place to click
through the flow.

This site has **no payment logic of its own.** It only calls
`DodoCheckout.open(...)` and displays whatever the callbacks report.

## What it does

- Lists three products, each with its own **Buy** button
- Calling Buy opens the checkout (from `dodo-checkout-app`) inside an
  overlay, via the SDK
- All Buy buttons are disabled while a checkout is open, so it's not
  possible to trigger a second, overlapping checkout session
- A visible log at the bottom shows every SDK call and every callback that
  fires (`onSuccess`, `onClose`, `onError`), with a timestamp — this is
  purely for demoing the integration, a real merchant site wouldn't show this

## Products

| Product | productId | Behavior |
|---|---|---|
| Pro Plan — Annual | `prod_123` | Valid product, checkout opens normally |
| Starter Plan — Monthly | `prod_456` | Valid product, checkout opens normally |
| Ghost Plan (invalid id) | `prod_999` | Not in the catalog — demonstrates the `invalid_product` error path |

## Requirements

- Node 18+

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.

## The SDK file

This site loads the SDK from `public/dodo-checkout.js`, via a plain script
tag in `index.html`:

```html
<script src="/dodo-checkout.js"></script>
```

That file is **built from the separate `dodo-sdk` repo** and copied in here
manually (see that repo's README). It's committed to this repo so the demo
works standalone without needing to build the SDK every time.

## Related repos

- [`dodo-sdk`](#) — the embed script this site loads
- [`dodo-checkout-app`](#) — the hosted payment page that opens when Buy is clicked