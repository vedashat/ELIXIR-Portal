const compatibility = [
  { group: 'O-', give: 'All groups', receive: 'O-' },
  { group: 'O+', give: 'O+, A+, B+, AB+', receive: 'O+, O-' },
  { group: 'A-', give: 'A+, A-, AB+, AB-', receive: 'A-, O-' },
  { group: 'A+', give: 'A+, AB+', receive: 'A+, A-, O+, O-' },
  { group: 'B-', give: 'B+, B-, AB+, AB-', receive: 'B-, O-' },
  { group: 'B+', give: 'B+, AB+', receive: 'B+, B-, O+, O-' },
  { group: 'AB-', give: 'AB+, AB-', receive: 'AB-, A-, B-, O-' },
  { group: 'AB+', give: 'AB+ only', receive: 'All groups' }
]

const eligibility = [
  'Aged 18–65 and weigh at least 50 kg',
  'Hemoglobin of at least 12.5 g/dL',
  'No fever, infection or major surgery in the last 3 months',
  'At least 90 days since your last whole-blood donation',
  'Not pregnant or breastfeeding at the time of donation'
]

export default function BloodInfo() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold">Blood Info</h1>
      <p className="text-ink/70 mt-2 max-w-prose">
        A quick reference on compatibility and who is eligible to donate.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">Compatibility chart</h2>
      <div className="overflow-x-auto border border-line rounded-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-wine text-paper text-left">
              <th className="px-4 py-3 font-semibold">Group</th>
              <th className="px-4 py-3 font-semibold">Can donate to</th>
              <th className="px-4 py-3 font-semibold">Can receive from</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {compatibility.map((row) => (
              <tr key={row.group} className="odd:bg-white/60">
                <td className="px-4 py-3 font-display text-wine text-lg">{row.group}</td>
                <td className="px-4 py-3 text-ink/75">{row.give}</td>
                <td className="px-4 py-3 text-ink/75">{row.receive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-14 mb-4">Who can donate</h2>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
        {eligibility.map((item) => (
          <li key={item} className="flex gap-3 text-ink/75 text-sm leading-relaxed">
            <span className="text-teal mt-0.5">＋</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
