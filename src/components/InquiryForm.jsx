import React, { useState, useRef } from 'react';
import { submitInquiry, uploadReferenceFile } from '../lib/pipeline-api';
import { Paperclip, CheckCircle, SpinnerGap } from '@phosphor-icons/react';

const PROJECT_TYPES = ['UI/UX Design', 'Graphic Design', 'Web Design/Frontend Dev', 'Branding', 'Other'];
const BUDGET_RANGES = ['Under ₱10K', '₱10K-30K', '₱30K-50K', '₱50K+', 'Not sure yet'];
const TIMELINES = ['ASAP', 'Within 2 weeks', 'Within a month', 'Flexible'];

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    projectType: PROJECT_TYPES[0],
    description: '',
    budget: BUDGET_RANGES[0],
    timeline: TIMELINES[0],
    referenceLinks: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      let fileUrl = null;
      if (file) {
        const uploadRes = await uploadReferenceFile(file);
        if (uploadRes.success) {
          fileUrl = uploadRes.url;
        }
      }

      const inquiryData = {
        ...formData,
        referenceFileUrl: fileUrl,
      };

      const res = await submitInquiry(inquiryData);

      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
        <CheckCircle size={64} weight="duotone" className="text-green-400" />
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Inquiry Sent Successfully</h3>
          <p className="text-white/60 font-mono text-sm">Thanks! I'll get back to you within 24-48 hours.</p>
        </div>
        <button
          onClick={() => {
            setFormData({ name: '', email: '', contact: '', projectType: PROJECT_TYPES[0], description: '', budget: BUDGET_RANGES[0], timeline: TIMELINES[0], referenceLinks: '' });
            setFile(null);
            setStatus('idle');
          }}
          className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-mono text-xs uppercase tracking-widest transition-all"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Let's work together</h2>
        <p className="text-white/60 font-mono text-xs uppercase tracking-widest">Tell me about your project</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Full Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Email Address *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Contact Number</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all" placeholder="+63 900 000 0000" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Project Type *</label>
            <select name="projectType" value={formData.projectType} onChange={handleChange} className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all appearance-none cursor-pointer">
              {PROJECT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Project Description *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all resize-none custom-scrollbar" placeholder="What do you need done?"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Budget Range *</label>
            <select name="budget" value={formData.budget} onChange={handleChange} className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all appearance-none cursor-pointer">
              {BUDGET_RANGES.map(budget => <option key={budget} value={budget}>{budget}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Timeline *</label>
            <select name="timeline" value={formData.timeline} onChange={handleChange} className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all appearance-none cursor-pointer">
              {TIMELINES.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">Reference Links</label>
          <input type="text" name="referenceLinks" value={formData.referenceLinks} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all" placeholder="e.g., https://example.com" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/80 font-mono text-xs uppercase tracking-widest pl-1">File Upload</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/10 hover:border-white/30 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-white/5 group"
          >
            <Paperclip size={24} weight="duotone" className="text-white/40 group-hover:text-white/70 mb-2 transition-colors" />
            <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors font-mono">
              {file ? file.name : 'Click to attach brief, logo, or reference images'}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="p-4 rounded-xl bg-red-500/20 text-red-300 text-sm font-mono text-center border border-red-500/30">
            An error occurred while submitting your inquiry. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-4 w-full py-4 rounded-xl bg-white text-black font-bold font-mono uppercase tracking-widest hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <SpinnerGap size={20} className="animate-spin" />
              Sending...
            </>
          ) : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
