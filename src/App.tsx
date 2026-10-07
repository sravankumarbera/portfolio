/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  FileText,
  Menu,
  X,
  ArrowUpRight,
  Hourglass,
  Mail,
  Copy,
  Check,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolio';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText(PORTFOLIO_DATA.contact.email);
      setCopyState('copied');
      setStatusMessage('Email copied to clipboard!');
      setTimeout(() => {
        setCopyState('idle');
        setStatusMessage(null);
      }, 3500);
    } catch {
      setStatusMessage(`Please copy manually: ${PORTFOLIO_DATA.contact.email}`);
    }
  };

  const handleSendEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Copy email address immediately so user has it in clipboard
    try {
      navigator.clipboard?.writeText(PORTFOLIO_DATA.contact.email);
      setCopyState('copied');
    } catch {
      // ignore
    }

    setStatusMessage('Opening mail client... (Email copied to clipboard)');
    setTimeout(() => {
      setCopyState('idle');
      setStatusMessage(null);
    }, 4000);

    // 2. Dispatch mailto url
    try {
      window.location.href = `mailto:${PORTFOLIO_DATA.contact.email}`;
    } catch {
      // fallback
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId?: string
  ) => {
    if (targetId) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    } else {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', ' ');
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TOP NAVIGATION (Docked Sticky Header) */}
      <header className="bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline full-width top-0 sticky z-50">
        <div className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex justify-between items-center h-16">
          {/* Brand Logo / Name Anchor */}
          <a
            className="font-label-md text-label-md tracking-wider font-semibold text-on-surface dark:text-inverse-on-surface hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors"
            href="#"
            onClick={(e) => handleNavClick(e)}
          >
            {PORTFOLIO_DATA.brandName}
          </a>

          {/* Desktop Navigation Cluster */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-6 text-body-sm font-body-sm"
          >
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#education"
              onClick={(e) => handleNavClick(e, 'education')}
            >
              Education
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              Skills
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#activities"
              onClick={(e) => handleNavClick(e, 'activities')}
            >
              Activities
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#certifications"
              onClick={(e) => handleNavClick(e, 'certifications')}
            >
              Certifications
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded py-1 px-1.5 transition-colors"
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </nav>

          {/* Desktop Trailing Primary Action */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              className="px-3 py-2 text-body-sm font-body-sm font-medium text-on-surface-variant hover:text-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors inline-flex items-center gap-1.5"
              type="button"
              onClick={() => setResumeOpen(true)}
            >
              <FileText aria-hidden="true" className="w-4 h-4 shrink-0" />
              <span>Resume</span>
            </button>
            <a
              className="px-4 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm font-medium text-on-surface hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              id="menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="w-6 h-6" />
              ) : (
                <Menu aria-hidden="true" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <div
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:hidden border-t border-outline-variant bg-surface px-margin-mobile py-4 space-y-3`}
          id="mobile-menu"
        >
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </a>
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#education"
            onClick={(e) => handleNavClick(e, 'education')}
          >
            Education
          </a>
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#skills"
            onClick={(e) => handleNavClick(e, 'skills')}
          >
            Skills
          </a>
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#activities"
            onClick={(e) => handleNavClick(e, 'activities')}
          >
            Activities
          </a>
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#certifications"
            onClick={(e) => handleNavClick(e, 'certifications')}
          >
            Certifications
          </a>
          <a
            className="block text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact
          </a>
          <button
            className="w-full text-left text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded flex items-center gap-1.5"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setResumeOpen(true);
            }}
          >
            <FileText aria-hidden="true" className="w-4 h-4 shrink-0" />
            <span>Resume (View &amp; Download)</span>
          </button>
          <div className="pt-2">
            <a
              className="inline-block px-4 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm font-medium text-on-surface hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Let's Connect
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
        {/* HERO SECTION */}
        <section className="py-20 md:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase">
              {PORTFOLIO_DATA.role}
            </div>
            <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl-mobile md:font-headline-xl text-on-surface tracking-tight leading-tight">
              Hi, I'm Sravan Kumar.
            </h1>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                className="h-10 px-5 rounded bg-primary-container text-on-primary text-body-sm font-body-sm font-medium flex items-center justify-center hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                View My Profile
              </a>
              <button
                className="h-10 px-5 rounded bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm font-medium flex items-center justify-center hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors gap-2"
                type="button"
                onClick={() => setResumeOpen(true)}
              >
                <FileText aria-hidden="true" className="w-4 h-4 shrink-0" />
                <span>Resume</span>
              </button>
              <a
                className="h-10 px-5 rounded bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm font-medium flex items-center justify-center hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact Me
              </a>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 flex items-center space-x-3 text-label-sm font-label-sm text-on-surface-variant">
              <a
                className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors flex items-center gap-1.5"
                href={PORTFOLIO_DATA.socialLinks.github}
                rel="noreferrer"
                target="_blank"
              >
                <span>GitHub</span>
                <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              </a>
              <span className="text-outline-variant">·</span>
              <a
                className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors flex items-center gap-1.5"
                href={PORTFOLIO_DATA.socialLinks.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <span>LinkedIn</span>
                <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              </a>
              <span className="text-outline-variant">·</span>
              <a
                className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors flex items-center gap-1.5"
                href={PORTFOLIO_DATA.socialLinks.leetcode}
                rel="noreferrer"
                target="_blank"
              >
                <span>LeetCode</span>
                <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* PROFILE HIGHLIGHTS */}
        <section aria-label="Profile Highlights" className="py-10 border-t border-b border-outline-variant/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PORTFOLIO_DATA.highlights.map((highlight) => (
              <div key={highlight.label}>
                <div className="font-label-md text-headline-md text-on-surface font-semibold">
                  {highlight.value}
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                  {highlight.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-20 md:py-24 scroll-mt-20" id="about">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                ABOUT
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                A little about me
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                {PORTFOLIO_DATA.about}
              </p>
              <div>
                <button
                  className="inline-flex items-center gap-1.5 text-body-sm font-body-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
                  type="button"
                  onClick={() => setResumeOpen(true)}
                >
                  <FileText aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span>View and Download Full Resume</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="py-16 md:py-20 border-t border-outline-variant/60 scroll-mt-20" id="education">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                EDUCATION
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Academic Journey
              </h2>
            </div>
            <div className="md:col-span-8 space-y-10">
              {PORTFOLIO_DATA.education.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                      {item.institution}
                    </h3>
                    <span className="text-label-sm font-label-sm text-secondary font-medium">
                      {item.period}
                    </span>
                  </div>
                  {item.details && (
                    <div className="text-body-sm font-body-sm text-on-surface-variant">
                      {item.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-16 md:py-20 border-t border-outline-variant/60 scroll-mt-20" id="skills">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                SKILLS
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Tools &amp; Skills
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              {/* Technical */}
              <div>
                <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
                  Technical
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.skills.technical.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 bg-surface-container border border-outline-variant rounded text-label-sm font-label-sm text-on-surface"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* Professional */}
              <div>
                <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
                  Professional
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.skills.professional.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 bg-surface-container border border-outline-variant rounded text-label-sm font-label-sm text-on-surface"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS NOTE SECTION */}
        <section className="py-16 md:py-20 border-t border-outline-variant/60 scroll-mt-20" id="projects">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                PROJECTS
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Selected Work
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="p-6 rounded border border-outline-variant/70 bg-surface-container-low">
                <div className="flex items-center gap-2 text-label-sm font-label-sm text-primary mb-2">
                  <Hourglass aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span>In Progress</span>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Currently working on upcoming academic and software projects. They will be shared here soon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP & ACTIVITIES SECTION */}
        <section className="py-16 md:py-20 border-t border-outline-variant/60 scroll-mt-20" id="activities">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                ACTIVITIES
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Leadership &amp; Involvement
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              {PORTFOLIO_DATA.activities.map((activity, index) => (
                <div key={index}>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                    {activity.title}
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-1.5">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section className="py-16 md:py-20 border-t border-outline-variant/60 scroll-mt-20" id="certifications">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
                CERTIFICATIONS
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Certifications &amp; Learning
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              {PORTFOLIO_DATA.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-baseline justify-between gap-1"
                >
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                    {cert.title}
                  </h3>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">
                    {cert.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-20 md:py-24 border-t border-outline-variant/60 scroll-mt-20" id="contact">
          <div className="max-w-2xl">
            <div className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase mb-2">
              CONTACT
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-3">
              Let's connect.
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mb-8 leading-relaxed">
              I'm always looking for opportunities to learn, improve my skills, and gain real-world experience.
            </p>
            <div className="space-y-4 mb-8 text-body-sm font-body-sm">
              <div className="flex items-center gap-4">
                <span className="text-secondary w-20 text-label-sm uppercase tracking-wider">
                  Phone
                </span>
                <a
                  className="text-on-surface hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors font-label-sm"
                  href={`tel:${PORTFOLIO_DATA.contact.phone}`}
                  target="_top"
                >
                  {PORTFOLIO_DATA.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-secondary w-20 text-label-sm uppercase tracking-wider">
                  Email
                </span>
                <div className="flex items-center gap-2">
                  <a
                    className="text-on-surface hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors font-label-sm"
                    href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                    target="_top"
                    onClick={handleSendEmail}
                  >
                    {PORTFOLIO_DATA.contact.email}
                  </a>
                  <button
                    aria-label="Copy email address"
                    className="text-secondary hover:text-primary transition-colors p-1 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    title="Copy email address"
                    type="button"
                    onClick={handleCopyEmail}
                  >
                    {copyState === 'copied' ? (
                      <Check aria-hidden="true" className="w-4 h-4 shrink-0 text-primary" />
                    ) : (
                      <Copy aria-hidden="true" className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-secondary w-20 text-label-sm uppercase tracking-wider">
                  Social
                </span>
                <div className="flex items-center space-x-3 text-label-sm font-label-sm">
                  <a
                    className="text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded flex items-center gap-1"
                    href={PORTFOLIO_DATA.socialLinks.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <span className="text-outline-variant">·</span>
                  <a
                    className="text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded flex items-center gap-1"
                    href={PORTFOLIO_DATA.socialLinks.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <span className="text-outline-variant">·</span>
                  <a
                    className="text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded flex items-center gap-1"
                    href={PORTFOLIO_DATA.socialLinks.leetcode}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>LeetCode</span>
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="h-10 px-6 rounded bg-primary-container text-on-primary text-body-sm font-body-sm font-medium inline-flex items-center justify-center hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors gap-2"
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  target="_top"
                  onClick={handleSendEmail}
                >
                  <Mail aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span>Send me an email</span>
                </a>

                <button
                  className="h-10 px-4 rounded bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm font-medium inline-flex items-center justify-center hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors gap-1.5"
                  title="Copy email address"
                  type="button"
                  onClick={handleCopyEmail}
                >
                  {copyState === 'copied' ? (
                    <Check aria-hidden="true" className="w-4 h-4 shrink-0 text-primary" />
                  ) : (
                    <Copy aria-hidden="true" className="w-4 h-4 shrink-0" />
                  )}
                  <span>{copyState === 'copied' ? 'Copied' : 'Copy Email'}</span>
                </button>

                <a
                  className="h-10 px-4 rounded bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm font-medium inline-flex items-center justify-center hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors gap-1.5"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    PORTFOLIO_DATA.contact.email
                  )}`}
                  rel="noreferrer"
                  target="_blank"
                  title="Open directly in Gmail Web"
                >
                  <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span>Open in Gmail</span>
                </a>
              </div>

              {statusMessage && (
                <div className="text-body-sm font-body-sm text-primary flex items-center gap-1.5 pt-1">
                  <CheckCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline full-width">
        <div className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand & Description */}
          <div className="text-center md:text-left space-y-1">
            <div className="font-label-md text-label-md tracking-wider font-semibold text-on-surface dark:text-inverse-on-surface">
              {PORTFOLIO_DATA.brandName}
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant dark:text-surface-variant">
              CSE Student · Software Development · Cybersecurity
            </p>
          </div>
          {/* Links & Copyright */}
          <div className="flex flex-col md:items-end items-center space-y-2">
            <div className="flex items-center space-x-3 text-label-sm font-label-sm text-on-surface-variant dark:text-surface-variant">
              <a
                className="hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors"
                href={PORTFOLIO_DATA.socialLinks.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                className="hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors"
                href={PORTFOLIO_DATA.socialLinks.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                className="hover:text-on-surface dark:hover:text-inverse-on-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded transition-colors"
                href={PORTFOLIO_DATA.socialLinks.leetcode}
                rel="noreferrer"
                target="_blank"
              >
                LeetCode
              </a>
            </div>
            <div className="text-label-sm font-label-sm text-secondary">
              © 2026 Sravan Kumar
            </div>
          </div>
        </div>
      </footer>

      {/* RESUME PREVIEW & DOWNLOAD MODAL */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
