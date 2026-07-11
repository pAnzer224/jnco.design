import React from 'react';
import { Link as LinkIcon, CheckCircle, Warning, Paperclip, X } from '@phosphor-icons/react';
import Field from '../Field';
import StepShell from '../StepShell';
import { inputClass, isValidShareableLink } from '../helpers';

export default function Step4References({
    formData,
    handleChange,
    file,
    setFile,
    fileInputRef,
    driveLinkValid,
    setDriveLinkValid,
}) {
    return (
        <StepShell title="References">
            <Field
                label="Google Drive / Figma / Notion Link"
                hint="Paste a shareable link to your references, brief, or assets. Supports Google Drive, Figma, Notion, and Dropbox."
            >
                <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/30 pointer-events-none">
                        <LinkIcon size={16} weight="bold" />
                    </div>
                    <input
                        id="booking-drive-link"
                        type="url"
                        value={formData.driveLink}
                        onChange={(e) => {
                            handleChange('driveLink', e.target.value);
                            setDriveLinkValid(isValidShareableLink(e.target.value));
                        }}
                        className={`${inputClass()} pl-9 pr-9`}
                        placeholder="https://drive.google.com/drive/folders/..."
                    />
                    {formData.driveLink && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            {driveLinkValid === true && (
                                <CheckCircle size={15} className="text-green-600" weight="fill" />
                            )}
                            {driveLinkValid === false && (
                                <Warning size={15} className="text-amber-500" weight="fill" />
                            )}
                        </div>
                    )}
                </div>
                {driveLinkValid === false && formData.driveLink && (
                    <p className="text-amber-500 font-mono text-[10px] pl-0.5 font-bold">
                        This doesn't look like a Drive/Figma/Notion link — double-check it's shareable.
                    </p>
                )}
            </Field>

            <Field label="Or Upload Directly">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-dark/15 hover:border-dark/30 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 bg-dark/[0.02] group"
                >
                    <div className="w-10 h-10 rounded-xl bg-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-dark/10 transition-colors">
                        <Paperclip
                            size={18}
                            weight="duotone"
                            className="text-dark/45 group-hover:text-dark/70 transition-colors"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-dark/60 group-hover:text-dark/80 transition-colors font-sans truncate">
                            {file ? file.name : 'Click to attach a file'}
                        </p>
                        <p className="text-dark/35 font-mono text-[10px] mt-0.5">
                            Images, PDF, DOC — max 10MB
                        </p>
                    </div>
                    {file && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                            }}
                            className="ml-auto text-dark/30 hover:text-dark/60 transition-colors flex-shrink-0"
                        >
                            <X size={15} />
                        </button>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                    />
                </div>
            </Field>

            <Field label="Additional Notes">
                <textarea
                    id="booking-notes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange('additionalNotes', e.target.value)}
                    rows={4}
                    className={`${inputClass()} resize-none leading-relaxed`}
                    placeholder="Anything else I should know? Specific requirements, deadlines, must-haves..."
                />
            </Field>
        </StepShell>
    );
}