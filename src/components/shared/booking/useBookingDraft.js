import { useState, useEffect } from 'react';

const DRAFT_KEY = 'booking-draft-v1';

function hasFormContent(data, currentStep) {
    return (
        currentStep > 1 ||
        Object.values(data).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)))
    );
}

// Persists form progress to localStorage, offers to resume a saved draft on
// first load, and warns before the tab/window closes with unsaved progress.
// Note: the attached file itself can't be restored — browsers won't persist
// File objects to localStorage — everything else (fields, step) comes back.
export default function useBookingDraft({ formData, setFormData, step, setStep, status, hasInteracted }) {
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [pendingDraft, setPendingDraft] = useState(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    // Offer to resume a saved draft on first load
    useEffect(() => {
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.formData && hasFormContent(parsed.formData, parsed.step || 1)) {
                    setPendingDraft(parsed);
                    setShowResumeModal(true);
                }
            }
        } catch (err) {
            console.error('Failed to read saved draft', err);
        } finally {
            setInitialCheckDone(true);
        }
    }, []);

    // Save progress as they go — only once the user has actually touched
    // the form. Without this gate, a pre-selected projectType from a
    // ?service= URL param would count as "content" on first load and
    // immediately re-create a draft even right after discarding one.
    useEffect(() => {
        if (!initialCheckDone || showResumeModal || !hasInteracted) return;
        if (!hasFormContent(formData, step)) {
            clearDraft();
            return;
        }
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, step }));
        } catch (err) {
            console.error('Failed to save draft', err);
        }
    }, [formData, step, showResumeModal, initialCheckDone, hasInteracted]);

    // Prompt before leaving the tab/window while there's unsaved progress
    useEffect(() => {
        if (showResumeModal || status === 'success' || !hasInteracted || !hasFormContent(formData, step)) return;
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [formData, step, status, showResumeModal, hasInteracted]);

    const clearDraft = () => {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch (err) {
            console.error('Failed to clear draft', err);
        }
    };

    const handleResumeDraft = () => {
        if (pendingDraft) {
            setFormData((prev) => ({ ...prev, ...pendingDraft.formData }));
            setStep(pendingDraft.step || 1);
        }
        setShowResumeModal(false);
    };

    const handleDiscardDraft = () => {
        clearDraft();
        setShowResumeModal(false);
    };

    return { showResumeModal, handleResumeDraft, handleDiscardDraft, clearDraft };
}