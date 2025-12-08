'use client';

import React from 'react';
import { JSONContent } from '@tiptap/react';
import Image from 'next/image';

interface BlogContentProps {
    content: JSONContent;
}

export default function BlogContent({ content }: BlogContentProps) {
    const renderNode = (node: JSONContent, index: number): React.ReactElement | null => {
        if (!node.type) return null;

        const key = `${node.type}-${index}`;

        switch (node.type) {
            case 'doc':
                return (
                    <div key={key}>
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </div>
                );

            case 'paragraph':
                return (
                    <p key={key} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </p>
                );

            case 'heading':
                const headingTag = `h${node.attrs?.level || 2}`;
                const headingClasses = {
                    1: 'text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-white',
                    2: 'text-3xl font-bold mb-5 mt-7 text-gray-900 dark:text-white',
                    3: 'text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-white',
                    4: 'text-xl font-semibold mb-3 mt-5 text-gray-900 dark:text-white',
                    5: 'text-lg font-semibold mb-3 mt-4 text-gray-900 dark:text-white',
                    6: 'text-base font-semibold mb-2 mt-3 text-gray-900 dark:text-white',
                };
                const HeadingComponent = headingTag as React.ElementType;
                return (
                    <HeadingComponent key={key} className={headingClasses[node.attrs?.level as keyof typeof headingClasses] || headingClasses[2]}>
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </HeadingComponent>
                );

            case 'bulletList':
                return (
                    <ul key={key} className="list-disc list-outside mb-4 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </ul>
                );

            case 'orderedList':
                return (
                    <ol key={key} className="list-decimal list-outside mb-4 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </ol>
                );

            case 'listItem':
                return (
                    <li key={key}>
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </li>
                );

            case 'blockquote':
                return (
                    <blockquote key={key} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </blockquote>
                );

            case 'codeBlock':
                return (
                    <pre key={key} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                        <code>{node.content?.map((child, i) => renderNode(child, i))}</code>
                    </pre>
                );

            case 'image':
                return (
                    <div key={key} className="my-6 w-full">
                        <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
                            <Image
                                src={node.attrs?.src || ''}
                                alt={node.attrs?.alt || 'Blog image'}
                                fill
                                className="rounded-lg object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                priority={false}
                            />
                        </div>
                        {node.attrs?.title && (
                            <p className="text-center text-sm text-gray-500 mt-2 italic">
                                {node.attrs.title}
                            </p>
                        )}
                    </div>
                );

            case 'text':
                let text = node.text || '';
                let element: React.ReactElement | string = text;

                if (node.marks) {
                    node.marks.forEach((mark) => {
                        switch (mark.type) {
                            case 'bold':
                                element = <strong key={`${key}-bold`} className="font-bold">{element}</strong>;
                                break;
                            case 'italic':
                                element = <em key={`${key}-italic`} className="italic">{element}</em>;
                                break;
                            case 'underline':
                                element = <u key={`${key}-underline`}>{element}</u>;
                                break;
                            case 'strike':
                                element = <s key={`${key}-strike`}>{element}</s>;
                                break;
                            case 'code':
                                element = <code key={`${key}-code`} className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
                                break;
                            case 'link':
                                element = (
                                    <a
                                        key={`${key}-link`}
                                        href={mark.attrs?.href || '#'}
                                        target={mark.attrs?.target}
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {element}
                                    </a>
                                );
                                break;
                        }
                    });
                }

                return <span key={key}>{element}</span>;

            case 'hardBreak':
                return <br key={key} />;

            default:
                return null;
        }
    };

    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderNode(content, 0)}
        </div>
    );
}
