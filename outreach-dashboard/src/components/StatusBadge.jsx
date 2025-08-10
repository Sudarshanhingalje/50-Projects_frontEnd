export default function StatusBadge({ status }) {
  const normalized = String(status || '').toLowerCase()
  const styles =
    normalized === 'sent'
      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
      : normalized === 'pending'
      ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200'
      : 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200'

  const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown'

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${styles}`}>
      {label}
    </span>
  )
}