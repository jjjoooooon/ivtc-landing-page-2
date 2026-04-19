"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

/**
 * Client-side sanitized HTML renderer.
 * Prevents server-side crashes related to JSDOM/DOMPurify
 * during Server Component rendering.
 */
export default function SanitizedContent({ html, className = "" }) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    if (html) {
      setSanitized(DOMPurify.sanitize(String(html)));
    }
  }, [html]);

  if (!html) return null;

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized || "..." }}
    />
  );
}
