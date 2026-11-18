"use client";

import React, { useState } from "react";
import { Lock, Mail, Smartphone, ShieldCheck, Zap } from "lucide-react";

interface PaywallCardProps {
  priceUGX: number;
  onUnlock?: () => void;
}

export default function PaywallCard({ priceUGX, onUnlock }: PaywallCardProps) {
  const [tab, setTab] = useState<"new" | "restore">("new");
  const [network, setNetwork] = useState<"mtn" | "airtel">("mtn");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onUnlock) onUnlock();
    }, 1200);
  };

  return (
    <div className="mx-auto mt-6 max-w-lg rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
        <Lock className="h-5 w-5" />
      </div>

      <h2 className="mt-4 text-center font-serif text-2xl font-bold text-slate-900">
        Support Independent Writing & Unlock Full Essay
      </h2>
      <p className="mt-2 text-center text-xs leading-relaxed text-slate-500">
        Access this complete 4,200-word deep-dive, annotated system blueprints,
        and complete archival essays with instant Mobile Money authorization.
      </p>

      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          <span>One-Time Reader Contribution</span>
          <span className="text-sm font-bold text-amber-600">
            UGX {priceUGX.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setTab("new")}
          className={`rounded-lg py-2 transition ${
            tab === "new"
              ? "bg-white font-semibold text-blue-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          New Access (Mobile Money)
        </button>
        <button
          type="button"
          onClick={() => setTab("restore")}
          className={`rounded-lg py-2 transition ${
            tab === "restore"
              ? "bg-white font-semibold text-blue-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Returning Reader (Restore)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {tab === "new" && (
          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold tracking-wider text-slate-600 uppercase">
                Select Mobile Money Network
              </span>
              <span className="font-medium text-amber-600">
                Instant USSD push
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNetwork("mtn")}
                className={`flex flex-col items-center justify-center rounded-xl border py-3 text-xs font-semibold transition ${
                  network === "mtn"
                    ? "border-blue-500 bg-blue-50/60 text-slate-900"
                    : "border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="mb-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                MTN MoMo
              </button>

              <button
                type="button"
                onClick={() => setNetwork("airtel")}
                className={`flex flex-col items-center justify-center rounded-xl border py-3 text-xs font-semibold transition ${
                  network === "airtel"
                    ? "border-blue-500 bg-blue-50/60 text-slate-900"
                    : "border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="mb-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                Airtel Money
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-semibold text-slate-700">
            Your Email Address
          </label>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@domain.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            Used to securely associate and restore your lifetime reading pass.
          </p>
        </div>
        {tab === "new" && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700">
              Mobile Money Phone Number
            </label>
            <div className="mt-1.5 flex gap-2">
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700">
                +256 (UG)
              </div>
              <div className="relative flex-1">
                <Smartphone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="77 123 4567"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <p className="mt-1 text-[10px] text-slate-400">
              Direct authorization; standard network tariffs apply.
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={isProcessing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
        >
          <Lock className="h-3.5 w-3.5" />
          {isProcessing
            ? "Sending USSD Prompt..."
            : tab === "new"
              ? "Pay via Mobile Money & Read Now"
              : "Restore Reading Access"}
        </button>
      </form>

      {tab === "new" && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-600">
          <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>
            <strong className="text-slate-800">Instant Handset Prompt:</strong>{" "}
            After clicking, a secure USSD pop-up will appear immediately on
            your device. Enter your secret Mobile Money PIN to approve the
            transaction.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-4 text-[10px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-amber-500" /> 100% direct creator
          funding
        </span>
        <span>·</span>
        <span>256-bit TLS</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Zap className="h-3 w-3 text-slate-500" /> Instant Settlement
        </span>
      </div>
    </div>
  );
}