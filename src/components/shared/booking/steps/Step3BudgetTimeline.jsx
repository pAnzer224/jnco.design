import React from 'react';
import Field from '../Field';
import StepShell from '../StepShell';
import { chipClass } from '../helpers';
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, REBRAND_OPTIONS } from '../constants';

export default function Step3BudgetTimeline({ formData, errors, handleChange }) {
    return (
        <StepShell title="Budget & Timeline">
            <Field label="Budget Range" required error={errors.budget}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {BUDGET_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            id={`booking-budget-${opt.id}`}
                            type="button"
                            onClick={() => handleChange('budget', opt.label)}
                            className={`px-3 py-3 rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest border transition-all duration-200 text-center ${formData.budget === opt.label
                                ? 'bg-accent text-primary border-accent shadow-[0_0_12px_rgba(230,59,46,0.25)]'
                                : 'bg-dark/5 text-dark/60 border-dark/15 hover:border-dark/25 hover:text-dark'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </Field>

            <Field label="Timeline" required error={errors.timeline}>
                <div className="grid grid-cols-2 gap-2 pt-1">
                    {TIMELINE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            id={`booking-timeline-${opt.id}`}
                            type="button"
                            onClick={() => handleChange('timeline', opt.label)}
                            className={`px-3 py-3 rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest border transition-all duration-200 text-center ${formData.timeline === opt.label
                                ? 'bg-accent text-primary border-accent shadow-[0_0_12px_rgba(230,59,46,0.25)]'
                                : 'bg-dark/5 text-dark/60 border-dark/15 hover:border-dark/25 hover:text-dark'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </Field>

            <Field label="New Brand or Rebrand?">
                <div className="flex flex-wrap gap-2 pt-1">
                    {REBRAND_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            id={`booking-rebrand-${opt.toLowerCase().replace(' ', '-')}`}
                            type="button"
                            onClick={() => handleChange('isRebrand', formData.isRebrand === opt ? '' : opt)}
                            className={chipClass(formData.isRebrand === opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </Field>
        </StepShell>
    );
}