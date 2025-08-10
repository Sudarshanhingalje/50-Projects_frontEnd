export default function StatsCard({ title, value, Icon, theme = 'indigo' }) {
  const themeMap = {
    indigo: {
      card: 'bg-indigo-50 border-indigo-200',
      icon: 'text-indigo-600',
      value: 'text-indigo-900',
    },
    amber: {
      card: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-600',
      value: 'text-amber-900',
    },
    rose: {
      card: 'bg-rose-50 border-rose-200',
      icon: 'text-rose-600',
      value: 'text-rose-900',
    },
    emerald: {
      card: 'bg-emerald-50 border-emerald-200',
      icon: 'text-emerald-600',
      value: 'text-emerald-900',
    },
  }

  const colors = themeMap[theme] ?? themeMap.indigo

  return (
    <div className={`border rounded-xl p-4 flex items-center gap-4 ${colors.card}`}>
      {Icon && <Icon className={`h-8 w-8 ${colors.icon}`} />}
      <div>
        <div className="text-sm text-slate-600">{title}</div>
        <div className={`text-2xl font-semibold ${colors.value}`}>{value}</div>
      </div>
    </div>
  )
}