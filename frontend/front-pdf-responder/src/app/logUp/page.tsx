"use client";

import { userLogUp } from "@/auth";

export default function LogUp() {
    
  const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {

    const res = await userLogUp(new FormData(e.currentTarget));
    console.log(res);

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="mt-1 text-sm text-slate-400">Fill the fields to start your experience</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Ex: John"
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ex: Doe"
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Username *</label>
          <input
            type="text"
            name="username"
            placeholder="YourUser"
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">E-mail *</label>
          <input
            type="email"
            name="email"
            placeholder="nome@exemplo.com"
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Password *</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
            />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Confirm Password *</label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <p className="text-[12px] text-gray-500"> Fields checked with '*' are obligatory. Please, fill them to complete your account creation.</p>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}