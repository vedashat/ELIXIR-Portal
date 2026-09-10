export default function PulseDivider({ className = '', stroke = '#7A1B33' }) {
  return (
    <svg
      viewBox="0 0 600 60"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 30 H160 L185 30 L200 8 L218 52 L235 30 L255 30 L270 18 L285 30 H600"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pulse-line"
      />
    </svg>
  )
}
