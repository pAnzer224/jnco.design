import React from 'react';
import { CaretDown, CheckCircle } from '@phosphor-icons/react';
import Field from '../Field';
import StepShell from '../StepShell';
import RichTextField from '../RichTextField';
import { inputClass, compactChipClass, detectServiceDetails } from '../helpers';
import { SERVICE_OPTIONS, SERVICE_QUESTIONS } from '../constants';

export default function Step2ProjectDetails({
    formData,
    errors,
    handleChange,
    handleServiceDetailChange,
    handleServiceDetailToggle,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
}) {
    const serviceConfig = formData.projectType ? SERVICE_QUESTIONS[formData.projectType.id] : null;
    return (
        <StepShell title="Project Details">
            <Field label="Service Type" required error={errors.projectType}>
                <div ref={dropdownRef} className="relative">
                    <button
                        id="booking-service-dropdown"
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${errors.projectType
                            ? 'border-red-500/40 bg-red-500/5'
                            : dropdownOpen
                                ? 'border-accent/40 bg-dark/10'
                                : 'border-dark/15 bg-dark/5 hover:border-dark/25'
                            }`}
                    >
                        {formData.projectType ? (
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-dark/10 bg-dark/5">
                                    {formData.projectType.bg ? (
                                        <img
                                            src={formData.projectType.bg}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-dark/30 font-mono text-[10px]">
                                            {formData.projectType.step}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-dark text-sm font-bold">{formData.projectType.label}</div>
                                    <div className="text-dark/50 font-mono text-[10px] uppercase tracking-wider">
                                        {formData.projectType.desc}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span className="text-dark/40 font-mono text-sm">Select a service...</span>
                        )}
                        <CaretDown
                            size={15}
                            className={`text-dark/35 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-primary border border-dark/15 rounded-2xl overflow-hidden z-50 shadow-2xl text-dark animate-[scaleIn_0.18s_ease-out] origin-top">
                            {SERVICE_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    id={`booking-service-${option.id}`}
                                    type="button"
                                    onClick={() => {
                                        handleChange('projectType', option);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-dark/[0.04] last:border-0 group ${formData.projectType?.id === option.id ? 'bg-accent/10' : 'hover:bg-dark/[0.03]'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-dark/10 bg-dark/5">
                                        {option.bg ? (
                                            <img
                                                src={option.bg}
                                                alt=""
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-dark/30 font-mono text-[10px]">
                                                {option.step}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className={`text-sm font-bold transition-colors ${formData.projectType?.id === option.id
                                                ? 'text-accent'
                                                : 'text-dark group-hover:text-dark'
                                                }`}
                                        >
                                            {option.label}
                                        </div>
                                        <div className="text-dark/45 font-mono text-[10px] uppercase tracking-wider truncate">
                                            {option.desc}
                                        </div>
                                    </div>
                                    {formData.projectType?.id === option.id && (
                                        <CheckCircle size={15} className="text-accent flex-shrink-0" weight="fill" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </Field>

            <Field
                label="Project Description (OPTIONAL)"

            >
                <RichTextField
                    value={formData.description}
                    onChange={(html) => handleChange('description', html)}
                    onBlur={(html) => {
                        if (!serviceConfig) return;
                        const detected = detectServiceDetails(html, serviceConfig, formData.serviceDetails);
                        if (Object.keys(detected).length > 0) {
                            handleChange('serviceDetails', { ...formData.serviceDetails, ...detected });
                        }
                    }}
                    placeholder="describe your project, goals, or anything else I should know..."
                    minHeight={96}
                    maxHeight={240}
                />
            </Field>

            {serviceConfig && serviceConfig.fields.length > 0 && (
                <div className="flex flex-col gap-4 -mt-2">
                    {serviceConfig.intro && (
                        <p className="text-dark/45 font-mono text-[10px] uppercase tracking-wide">
                            {serviceConfig.intro}
                        </p>
                    )}
                    {serviceConfig.fields.map((field) => {
                        const value = formData.serviceDetails[field.key];

                        if (field.type === 'text') {
                            return (
                                <div key={field.key} className="flex flex-col gap-1.5">
                                    <label className="text-dark/60 font-mono text-[10px] uppercase tracking-wide">
                                        {field.label}
                                    </label>
                                    <input
                                        id={`booking-service-${field.key}`}
                                        type="text"
                                        value={value || ''}
                                        onChange={(e) => handleServiceDetailChange(field.key, e.target.value)}
                                        className={inputClass()}
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            );
                        }

                        if (field.type === 'single') {
                            return (
                                <div key={field.key} className="flex flex-wrap items-center gap-2">
                                    <label className="text-dark/60 font-mono text-[10px] uppercase tracking-wide w-full sm:w-32 sm:flex-shrink-0">
                                        {field.label}
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {field.options.map((opt) => (
                                            <button
                                                key={opt}
                                                id={`booking-service-${field.key}-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                                                type="button"
                                                onClick={() =>
                                                    handleServiceDetailChange(field.key, value === opt ? '' : opt)
                                                }
                                                className={compactChipClass(value === opt)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // multi
                        const arr = Array.isArray(value) ? value : [];
                        return (
                            <div key={field.key} className="flex flex-wrap items-center gap-2">
                                <label className="text-dark/60 font-mono text-[10px] uppercase tracking-wide w-full sm:w-32 sm:flex-shrink-0">
                                    {field.label}
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {field.options.map((opt) => (
                                        <button
                                            key={opt}
                                            id={`booking-service-${field.key}-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                                            type="button"
                                            onClick={() => handleServiceDetailToggle(field.key, opt)}
                                            className={compactChipClass(arr.includes(opt))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </StepShell>
    );
}