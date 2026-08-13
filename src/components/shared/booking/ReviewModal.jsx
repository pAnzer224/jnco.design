"use client";
import React from 'react';
import { X, PencilSimple, PaperPlaneTilt, SpinnerGap } from '@phosphor-icons/react';
import { stripHtml } from './helpers';

function ReviewRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-dark/40 font-mono text-[9px] uppercase tracking-wide">{label}</span>
            <span className="text-dark text-sm font-sans break-words">{value}</span>
        </div>
    );
}

function ReviewSection({ title, stepNum, onEdit, children }) {
    return (
        <div className="border border-dark/10 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h4 className="text-dark font-sans font-bold text-sm">{title}</h4>
                <button
                    type="button"
                    onClick={() => onEdit(stepNum)}
                    className="flex items-center gap-1 text-dark/45 hover:text-accent font-mono text-[10px] uppercase tracking-wide transition-colors"
                >
                    <PencilSimple size={12} />
                    Edit
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
        </div>
    );
}

export default function ReviewModal({ formData, file, submitting, onEdit, onCancel, onConfirm }) {
    const serviceDetailEntries = Object.entries(formData.serviceDetails || {}).filter(
        ([, v]) => (Array.isArray(v) ? v.length > 0 : Boolean(v))
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-dark/90">
            <div className="bg-primary text-dark border border-dark/10 rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-dark/10 flex-shrink-0">
                    <h3 className="text-xl font-bold font-sans tracking-tight">Review Your Details</h3>
                    <button type="button" onClick={onCancel} className="text-dark/40 hover:text-dark transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar px-6 py-5 flex flex-col gap-4">
                    <ReviewSection title="About You" stepNum={1} onEdit={onEdit}>
                        <ReviewRow label="Name" value={formData.name} />
                        <ReviewRow label="Email" value={formData.email} />
                        <ReviewRow
                            label="Contact"
                            value={formData.contact ? `${formData.contact}${formData.hasWhatsapp ? ' (WhatsApp)' : ''}` : ''}
                        />
                        <ReviewRow label="Company" value={formData.company} />
                        <ReviewRow label="Website" value={formData.website} />
                        <ReviewRow label="Found via" value={formData.howFound} />
                    </ReviewSection>

                    <ReviewSection title="Project" stepNum={2} onEdit={onEdit}>
                        <ReviewRow label="Service" value={formData.projectType?.label} />
                        <ReviewRow label="Description" value={stripHtml(formData.description)} />
                        {serviceDetailEntries.map(([key, value]) => (
                            <ReviewRow
                                key={key}
                                label={key.replace(/([A-Z])/g, ' $1')}
                                value={Array.isArray(value) ? value.join(', ') : value}
                            />
                        ))}
                    </ReviewSection>

                    <ReviewSection title="Budget & Timeline" stepNum={3} onEdit={onEdit}>
                        <ReviewRow label="Budget" value={formData.budget} />
                        <ReviewRow label="Timeline" value={formData.timeline} />
                        <ReviewRow label="New Brand / Rebrand" value={formData.isRebrand} />
                    </ReviewSection>

                    <ReviewSection title="References" stepNum={4} onEdit={onEdit}>
                        <ReviewRow label="Link" value={formData.driveLink} />
                        <ReviewRow label="File" value={file?.name} />
                        <ReviewRow label="Notes" value={formData.additionalNotes} />
                    </ReviewSection>
                </div>

                <div className="flex items-center gap-3 px-6 py-5 border-t border-dark/10 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-3 rounded-full border border-dark/15 text-dark/60 hover:text-dark hover:border-dark/25 font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                    >
                        Back to Edit
                    </button>
                    <button
                        type="button"
                        id="booking-review-confirm"
                        onClick={onConfirm}
                        disabled={submitting}
                        className="ml-auto flex items-center gap-2.5 px-7 py-3 rounded-full bg-accent text-primary font-mono text-[11px] uppercase tracking-widest hover:bg-accent/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <SpinnerGap size={15} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Confirm & Send
                                <PaperPlaneTilt size={14} weight="bold" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
