import { Network, ShieldCheck } from "lucide-react";
import ProvisioningForm from "@/components/ProvisioningForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  ZTE ONU Configuration Script Generator
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-full">
                  Network Provisioning
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Deterministic OLT CLI syntax generator for ZTE optical network
                units
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Strict template engine: zero alteration or rewriting
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ProvisioningForm />
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-400">
        Built for network engineers · Deterministic scripts only · Deploy on
        Render
      </footer>
    </div>
  );
}
