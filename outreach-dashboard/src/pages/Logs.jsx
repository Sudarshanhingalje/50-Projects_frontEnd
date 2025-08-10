import { useEffect, useState } from 'react'
import axios from 'axios'
import StatusBadge from '../components/StatusBadge'

export default function Logs() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setError('')
        setLoading(true)
        const res = await axios.get('/api/emails/logs')
        const data = Array.isArray(res.data) ? res.data : res.data?.items || []
        setItems(data)
      } catch (e) {
        setError('Failed to load logs')
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Logs</h1>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-4 text-sm text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-4 text-sm text-rose-700 bg-rose-50 border-b border-rose-200">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-sm text-slate-800">{it.name || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{it.email || '-'}</td>
                    <td className="px-4 py-3"><StatusBadge status={it.status || 'Sent'} /></td>
                    <td className="px-4 py-3 text-sm text-slate-500">{it.timestamp ? new Date(it.timestamp).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}