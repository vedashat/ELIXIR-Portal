import { useEffect, useState } from 'react'
import { api } from '../api'

const fallback = [
  { name: 'National Blood Helpline', number: '1800-180-1104', note: '24/7, toll-free across India' },
  { name: 'Indian Red Cross Society', number: '011-2371-6441', note: 'Blood bank coordination' },
  { name: 'Ambulance', number: '108', note: 'Medical emergencies' }
]

export default function Helpline() {
  const [contacts, setContacts] = useState(fallback)

  useEffect(() => {
    api
      .getHelplines()
      .then((data) => {
        if (data.helplines?.length) setContacts(data.helplines)
      })
      .catch(() => {
        // Backend not reachable — keep the built-in fallback numbers.
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold">Helpline</h1>
      <p className="text-ink/70 mt-2 max-w-prose">
        If you need blood urgently, start here. These lines are monitored around the clock.
      </p>

      <div className="mt-10 border-t border-line divide-y divide-line">
        {contacts.map((c) => (
          <div key={c.name} className="py-6 grid sm:grid-cols-3 gap-2 items-center">
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-ink/60 text-sm">{c.note}</p>
            </div>
            <div className="sm:col-span-2 sm:text-right">
              <span className="font-display text-2xl text-wine">{c.number}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-amber/15 border border-amber/40 rounded-sm p-6">
        <h3 className="font-semibold">In a critical emergency</h3>
        <p className="text-ink/70 text-sm mt-1 max-w-prose">
          Call your nearest hospital's blood bank directly, or dial 108 for ambulance
          and emergency coordination while you search Elixir for nearby donors.
        </p>
      </div>
    </div>
  )
}
