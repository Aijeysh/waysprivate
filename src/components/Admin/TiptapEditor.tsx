'use client';

import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    ImageIcon,
    Link as LinkIcon,
    UnderlineIcon,
} from 'lucide-react';
import { useCallback } from 'react';

interface TiptapEditorProps {
    content: JSONContent;
    onChange: (content: JSONContent) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            Underline,
            CharacterCount,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class:
                    'prose prose-lg dark:prose-invert max-w-none min-h-[500px] focus:outline-none p-6 prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:ml-0 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-700',
            },
        },
    });

    const addImage = useCallback(async () => {
        if (!editor) return;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    editor.chain().focus().setImage({ src: data.data.url }).run();
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        };

        fileInput.click();
    }, [editor]);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        const previousRel = editor.getAttributes('link').rel;

        const url = window.prompt('URL', previousUrl);
        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // Ask if link should be nofollow
        const isNofollow = window.confirm('Make this link nofollow? (Click OK for nofollow, Cancel for follow)');
        const rel = isNofollow ? 'nofollow' : undefined;

        editor.chain().focus().extendMarkRange('link').setLink({ href: url, rel }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 relative">
            {/* Toolbar - Sticky */}
            <div className="sticky top-0 z-10 flex flex-wrap gap-1 p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                {/* Text Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('underline') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Underline"
                >
                    <UnderlineIcon size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('strike') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('code') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Code"
                >
                    <Code size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                {/* Headings */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('bulletList') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('orderedList') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Ordered List"
                >
                    <ListOrdered size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('blockquote') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Quote"
                >
                    <Quote size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                {/* Media & Links */}
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Add Image"
                >
                    <ImageIcon size={18} />
                </button>

                <button
                    type="button"
                    onClick={setLink}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${editor.isActive('link') ? 'bg-gray-300 dark:bg-gray-600' : ''
                        }`}
                    title="Add Link"
                >
                    <LinkIcon size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                >
                    <Undo size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                >
                    <Redo size={18} />
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />

            {/* Character Count */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400">
                {editor.storage.characterCount?.characters() || 0} characters
            </div>
        </div>
    );
}
