export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <span className="font-display italic text-xl text-paper">Elixir</span>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            A pint you give today is a pulse someone else keeps tomorrow.
          </p>
        </div>
        <div>
          <h3 className="text-paper text-sm font-semibold tracking-wide mb-3">Emergency</h3>
          <p className="text-sm">National Blood Helpline</p>
          <p className="text-2xl font-display text-amber">1800-180-1104</p>
        </div>
        <div>
          <h3 className="text-paper text-sm font-semibold tracking-wide mb-3">Built by</h3>
          <p className="text-sm">Apeksha &amp; Akshat Vedant</p>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} Elixir. All rights reserved.
      </div>
    </footer>
  )
}
