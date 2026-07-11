import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextB, TextItalic, ListBullets, LinkSimple } from '@phosphor-icons/react';

function ToolbarButton({ active, onClick, label, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`p-1.5 rounded-md transition-colors duration-150 ${active ? 'text-accent' : 'text-dark/45 hover:text-dark'
                }`}
        >
            {children}
        </button>
    );
}

export default function RichTextField({
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    minHeight = 128,
    maxHeight = 320,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                blockquote: false,
                codeBlock: false,
                horizontalRule: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-accent underline underline-offset-2' },
            }),
            Placeholder.configure({ placeholder: placeholder || 'Start typing...' }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        onBlur: ({ editor }) => onBlur?.(editor.getHTML()),
        editorProps: {
            attributes: {
                class:
                    'focus:outline-none text-dark text-sm leading-relaxed font-sans ' +
                    '[&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_a]:text-accent [&_a]:underline',
            },
        },
    });

    useEffect(() => {
        if (editor && value === '' && editor.getText() !== '') {
            editor.commands.clearContent();
        }
    }, [value, editor]);

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Paste a URL', previousUrl || 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div
            className={`bg-dark/5 border rounded-xl transition-all duration-200 overflow-hidden ${error ? 'border-red-500/40' : 'border-dark/15 focus-within:border-dark/30'
                }`}
        >
            <div className="flex items-center gap-0.5 px-2.5 py-1.5 border-b border-dark/10">
                <ToolbarButton
                    label="Bold"
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <TextB size={14} weight="bold" />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <TextItalic size={14} weight="bold" />
                </ToolbarButton>
                <ToolbarButton
                    label="Bullet list"
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <ListBullets size={14} weight="bold" />
                </ToolbarButton>
                <ToolbarButton label="Link" active={editor.isActive('link')} onClick={setLink}>
                    <LinkSimple size={14} weight="bold" />
                </ToolbarButton>
            </div>

            <div
                onClick={() => editor.chain().focus().run()}
                className="px-4 py-3 overflow-y-auto custom-scrollbar cursor-text"
                style={{ minHeight, maxHeight }}
            >
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}