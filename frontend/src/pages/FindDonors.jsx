import { useEffect, useState } from 'react'
import { api } from '../api'

const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function FindDonors() {
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [donors, setDonors] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const search = async (e) => {
    e?.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const params = {}
      if (bloodGroup) params.blood_group = bloodGroup
      if (city) params.city = city
      const data = await api.getDonors(params)
      setDonors(data.donors || [])
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold">Find Donors</h1>
      <p className="text-ink/70 mt-2 max-w-prose">
        Search by blood group and city to see donors who have volunteered to be contacted.
      </p>

      <form onSubmit={search} className="mt-8 flex flex-wrap gap-4 items-end border-b border-line pb-8">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="bg">Blood group</label>
          <select
            id="bg"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border border-line rounded-sm px-3 py-2 bg-white"
          >
            <option value="">Any</option>
            {groups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Noida"
            className="border border-line rounded-sm px-3 py-2 bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-wine text-paper px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-wine-deep transition-colors"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        {status === 'loading' && <p className="text-ink/60">Searching donors…</p>}
        {status === 'error' && (
          <p className="text-wine">
            Couldn't load donors: {error}. Make sure the backend API is running.
          </p>
        )}
        {status === 'done' && donors.length === 0 && (
          <p className="text-ink/60">No donors match that search yet.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {donors.map((d) => (
            <div key={d.id} className="border border-line rounded-sm p-5 bg-white/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{d.name}</h3>
                <span className="font-display text-wine text-lg">{d.blood_group}</span>
              </div>
              <p className="text-ink/60 text-sm mt-1">{d.city}</p>
              {d.phone && (
                <a
                  href={`tel:${d.phone}`}
                  className="mt-3 inline-block text-sm font-semibold text-teal border-b border-teal/40"
                >
                  Call {d.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
