"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

const decodeHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\r\n/g, "<br />")
    .replace(/\n/g, "<br />");
};

/**
 * Client-side sanitized HTML renderer.
 * Prevents server-side crashes related to JSDOM/DOMPurify
 * during Server Component rendering.
 */
export default function SanitizedContent({ html, className = "" }) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    if (html) {
      const decoded = decodeHtml(html);
      setSanitized(
        DOMPurify.sanitize(decoded, {
          ALLOWED_TAGS: [
            "p", "br", "strong", "em", "u", "s", "span", "a",
            "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
            "blockquote", "pre", "code", "table", "thead", "tbody",
            "tr", "th", "td", "img", "div"
          ],
          ALLOWED_ATTR: ["href", "target", "src", "alt", "class", "style"]
        })
      );
    }
  }, [html]);

  if (!html) return null;

  return (
    <div 
      className={`${className} 
        [&_p]:mb-4 [&_p:last-child]:mb-0
        [&_strong]:font-bold [&_strong]:text-slate-900 dark:[&_strong]:text-white
        [&_em]:italic
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1
        [&_li]:mb-1
        [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-slate-900 dark:[&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-4
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-3
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2
        [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline hover:[&_a]:text-blue-800
        [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote_p]:block
      `}
      dangerouslySetInnerHTML={{ __html: sanitized || "..." }}
    />
  );
}

