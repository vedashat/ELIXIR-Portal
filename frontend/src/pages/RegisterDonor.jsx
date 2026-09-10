import { useState } from 'react'
import { api } from '../api'

const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const initial = {
  name: '',
  age: '',
  blood_group: '',
  city: '',
  phone: '',
  email: '',
  last_donation_date: ''
}

export default function RegisterDonor() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await api.registerDonor({ ...form, age: Number(form.age) })
      setStatus('done')
      setForm(initial)
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-3xl text-wine">Thank you.</p>
        <p className="text-ink/70 mt-3 max-w-prose mx-auto">
          You're on the list. We'll reach out by phone when someone nearby needs your blood group.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold">Register as Donor</h1>
      <p className="text-ink/70 mt-2">Takes under a minute. Your details stay private and are only shared with verified requesters.</p>

      <form onSubmit={submit} className="mt-10 grid gap-6">
        <Field label="Full name" required>
          <input required value={form.name} onChange={update('name')} className="input" type="text" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Age" required>
            <input required value={form.age} onChange={update('age')} className="input" type="number" min="18" max="65" />
          </Field>
          <Field label="Blood group" required>
            <select required value={form.blood_group} onChange={update('blood_group')} className="input">
              <option value="">Select</option>
              {groups.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
        </div>

        <Field label="City" required>
          <input required value={form.city} onChange={update('city')} className="input" type="text" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Phone" required>
            <input required value={form.phone} onChange={update('phone')} className="input" type="tel" />
          </Field>
          <Field label="Email">
            <input value={form.email} onChange={update('email')} className="input" type="email" />
          </Field>
        </div>

        <Field label="Last donation date (if any)">
          <input value={form.last_donation_date} onChange={update('last_donation_date')} className="input" type="date" />
        </Field>

        {status === 'error' && (
          <p className="text-wine text-sm">Registration failed: {error}. Make sure the backend API is running.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-wine text-paper px-6 py-3 text-sm font-semibold rounded-sm hover:bg-wine-deep transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting…' : 'Register'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">
        {label}{required && <span className="text-wine"> *</span>}
      </span>
      {children}
    </label>
  )
}
