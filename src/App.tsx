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

export default function App() {
  const [log, setLog] = useState<{ time: string; text: string }[]>([])
  const push = (text: string) =>
    setLog((l) => [{ time: new Date().toLocaleTimeString(), text }, ...l])

  const buy = () => {
    push('open() called')
    window.DodoCheckout.open({
      productId: 'prod_123',
      onSuccess: (e) => push(`onSuccess ${JSON.stringify(e)}`),
      onClose: (e) => push(`onClose ${JSON.stringify(e)}`),
      onError: (e) => push(`onError ${JSON.stringify(e)}`),
    })
  }

  return (
    <div className="mx-auto max-w-xl p-8 space-y-6">
      <button onClick={buy} className="rounded bg-black px-4 py-2 text-white">Buy</button>
      <ul className="font-mono text-sm space-y-1">
        {log.map((l, i) => <li key={i}><span className="text-gray-400">{l.time}</span> {l.text}</li>)}
      </ul>
    </div>
  )
}