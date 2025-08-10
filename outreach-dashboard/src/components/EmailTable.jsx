import { useEffect, useMemo, useState, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import StatusBadge from './StatusBadge'

const PAGE_SIZE = 10

export default function EmailTable({ onStatsComputed }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const fetchItems = useCallback(async () => {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get('/api/emails/pending')
      const data = Array.isArray(response.data) ? response.data : response.data?.items || []
      setItems(data)
    } catch (err) {
      setError('Failed to load email queue')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
    const id = setInterval(fetchItems, 10000)
    return () => clearInterval(id)
  }, [fetchItems])

  // Compute stats for parent
  useEffect(() => {
    if (!onStatsComputed) return
    const counts = items.reduce(
      (acc, item) => {
        const s = String(item.status || 'pending').toLowerCase()
        if (s === 'sent') acc.sent += 1
        else if (s === 'failed') acc.failed += 1
        else acc.pending += 1
        return acc
      },
      { sent: 0, pending: 0, failed: 0 },
    )
    onStatsComputed(counts)
  }, [items, onStatsComputed])

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return items.slice(start, start + PAGE_SIZE)
  }, [items, currentPage])

  const handleSendNow = async (id) => {
    try {
      await axios.post('/api/send-email', { id })
      toast.success('Email sent')
      // Optimistic update
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status: 'Sent' } : it)))
    } catch (err) {
      toast.error('Failed to send email')
    }
  }

  if (loading) {
    return <div className="text-sm text-slate-500">Loading...</div>
  }

  if (error) {
    return (
      <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-700 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Last Updated</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {pagedItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm text-slate-800">{item.name || '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{item.email || '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{item.role || '-'}</td>
                <td className="px-4 py-3"><StatusBadge status={item.status || 'Pending'} /></td>
                <td className="px-4 py-3 text-sm text-slate-500">{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => handleSendNow(item.id)}
                  >
                    Send Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3">
        <div className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}