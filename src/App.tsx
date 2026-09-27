import { useState } from 'react'

declare global {
  interface Window {
    DodoCheckout: {
      open: (o: {
        productId: string
        onSuccess?: (e: { sessionId: string }) => void
        onClose?: (e: { reason: string }) => void
        onError?: (e: { code: string; message: string }) => void
      }) => { close: () => void }
    }
  }
}

const PRODUCTS = [
  { id: 'prod_123', name: 'Pro Plan — Annual', price: '$299.00' },
  { id: 'prod_456', name: 'Starter Plan — Monthly', price: '$19.00' },
  { id: 'prod_999', name: 'Ghost Plan (invalid id)', price: '—' },
]

export default function App() {
  const [log, setLog] = useState<{ time: string; text: string }[]>([])
  const [busy, setBusy] = useState(false)

  const push = (text: string) =>
    setLog((l) => [{ time: new Date().toLocaleTimeString(), text }, ...l])

  const buy = (productId: string) => {
    if (busy) return
    setBusy(true)
    push(`open() called with productId=${productId}`)

    window.DodoCheckout.open({
      productId,
      onSuccess: (e) => push(`onSuccess ${JSON.stringify(e)}`),
      onClose: (e) => {
        push(`onClose ${JSON.stringify(e)}`)
        setBusy(false)
      },
      onError: (e) => push(`onError ${JSON.stringify(e)}`),
    })
  }

  return (
    <div className="mx-auto max-w-xl p-8 space-y-6">
      <div className="flex flex-col gap-2">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            disabled={busy}
            onClick={() => buy(p.id)}
            className="rounded bg-black px-4 py-2 text-left text-white disabled:opacity-40"
          >
            Buy {p.name} ({p.price})
          </button>
        ))}
      </div>

      <ul className="font-mono text-sm space-y-1">
        {log.map((l, i) => (
          <li key={i}>
            <span className="text-gray-400">{l.time}</span> {l.text}
          </li>
        ))}
      </ul>
    </div>
  )
}