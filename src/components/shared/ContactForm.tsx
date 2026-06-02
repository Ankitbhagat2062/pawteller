"use client";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setTopic("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (_error) {
      setStatus("error");
    }
  };
  return (

    <div className="max-w-md mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-7"
        method="post"
        aria-label="Contact form"
      >
        <div className="grid gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-slate-900 dark:text-slate-50"
            >
              {"Name"}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-900 dark:text-slate-50"
            >
              {"Email"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
            />
          </div>

          {/* Topic Dropdown */}
          <div>
            <label
              htmlFor="topic"
              className="text-sm font-semibold text-slate-900 dark:text-slate-50"
            >
              {"Topic"}
            </label>

            <Select
              value={topic}
              onValueChange={(value) => setTopic(value)}
            >
              <SelectTrigger
                id="topic"
                className="mt-2 w-full h-11 rounded-2xl border border-slate-200 bg-white/70 px-4 text-sm text-slate-900 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/25 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>

              <SelectContent className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-black">
                <SelectItem
                  value="general"
                  className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-emerald-50 dark:text-slate-50 dark:focus:bg-emerald-500/15"
                >
                  {"General questions"}
                </SelectItem>
                <SelectItem
                  value="feedback"
                  className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-emerald-50 dark:text-slate-50 dark:focus:bg-emerald-500/15"
                >
                  {"Content feedback"}
                </SelectItem>
                <SelectItem
                  value="partnerships"
                  className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-emerald-50 dark:text-slate-50 dark:focus:bg-emerald-500/15"
                >
                  {"Partnerships"}
                </SelectItem>
                <SelectItem
                  value="suggestions"
                  className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-emerald-50 dark:text-slate-50 dark:focus:bg-emerald-500/15"
                >
                  {"Content suggestions"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Input Frame */}

          <div>
            <label
              htmlFor="message"
              className="text-sm font-semibold text-slate-900 dark:text-slate-50"
            >
              {"Message"}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              required
              className="mt-2 block w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
              placeholder="Tell us what you would like help with (or what we can improve)."
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="mt-1 w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/25"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
          {status === "success" && (
            <p className="text-green-600">{"Message sent successfully!"}</p>
          )}
          {status === "error" && (
            <p className="text-red-600">{"Something went wrong. Try again."}</p>
          )}

          <p className="text-xs font-semibold leading-5 text-slate-500 dark:text-zinc-400">
            {` By sending, you agree to be contacted about your request. pawteller
            is not a medical provider.`}
          </p>
        </div>
      </form>
    </div>
  );
}
