import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'outreach_settings_v1'

export default function SettingsForm() {
  const [form, setForm] = useState({
    sheetsUrl: '',
    webhookUrl: '',
    delayBetweenBatchesMs: 1000,
    emailAccountType: 'Gmail',
    apiToken: '',
  })

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      setForm((prev) => ({ ...prev, ...saved }))
    } catch {}
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    toast.success('Settings saved')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Google Sheets URL</label>
        <input
          type="url"
          required
          name="sheetsUrl"
          value={form.sheetsUrl}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://docs.google.com/spreadsheets/d/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">n8n Webhook URL</label>
        <input
          type="url"
          required
          name="webhookUrl"
          value={form.webhookUrl}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://your-n8n-instance/webhook/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Delay time between batches (ms)</label>
        <input
          type="number"
          min="0"
          name="delayBetweenBatchesMs"
          value={form.delayBetweenBatchesMs}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email account type</label>
        <select
          name="emailAccountType"
          value={form.emailAccountType}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Gmail</option>
          <option>Outlook</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">API token / credentials</label>
        <input
          type="text"
          name="apiToken"
          value={form.apiToken}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste your token or credentials"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </form>
  )
}