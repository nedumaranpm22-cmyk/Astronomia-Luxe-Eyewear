"use client";

import { useState, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";

interface FormErrors {
  fullName?: string;
  email?: string;
  date?: string;
  general?: string;
}

interface ConfirmedAppointment {
  id: string;
  fullName: string;
  email: string;
  date: string;
  salon: string;
  message?: string;
}

export default function PrivateAppointments() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
    salon: "Geneva Flagship Atelier",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ConfirmedAppointment | null>(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please provide your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please provide a valid email address for confidential correspondence.";
    }

    if (!formData.date) {
      newErrors.date = "Please select your preferred appointment date.";
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Appointment must be scheduled for today or a future date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || "Failed to submit viewing request." });
        }
        setIsSubmitting(false);
        return;
      }

      setConfirmed(data.appointment);
      setIsSubmitting(false);
    } catch {
      setErrors({
        general: "A connection error occurred. Please verify your network and try again.",
      });
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmed(null);
    setFormData({
      fullName: "",
      email: "",
      date: "",
      salon: "Geneva Flagship Atelier",
      message: "",
    });
    setErrors({});
  };

  return (
    <section
      id="reserve"
      className="relative bg-[#060606] py-32 sm:py-44 px-6 sm:px-12 lg:px-20 text-[#EDE8E0] overflow-hidden scroll-mt-24"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A05C]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="label-caps mb-4 block">Private Salon &amp; Atelier</span>
          <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#EDE8E0] mb-6">
            Experience the art of seeing.
          </h2>
          <p className="text-sm sm:text-base text-[#EDE8E0]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
            Discover a new expression of precision, material, and timeless design.
          </p>
          <div className="w-16 h-[1px] bg-[#C9A05C]/40 mx-auto mt-8" />
        </div>

        {/* Form Container */}
        <div className="border border-[#EDE8E0]/15 p-8 sm:p-14 lg:p-16 bg-[#060606]/80 backdrop-blur-sm relative">
          <div className="flex items-center justify-between border-b border-[#EDE8E0]/10 pb-6 mb-10 text-[10px] uppercase tracking-[0.3em] text-[#C9A05C] font-sans">
            <span>Invitation to View</span>
            <span>By Appointment Only</span>
          </div>

          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-10"
              >
                {/* General Error Banner */}
                {errors.general && (
                  <div className="p-4 border border-red-500/30 bg-red-950/20 text-red-200 text-xs flex items-center space-x-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errors.general}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Full Name */}
                  <div className="relative group">
                    <label
                      htmlFor="fullName"
                      className="block text-[11px] uppercase tracking-widest text-[#EDE8E0]/50 font-sans mb-2 group-focus-within:text-[#C9A05C] transition-colors"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="e.g. Lord Alexander Sterling"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full bg-transparent border-0 border-b pb-3 text-sm sm:text-base text-[#EDE8E0] font-sans placeholder-[#EDE8E0]/20 focus:outline-none transition-colors ${
                        errors.fullName ? "border-red-500/80" : "border-[#EDE8E0]/20 focus:border-[#C9A05C]"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-400/90 font-sans mt-1.5 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className="block text-[11px] uppercase tracking-widest text-[#EDE8E0]/50 font-sans mb-2 group-focus-within:text-[#C9A05C] transition-colors"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. alexander@residence.ch"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full bg-transparent border-0 border-b pb-3 text-sm sm:text-base text-[#EDE8E0] font-sans placeholder-[#EDE8E0]/20 focus:outline-none transition-colors ${
                        errors.email ? "border-red-500/80" : "border-[#EDE8E0]/20 focus:border-[#C9A05C]"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400/90 font-sans mt-1.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Preferred Appointment Date */}
                  <div className="relative group">
                    <label
                      htmlFor="date"
                      className="block text-[11px] uppercase tracking-widest text-[#EDE8E0]/50 font-sans mb-2 group-focus-within:text-[#C9A05C] transition-colors"
                    >
                      Preferred Appointment Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: undefined });
                        }}
                        className={`w-full bg-transparent border-0 border-b pb-3 text-sm sm:text-base text-[#EDE8E0] font-sans focus:outline-none transition-colors [color-scheme:dark] ${
                          errors.date ? "border-red-500/80" : "border-[#EDE8E0]/20 focus:border-[#C9A05C]"
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <span className="text-[11px] text-red-400/90 font-sans mt-1.5 block">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Salon Atelier */}
                  <div className="relative group">
                    <label
                      htmlFor="salon"
                      className="block text-[11px] uppercase tracking-widest text-[#EDE8E0]/50 font-sans mb-2 group-focus-within:text-[#C9A05C] transition-colors"
                    >
                      Salon / Atelier
                    </label>
                    <select
                      id="salon"
                      value={formData.salon}
                      onChange={(e) =>
                        setFormData({ ...formData, salon: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-[#EDE8E0]/20 pb-3 text-sm sm:text-base text-[#EDE8E0] font-sans focus:border-[#C9A05C] focus:outline-none transition-colors [color-scheme:dark]"
                    >
                      <option value="Geneva Flagship Atelier" className="bg-[#121212] text-[#EDE8E0]">
                        Geneva Flagship Atelier · Rue du Rhône
                      </option>
                      <option value="Zurich Private Salon" className="bg-[#121212] text-[#EDE8E0]">
                        Zurich Private Salon · Bahnhofstrasse
                      </option>
                      <option value="London Mayfair Suite" className="bg-[#121212] text-[#EDE8E0]">
                        London Mayfair Suite · New Bond St
                      </option>
                      <option value="Paris Place Vendôme" className="bg-[#121212] text-[#EDE8E0]">
                        Paris Salon · Place Vendôme
                      </option>
                      <option value="Private Flying Concierge" className="bg-[#121212] text-[#EDE8E0]">
                        Private International Concierge
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <label
                    htmlFor="message"
                    className="block text-[11px] uppercase tracking-widest text-[#EDE8E0]/50 font-sans mb-2 group-focus-within:text-[#C9A05C] transition-colors"
                  >
                    Message / Personal Preferences (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Provide bespoke sizing requirements, optical prescription details, or appointment timing..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-0 border-b border-[#EDE8E0]/20 pb-3 text-sm sm:text-base text-[#EDE8E0] font-sans placeholder-[#EDE8E0]/20 focus:border-[#C9A05C] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <span className="text-[11px] text-[#EDE8E0]/40 font-sans">
                    All viewings are conducted under strict personal discretion.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center space-x-3 text-xs uppercase tracking-luxury text-[#EDE8E0] border border-[#C9A05C]/70 px-8 py-4 hover:bg-[#C9A05C] hover:text-[#060606] transition-all duration-500 font-sans disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? "Transmitting Dossier..." : "Request Appointment"}
                    </span>
                    {isSubmitting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C9A05C]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="py-12 text-center"
              >
                <div className="w-14 h-14 rounded-full border border-[#C9A05C] flex items-center justify-center mx-auto mb-6 text-[#C9A05C] bg-[#C9A05C]/10">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A05C] font-mono block mb-2">
                  Dossier Ref: {confirmed.id}
                </span>
                <h3 className="editorial-title text-3xl sm:text-4xl text-[#EDE8E0] mb-4">
                  Viewing Request Transmitted
                </h3>
                <p className="text-sm text-[#EDE8E0]/80 font-sans max-w-lg mx-auto mb-6 leading-relaxed">
                  Thank you, <span className="text-[#EDE8E0] font-medium">{confirmed.fullName}</span>. Your private viewing appointment has been registered with the{" "}
                  <span className="text-[#C9A05C]">{confirmed.salon}</span> for{" "}
                  <span className="text-[#EDE8E0] font-medium">{confirmed.date}</span>.
                </p>
                <p className="text-xs text-[#EDE8E0]/50 font-sans max-w-md mx-auto mb-10 leading-relaxed">
                  Our private client concierge will contact you via {confirmed.email} within 24 hours to confirm your personalized salon itinerary.
                </p>
                <button
                  onClick={handleReset}
                  className="text-xs uppercase tracking-widest text-[#C9A05C] border-b border-[#C9A05C]/40 pb-1 hover:text-[#EDE8E0] hover:border-[#EDE8E0] transition-colors font-sans"
                >
                  Schedule Another Appointment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
