"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { submitInquiry, uploadReferenceFile } from '../../../lib/pipeline-api';
import { CheckCircle, SpinnerGap, Warning, ArrowRight, ArrowLeft } from '@phosphor-icons/react';

import { SERVICE_OPTIONS, SERVICE_PARAM_MAP, STEPS } from './constants';
import useBookingDraft from './useBookingDraft';
import ResumeDraftModal from './ResumeDraftModalx';
import SuccessScreen from './SuccessScreen';
import ReviewModal from './ReviewModal';
import Step1AboutYou from './steps/Step1AboutYou';
import Step2ProjectDetails from './steps/Step2ProjectDetails';
import Step3BudgetTimeline from './steps/Step3BudgetTimeline';
import Step4References from './steps/Step4References';

export default function BookingForm({ onStepChange } = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const serviceParam = searchParams.get('service');
  const preselectedService = serviceParam ? SERVICE_PARAM_MAP[serviceParam] : null;
  const preselectedServiceObj = preselectedService
    ? SERVICE_OPTIONS.find((s) => s.id === preselectedService) || null
    : null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    country: 'PH',
    hasWhatsapp: false,
    company: '',
    website: '',
    howFound: '',
    projectType: preselectedServiceObj,
    description: '',
    serviceDetails: {},
    budget: '',
    timeline: '',
    isRebrand: '',
    driveLink: '',
    additionalNotes: '',
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [driveLinkValid, setDriveLinkValid] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const step1CardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const { showResumeModal, handleResumeDraft, handleDiscardDraft, clearDraft } = useBookingDraft({
    formData,
    setFormData,
    step,
    setStep,
    status,
    hasInteracted,
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      setIsMobile(window.innerWidth < 640);
      if (step1CardRef.current) {
        setCardHeight(step1CardRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const handleChange = (field, value) => {
    setHasInteracted(true);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Changing the service type invalidates any answers to the previous
      // service's questions (e.g. a graphic design answer shouldn't linger
      // after switching to Web Dev).
      ...(field === 'projectType' ? { serviceDetails: {} } : {}),
    }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleToggleChip = (field, value) => {
    setHasInteracted(true);
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  // Single-choice answer to one of the dynamic, per-service Step 2 questions
  // (e.g. "Platform: Web" for UI/UX, "Pages: Landing Page" for Web Dev).
  const handleServiceDetailChange = (key, value) => {
    setHasInteracted(true);
    setFormData((prev) => ({
      ...prev,
      serviceDetails: { ...prev.serviceDetails, [key]: value },
    }));
  };

  // Multi-choice version â€” toggles a value in/out of that question's array
  // (e.g. "Existing Brand Assets: Logo, Fonts").
  const handleServiceDetailToggle = (key, value) => {
    setHasInteracted(true);
    setFormData((prev) => {
      const arr = Array.isArray(prev.serviceDetails[key]) ? prev.serviceDetails[key] : [];
      return {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        },
      };
    });
  };


  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      const nameParts = formData.name.trim().split(/\s+/).filter(Boolean);
      if (!formData.name.trim()) newErrors.name = 'Your name is required';
      else if (nameParts.length < 2) newErrors.name = 'Please enter your first and last name';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email';
    }
    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = 'Please select a service type';
    }
    if (step === 3) {
      if (!formData.budget) newErrors.budget = 'Please select a budget range';
      if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setStatus('submitting');

    try {
      let fileUrl = null;
      if (file) {
        const uploadRes = await uploadReferenceFile(file);
        if (uploadRes.success) fileUrl = uploadRes.url;
      }

      const inquiryData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        hasWhatsapp: formData.hasWhatsapp ? 'Yes' : 'No',
        company: formData.company,
        website: formData.website,
        howFound: formData.howFound,
        projectType: formData.projectType?.label || '',
        description: formData.description,
        serviceDetails: Object.entries(formData.serviceDetails)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join(' | '),
        budget: formData.budget,
        timeline: formData.timeline,
        isRebrand: formData.isRebrand,
        driveLink: formData.driveLink,
        additionalNotes: formData.additionalNotes,
        referenceFileUrl: fileUrl,
      };

      const res = await submitInquiry(inquiryData);
      if (res.success) {
        setStatus('success');
        clearDraft();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleNewInquiry = () => {
    setFormData({
      name: '', email: '', contact: '', hasWhatsapp: false, company: '', website: '',
      howFound: '', projectType: null, description: '', serviceDetails: {},
      budget: '', timeline: '', isRebrand: '', driveLink: '', additionalNotes: '',
    });
    setFile(null);
    setStep(1);
    setStatus('idle');
    clearDraft();
  };

  if (showResumeModal) {
    return <ResumeDraftModal onResume={handleResumeDraft} onDiscard={handleDiscardDraft} />;
  }

  if (status === 'success') {
    return (
      <SuccessScreen
        firstName={formData.name.split(' ')[0]}
        onBackToPortfolio={() => router.push('/')}
        onNewInquiry={handleNewInquiry}
      />
    );
  }

  const stepProps = {
    formData,
    errors,
    handleChange,
    handleToggleChip,
    handleServiceDetailChange,
    handleServiceDetailToggle,
  };

  return (
    <div className="w-full relative">
      {showReview && (
        <ReviewModal
          formData={formData}
          file={file}
          submitting={status === 'submitting'}
          onEdit={(stepNum) => {
            setShowReview(false);
            setStep(stepNum);
          }}
          onCancel={() => setShowReview(false)}
          onConfirm={async () => {
            await handleSubmit();
            setShowReview(false);
          }}
        />
      )}
      <div className="w-full sm:max-w-2xl mx-auto overflow-visible relative">
        <div
          className="flex items-start transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] gap-8"
          style={{
            transform: `translateX(calc(${(1 - step) * 100}% + ${(1 - step) * 2}rem))`,
          }}
        >
          {STEPS.map((s) => {
            const stepNum = s.id;
            const isActive = stepNum === step;
            const isPast = stepNum < step;
            const StepIcon = s.icon;

            return (
              <div
                key={stepNum}
                className="w-full flex-shrink-0 relative"
              >
                {!isActive && !isPast && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-0.5 py-5 px-2 rounded-full bg-dark/30 border border-primary/10 text-primary font-mono text-[9px] font-bold uppercase tracking-widest ${stepNum === 2
                      ? 'right-[8rem] sm:right-[14rem] md:right-[20rem] xl:right-[30rem]'
                      : 'right-[6rem] sm:right-[10rem] md:right-[13rem] xl:right-[17rem]'
                      }`}
                  >
                    <StepIcon size={12} weight="bold" className="mb-2 flex-shrink-0" />
                    {s.label.split('').map((char, idx) => (
                      char === ' ' ? (
                        <div key={idx} className="h-2" />
                      ) : (
                        <span key={idx} className="leading-[1.1] select-none">{char}</span>
                      )
                    ))}
                  </div>
                )}
                <div
                  className={`relative transition-all duration-500 ease-out will-change-transform ${isActive
                    ? 'opacity-100 scale-100 blur-none pointer-events-auto z-10'
                    : 'opacity-20 scale-[0.96] blur-[3px] pointer-events-none z-0'
                    }`}
                  style={
                    !isActive
                      ? {
                        maskImage: isPast
                          ? 'linear-gradient(to left, black 0%, transparent 85%)'
                          : 'linear-gradient(to right, black 0%, transparent 85%)',
                        WebkitMaskImage: isPast
                          ? 'linear-gradient(to left, black 0%, transparent 85%)'
                          : 'linear-gradient(to right, black 0%, transparent 85%)',
                      }
                      : undefined
                  }
                >
                  <div
                    ref={stepNum === 1 ? step1CardRef : null}
                    className="bg-primary text-dark border border-dark/10 rounded-t-[2rem] sm:rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col h-[calc(100dvh-6rem)] sm:h-auto"
                    style={!isMobile && cardHeight ? { height: `${cardHeight}px` } : undefined}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (stepNum === STEPS.length) {
                          if (!validateStep()) return;
                          setShowReview(true);
                        } else {
                          handleNext();
                        }
                      }}
                      className="flex flex-col flex-1 min-h-0"
                    >
                      {stepNum === 1 && <Step1AboutYou {...stepProps} />}

                      {stepNum === 2 && (
                        <Step2ProjectDetails
                          {...stepProps}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                          dropdownRef={dropdownRef}
                        />
                      )}

                      {stepNum === 3 && <Step3BudgetTimeline {...stepProps} />}

                      {stepNum === 4 && (
                        <Step4References
                          {...stepProps}
                          file={file}
                          setFile={setFile}
                          fileInputRef={fileInputRef}
                          driveLinkValid={driveLinkValid}
                          setDriveLinkValid={setDriveLinkValid}
                        />
                      )}

                      {status === 'error' && (
                        <div className="mt-5 p-4 rounded-xl bg-red-500/10 text-red-600 text-xs font-mono border border-red-500/20 flex items-center gap-3 font-semibold">
                          <Warning size={16} weight="fill" className="flex-shrink-0 text-red-500" />
                          Something went wrong. Please try again or email me directly at
                          juneco.mirande@gmail.com
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-0 pt-6 border-t border-dark/10 flex-shrink-0">
                        {stepNum > 1 && (
                          <button
                            id="booking-back-btn"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBack();
                            }}
                            className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-dark/15 text-dark/70 hover:text-dark hover:border-dark/25 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200"
                          >
                            <ArrowLeft size={14} />
                            Back
                          </button>
                        )}

                        <button
                          id={stepNum === STEPS.length ? 'booking-submit-btn' : 'booking-next-btn'}
                          type="submit"
                          disabled={status === 'submitting'}
                          className="ml-auto flex items-center gap-2.5 px-7 py-3 rounded-full bg-accent text-primary font-mono text-[11px] uppercase tracking-widest hover:bg-accent/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(230,59,46,0.2)] hover:shadow-[0_0_24px_rgba(230,59,46,0.35)]"
                        >
                          {status === 'submitting' ? (
                            <>
                              <SpinnerGap size={15} className="animate-spin" />
                              Sending...
                            </>
                          ) : stepNum === STEPS.length ? (
                            <>
                              Submit Inquiry
                              <CheckCircle size={14} weight="bold" />
                            </>
                          ) : (
                            <>
                              Next
                              <ArrowRight size={13} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
