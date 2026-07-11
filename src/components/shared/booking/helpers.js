import { DRIVE_PATTERNS } from './constants'

export function isValidShareableLink(url) {
    if (!url) return null;
    return DRIVE_PATTERNS.some((p) => p.test(url));
}

export function inputClass(error) {
    return `w-full bg-dark/5 border ${error ? 'border-red-500/40' : 'border-dark/15 focus:border-dark/30'
        } rounded-xl px-4 py-3 text-dark text-sm placeholder-dark/35 focus:outline-none transition-all duration-200 font-sans`;
}

export function chipClass(active) {
    return `px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest border transition-all duration-200 ${active
        ? 'bg-accent text-primary border-accent shadow-[0_0_12px_rgba(230,59,46,0.25)]'
        : 'bg-dark/5 text-dark/60 border-dark/15 hover:border-dark/25 hover:text-dark'
        }`;
}

export function compactChipClass(active) {
    return `px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide border transition-all duration-150 ${active
        ? 'bg-accent text-primary border-accent'
        : 'bg-dark/5 text-dark/50 border-dark/10 hover:border-dark/20 hover:text-dark'
        }`;
}

export function formatPhoneNumber(digits, country) {
    const clean = digits.replace(/\D/g, '');
    if (country === 'UK') {
        return [clean.slice(0, 4), clean.slice(4, 10)].filter(Boolean).join(' ');
    }
    return [clean.slice(0, 3), clean.slice(3, 6), clean.slice(6, 10)].filter(Boolean).join(' ');
}

export function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function detectServiceDetails(description, serviceConfig, existingDetails) {
    if (!description || !serviceConfig) return {};
    const text = stripHtml(description).toLowerCase();
    const detected = {};
    serviceConfig.fields.forEach((field) => {
        if (field.type === 'text') return;
        const already = existingDetails[field.key];
        const isEmpty = field.type === 'multi' ? !already || already.length === 0 : !already;
        if (!isEmpty) return;
        const matches = field.options.filter((opt) => text.includes(opt.toLowerCase()));
        if (matches.length === 0) return;
        detected[field.key] = field.type === 'multi' ? matches : matches[0];
    });
    return detected;
}

// Title-cases each word of a name — "juan dela cruz" -> "Juan Dela Cruz".
// Doesn't try to be clever about "de la", "Mc", etc. — simple and predictable.
export function formatFullName(name) {
    return name
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}