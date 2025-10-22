"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus("Message sent successfully!");
      form.reset();
    } else {
      setStatus(result.error || "Failed to send message.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1b1b22]/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 text-white font-medium hover:brightness-110 transition-all duration-300 shadow-lg shadow-indigo-900/30"
        >
          Send Message
        </button>

        {status && (
          <p className="text-sm text-center mt-3 text-slate-300">{status}</p>
        )}
      </div>
    </form>
  );
}
