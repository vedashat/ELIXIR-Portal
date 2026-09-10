import { Link } from 'react-router-dom'
import PulseDivider from '../components/PulseDivider'

const facts = [
  {
    title: 'One donation, three lives',
    body: 'A single pint separates into red cells, plasma and platelets — each one goes to a different patient in need.'
  },
  {
    title: 'The need never pauses',
    body: 'Someone requires blood roughly every two seconds, from surgeries and accidents to chronic conditions like thalassemia.'
  },
  {
    title: 'It cannot be manufactured',
    body: 'There is no substitute for human blood. Every unit on a shelf came from someone who chose to give it.'
  }
]

const steps = [
  { n: '01', title: 'Register', body: 'Share your details and blood group so nearby patients can find you.' },
  { n: '02', title: 'Get screened', body: 'A quick health check confirms you are fit to donate that day.' },
  { n: '03', title: 'Donate', body: 'The draw takes about 10 minutes and is supervised throughout.' },
  { n: '04', title: 'Recover & repeat', body: 'Rest, hydrate, and you are eligible again in about 90 days.' }
]

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl leading-[1.1] font-semibold text-ink">
            Somebody, somewhere, is waiting for your blood type right now.
          </h1>
          <p className="mt-6 text-ink/70 max-w-prose leading-relaxed">
            Elixir connects verified donors with patients, hospitals and blood banks in
            minutes, not hours. No paperwork, no waiting rooms — just people helping people.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/find-donors"
              className="bg-wine text-paper px-6 py-3 text-sm font-semibold rounded-sm hover:bg-wine-deep transition-colors"
            >
              Find a Donor
            </Link>
            <Link
              to="/register"
              className="border border-ink/20 px-6 py-3 text-sm font-semibold rounded-sm hover:border-ink/60 transition-colors"
            >
              Become a Donor
            </Link>
          </div>
        </div>

        <div className="border border-line rounded-sm p-8 bg-white/40">
          <PulseDivider className="w-full h-14" />
          <p className="mt-6 font-display text-5xl text-wine">3 lives</p>
          <p className="text-ink/60 text-sm mt-1">saved by every single donation, on average.</p>
          <div className="mt-8 pt-6 border-t border-line grid grid-cols-2 gap-6">
            <div>
              <p className="font-display text-3xl">56 days</p>
              <p className="text-ink/60 text-sm mt-1">shelf life of donated red cells</p>
            </div>
            <div>
              <p className="font-display text-3xl">90 days</p>
              <p className="text-ink/60 text-sm mt-1">until you can donate again</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/50 border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold max-w-md">Why it matters more than people think</h2>
          <div className="mt-10 divide-y divide-line border-t border-line">
            {facts.map((f) => (
              <div key={f.title} className="py-6 grid md:grid-cols-3 gap-4">
                <h3 className="font-display text-lg text-wine">{f.title}</h3>
                <p className="md:col-span-2 text-ink/70 leading-relaxed max-w-prose">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold max-w-md">How donating works</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-display text-3xl text-amber">{s.n}</span>
              <h3 className="font-semibold mt-2">{s.title}</h3>
              <p className="text-ink/65 text-sm mt-1 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-wine text-paper">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-2xl md:text-3xl max-w-lg">
            Ten minutes of your time. A lifetime for someone else.
          </p>
          <Link
            to="/register"
            className="bg-amber text-ink px-6 py-3 text-sm font-semibold rounded-sm hover:bg-white transition-colors whitespace-nowrap"
          >
            Register as Donor
          </Link>
        </div>
      </section>
    </div>
  )
}
