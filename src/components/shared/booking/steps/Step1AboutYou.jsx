import React, { useState, useRef, useEffect } from 'react';
import { Question, CaretDown } from '@phosphor-icons/react';
import Field from '../Field';
import StepShell from '../StepShell';
import { inputClass, chipClass, formatFullName, formatPhoneNumber } from '../helpers';
import { HOW_FOUND_OPTIONS, HOW_FOUND_ICONS, COUNTRY_CODES } from '../constants';

export default function Step1AboutYou({ formData, errors, handleChange }) {
    const [countryOpen, setCountryOpen] = useState(false);
    const countryRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (countryRef.current && !countryRef.current.contains(e.target)) {
                setCountryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <StepShell title="Your Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" required error={errors.name}>
                    <input
                        id="booking-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value.trim()) handleChange('name', formatFullName(e.target.value));
                        }}
                        className={inputClass(errors.name)}
                        placeholder="Juneco Mirande"
                    />
                </Field>
                <Field label="Email Address" required error={errors.email}>
                    <input
                        id="booking-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={inputClass(errors.email)}
                        placeholder="hello@example.com"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Contact Number">
                    <div className="relative">
                        <div className={`flex items-stretch bg-dark/5 border rounded-tl-xl rounded-bl-xl rounded-br-xl transition-all duration-200 ${errors.contact ? 'border-red-500/40' : 'border-dark/15 focus-within:border-dark/30'}`}>
                            <div ref={countryRef} className="relative flex-shrink-0">
                                <button
                                    type="button"
                                    id="booking-country-select"
                                    onClick={() => setCountryOpen(!countryOpen)}
                                    className="h-full flex items-center gap-1.5 pl-4 pr-3 py-3 text-dark/70 font-mono text-sm"
                                >
                                    {COUNTRY_CODES[formData.country || 'PH'].dial}
                                    <CaretDown size={11} className={`text-dark/35 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {countryOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-primary border border-dark/15 rounded-xl overflow-hidden z-50 shadow-2xl text-dark animate-[scaleIn_0.18s_ease-out] origin-top-left min-w-[10rem]">
                                        {Object.entries(COUNTRY_CODES).map(([c, info]) => (
                                            <button
                                                key={c}
                                                type="button"
                                                id={`booking-country-${c.toLowerCase()}`}
                                                onClick={() => {
                                                    handleChange('country', c);
                                                    handleChange('contact', '');
                                                    setCountryOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${formData.country === c ? 'bg-accent/10 text-accent font-bold' : 'hover:bg-dark/[0.03] text-dark'
                                                    }`}
                                            >
                                                <span>{info.label}</span>
                                                <span className="text-dark/40 font-mono text-xs">{info.dial}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-px bg-dark/15 my-2.5" />

                            <input
                                id="booking-contact"
                                type="tel"
                                inputMode="numeric"
                                value={formData.contact}
                                onChange={(e) => {
                                    const country = formData.country || 'PH';
                                    const digits = e.target.value.replace(/\D/g, '').slice(0, COUNTRY_CODES[country].maxDigits);
                                    handleChange('contact', formatPhoneNumber(digits, country));
                                }}
                                className="flex-1 min-w-0 bg-transparent px-4 py-3 text-dark text-sm placeholder-dark/35 focus:outline-none font-sans"
                                placeholder={COUNTRY_CODES[formData.country || 'PH'].placeholder}
                            />
                        </div>
                        {formData.contact && (
                            <button
                                type="button"
                                id="booking-contact-whatsapp"
                                onClick={() => handleChange('hasWhatsapp', !formData.hasWhatsapp)}
                                className={` absolute -top-5 -right-0 px-3 py-1 rounded-md border bg-[#DDD9D3] font-mono text-[10px] font-bold uppercase tracking-wide transition-colors duration-200 ${formData.hasWhatsapp ? 'text-[#25D366] border-[#25D366] bg-[#C1E0C5]' : 'text-dark/40 border-dark/15 hover:text-dark/60'
                                    }`}
                            >
                                {formData.hasWhatsapp ? 'Available on WhatsApp' : 'Available on WhatsApp?'}
                            </button>
                        )}
                    </div>
                </Field>
                <Field label="Company / Brand">
                    <input
                        id="booking-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className={inputClass()}
                        placeholder="Acme Co. (optional)"
                    />
                </Field>
            </div>

            <Field label="Website / Social Handle">
                <input
                    id="booking-website"
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className={inputClass()}
                    placeholder="instagram.com/yourbrand or yoursite.com"
                />
            </Field>

            <Field label="How did you find me?">
                <div className="flex flex-wrap gap-2 pt-1">
                    {HOW_FOUND_OPTIONS.map((opt) => {
                        const Icon = HOW_FOUND_ICONS[opt] || Question;
                        return (
                            <button
                                key={opt}
                                id={`booking-found-${opt.toLowerCase()}`}
                                type="button"
                                onClick={() => handleChange('howFound', formData.howFound === opt ? '' : opt)}
                                className={`${chipClass(formData.howFound === opt)} flex items-center gap-2`}
                            >
                                <Icon size={13} weight={formData.howFound === opt ? 'fill' : 'bold'} />
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </Field>
        </StepShell>
    );
}