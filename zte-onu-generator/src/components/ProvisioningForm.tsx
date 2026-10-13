"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { ProvisioningParams, GeneratedScripts } from "@/lib/types";
import ScriptOutput from "./ScriptOutput";

const formSchema = z.object({
  pppoeUsername: z.string().min(1, "Required"),
  pppoePassword: z.string().min(1, "Required"),
  serialNumber: z.string().min(1, "Required"),
  onuType: z.string().min(1, "Required"),
  frameSlotPort: z
    .string()
    .regex(/^\d+\/\d+\/\d+$/, "Format: FRAME/SLOT/PORT"),
  onuId: z.coerce.number().int().positive("Must be positive"),
  svlan: z.coerce.number().int().positive("Must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

const EXAMPLE: FormValues = {
  pppoeUsername: "AN1914",
  pppoePassword: "r1Vjfb2q0F",
  serialNumber: "ZTEGCED95CA6",
  onuType: "F672YV9.1",
  frameSlotPort: "1/3/15",
  onuId: 8,
  svlan: 2502,
};

export default function ProvisioningForm() {
  const [scripts, setScripts] = useState<GeneratedScripts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pppoeUsername: "",
      pppoePassword: "",
      serialNumber: "",
      onuType: "",
      frameSlotPort: "",
      onuId: undefined,
      svlan: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setScripts(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const result: GeneratedScripts = await res.json();
      setScripts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = () => {
    reset(EXAMPLE);
    setScripts(null);
    setError(null);
  };

  const clearForm = () => {
    reset({
      pppoeUsername: "",
      pppoePassword: "",
      serialNumber: "",
      onuType: "",
      frameSlotPort: "",
      onuId: undefined,
      svlan: undefined,
    });
    setScripts(null);
    setError(null);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Provisioning Parameters
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadExample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Load Example (AN1914)
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* PPPoE Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                PPPoE Username <span className="text-red-500">*</span>
              </label>
              <input
                {...register("pppoeUsername")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AN1914"
              />
              {errors.pppoeUsername && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pppoeUsername.message}
                </p>
              )}
            </div>

            {/* PPPoE Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                PPPoE Password <span className="text-red-500">*</span>
              </label>
              <input
                {...register("pppoePassword")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="r1Vjfb2q0F"
              />
              {errors.pppoePassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pppoePassword.message}
                </p>
              )}
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Serial Number (SN) <span className="text-red-500">*</span>
              </label>
              <input
                {...register("serialNumber")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ZTEGCED95CA6"
              />
              {errors.serialNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.serialNumber.message}
                </p>
              )}
            </div>

            {/* ONU Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                ONU Type <span className="text-red-500">*</span>
              </label>
              <input
                {...register("onuType")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="F672YV9.1"
              />
              {errors.onuType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.onuType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Frame/Slot/Port */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Frame/Slot/Port <span className="text-red-500">*</span>
              </label>
              <input
                {...register("frameSlotPort")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1/3/15"
              />
              {errors.frameSlotPort && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.frameSlotPort.message}
                </p>
              )}
            </div>

            {/* ONU ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                ONU ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("onuId")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8"
              />
              {errors.onuId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.onuId.message}
                </p>
              )}
            </div>

            {/* SVLAN */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                SVLAN <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("svlan")}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2502"
              />
              {errors.svlan && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.svlan.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  Generate Scripts
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {scripts && <ScriptOutput scripts={scripts} />}
    </div>
  );
}
