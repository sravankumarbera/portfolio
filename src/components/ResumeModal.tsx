/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { FileText, Download, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-inverse-surface/60 backdrop-blur-xs no-print overflow-y-auto"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[94vh] flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant shadow-2xl overflow-hidden animate-fadeIn my-auto"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant bg-surface shrink-0">
          <div className="flex items-center gap-2">
            <FileText aria-hidden="true" className="w-5 h-5 text-primary shrink-0" />
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              BERA SRAVAN KUMAR — RESUME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3.5 py-1.5 rounded bg-primary-container text-on-primary text-body-sm font-body-sm font-medium inline-flex items-center gap-1.5 hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
              title="Download or Print as PDF"
              type="button"
              onClick={handlePrint}
            >
              <Download aria-hidden="true" className="w-4 h-4 shrink-0" />
              <span>Download PDF</span>
            </button>

            <button
              aria-label="Close resume preview"
              className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
              type="button"
              onClick={onClose}
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="overflow-y-auto p-3 sm:p-6 md:p-8 bg-surface-container-low/50">
          {/* Printable Document Sheet matching the exact resume */}
          <div
            id="resume-document"
            className="bg-white border border-gray-300 p-8 sm:p-12 md:p-14 rounded-xs shadow-sm max-w-2xl mx-auto space-y-6 text-[#1a1a1a] font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {/* Header: Centered Name & Subtitle */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                BERA SRAVAN KUMAR
              </h1>
              <p className="text-sm sm:text-base text-[#333333] lowercase font-normal tracking-wide">
                cse student
              </p>

              {/* Contact Information Bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-[12px] sm:text-[13px] text-[#333333]">
                <a
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  href={`tel:${PORTFOLIO_DATA.contact.phone}`}
                  target="_top"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.74 21 3 13.26 3 3.5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>{PORTFOLIO_DATA.contact.phone}</span>
                </a>

                <a
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  target="_top"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>{PORTFOLIO_DATA.contact.email}</span>
                </a>

                <span className="inline-flex items-center gap-1.5 text-[#333333]">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                  <span>GMRIT , RAJAM</span>
                </span>
              </div>
            </div>

            <hr className="border-t border-gray-400 my-4" />

            {/* ABOUT ME */}
            <section className="space-y-2">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide">
                ABOUT ME
              </h2>
              <p className="text-[13px] sm:text-sm text-[#222222] leading-relaxed">
                {PORTFOLIO_DATA.about}
              </p>
            </section>

            <hr className="border-t border-gray-400 my-4" />

            {/* EDUCATION */}
            <section className="space-y-4">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide">
                EDUCATION
              </h2>

              {/* GMRITDU Entry */}
              <div className="space-y-1 text-[13px] sm:text-sm">
                <div className="flex flex-wrap items-center justify-between text-[#222222] font-medium">
                  <span className="uppercase">GMRITDU</span>
                  <span>2025-2029</span>
                </div>
                <div className="text-[#333333] uppercase">BTECH</div>
                <div className="text-[#333333] uppercase">SEM I - 9.2</div>
                <div className="text-[#333333] uppercase">SEM II - 9.23</div>
              </div>

              {/* Sainik School Korukonda Entry */}
              <div className="space-y-1 text-[13px] sm:text-sm pt-1">
                <div className="flex flex-wrap items-center justify-between text-[#222222] font-medium">
                  <span className="uppercase">SAINIK SCHOOL KORUKONDA</span>
                  <span>2017-2024</span>
                </div>
                <div className="text-[#333333] uppercase">CLASS XII - 84.6%</div>
                <div className="text-[#333333] uppercase">CLASS X - 87.5%</div>
              </div>
            </section>

            <hr className="border-t border-gray-400 my-4" />

            {/* LEADERSHIP & ACTIVITIES */}
            <section className="space-y-2.5">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide">
                LEADERSHIP &amp; ACTIVITIES
              </h2>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-[#333333]">
                <li className="flex items-start gap-2">
                  <span className="text-[#555555]">•</span>
                  <span className="uppercase">TCS STUDENT AMBASSDOR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#555555]">•</span>
                  <span className="uppercase">CODING CLUB COORDINATOR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#555555]">•</span>
                  <span className="uppercase">NSS VOLUNTEER</span>
                </li>
              </ul>
            </section>

            <hr className="border-t border-gray-400 my-4" />

            {/* CERTIFICATIONS */}
            <section className="space-y-2.5">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide">
                CERTIFICATIONS
              </h2>
              <ul className="space-y-2 text-[13px] sm:text-sm text-[#333333]">
                <li className="flex items-start gap-2">
                  <span className="text-[#555555]">•</span>
                  <span className="uppercase">NATIONAL CADET CORPS - NCC 'C' CERTIFICATE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#555555]">•</span>
                  <span>L&amp;T EduTech – Python Programming</span>
                </li>
              </ul>
            </section>

            <hr className="border-t border-gray-400 my-4" />

            {/* SKILLS */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide">
                SKILLS
              </h2>

              {/* 3 Columns matching uploaded resume image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-[13px] sm:text-sm text-[#333333]">
                {/* Column 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#555555]">•</span>
                    <span className="uppercase">C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#555555]">•</span>
                    <span className="uppercase">COMMUNICATION</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#555555]">•</span>
                    <span className="uppercase">SQL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#555555]">•</span>
                    <span className="uppercase">TEAM WORK</span>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#555555]">•</span>
                    <span className="uppercase">PYTHON</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Links Row at bottom matching uploaded image */}
            <div className="pt-6 border-t border-gray-300 flex flex-wrap items-center justify-around gap-4 text-sm font-medium">
              {/* LinkedIn */}
              <a
                className="inline-flex items-center gap-1.5 text-[#0a66c2] hover:underline"
                href={PORTFOLIO_DATA.socialLinks.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0a66c2] text-white rounded text-[11px] font-bold">
                  in
                </span>
                <span className="text-[#222222] font-semibold">LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                className="inline-flex items-center gap-1.5 text-[#24292f] hover:underline"
                href={PORTFOLIO_DATA.socialLinks.github}
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="text-[#222222] font-semibold">Github</span>
              </a>

              {/* LeetCode */}
              <a
                className="inline-flex items-center gap-1.5 text-[#ffa116] hover:underline"
                href={PORTFOLIO_DATA.socialLinks.leetcode}
                rel="noreferrer"
                target="_blank"
              >
                <span className="text-[#ffa116] font-bold text-lg leading-none">&lt;</span>
                <span className="text-[#222222] font-semibold">LeetCode</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 border-t border-outline-variant bg-surface flex flex-col sm:flex-row justify-between items-center gap-2 text-label-sm font-label-sm text-on-surface-variant shrink-0">
          <span>Click "Download PDF" to save or print this official single-page resume.</span>
          <button
            className="hover:text-primary underline font-medium"
            type="button"
            onClick={onClose}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
