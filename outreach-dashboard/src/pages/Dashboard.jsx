import { EnvelopeIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import EmailTable from '../components/EmailTable'

export default function Dashboard() {
  const [stats, setStats] = useState({ sent: 0, pending: 0, failed: 0 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard title="Emails Sent Today" value={stats.sent} Icon={EnvelopeIcon} theme="emerald" />
        <StatsCard title="Pending Emails" value={stats.pending} Icon={ClockIcon} theme="amber" />
        <StatsCard title="Bounce/Spam Rate" value={`${stats.failed === 0 && stats.sent === 0 ? 0 : Math.round((stats.failed / Math.max(1, stats.sent)) * 100)}%`} Icon={ExclamationTriangleIcon} theme="rose" />
      </section>

      {/* Queue Table */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-slate-700">Email Queue</h2>
        <EmailTable onStatsComputed={setStats} />
      </section>
    </div>
  )
}