import SettingsForm from '../components/SettingsForm'

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Settings</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <SettingsForm />
      </div>
    </div>
  )
}