export interface EducationItem {
  institution: string;
  period: string;
  details?: string;
}

export interface ActivityItem {
  title: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  subtitle: string;
}

export interface HighlightItem {
  label: string;
  value: string;
}

export const PORTFOLIO_DATA = {
  name: "Bera Sravan Kumar",
  brandName: "BERA SRAVAN KUMAR",
  role: "CSE Student",
  institution: "GMRIT",
  about:
    "CSE student with an interest in software development and cybersecurity. I enjoy learning new technologies, solving problems, and building practical projects. I am a quick learner who is always looking for opportunities to improve my skills and gain real-world experience.",
  contact: {
    phone: "9392985869",
    displayPhone: "9392985869",
    email: "sravankumarbera@gmail.com",
    location: "GMRIT , RAJAM",
  },
  // Easily replaceable URLs when real profiles are ready
  socialLinks: {
    github: "https://github.com/sravankumarbera",
    linkedin: "https://www.linkedin.com/in/sravankumarbera/",
    leetcode: "https://leetcode.com/u/sravankumarbera/",
  },
  highlights: [
    { label: "Semester II", value: "9.23" },
    { label: "Branch", value: "CSE" },
    { label: "B.Tech", value: "2025–29" },
    { label: "Certifications", value: "2" },
  ] as HighlightItem[],
  education: [
    {
      institution: "B.Tech — GMRITDU",
      period: "2025 – 2029",
      details: "Semester I — 9.2 · Semester II — 9.23",
    },
    {
      institution: "Sainik School Korukonda",
      period: "2017 – 2024",
      details: "Class XII — 84.6% · Class X — 87.5%",
    },
  ] as EducationItem[],
  skills: {
    technical: ["C", "Python", "SQL"],
    professional: ["Communication", "Teamwork"],
  },
  activities: [
    {
      title: "TCS Student Ambassador",
      description: "Student ambassador role.",
    },
    {
      title: "Coding Club Coordinator",
      description: "Coding club coordination and student technical involvement.",
    },
    {
      title: "NSS Volunteer",
      description: "Volunteer involvement through NSS.",
    },
  ] as ActivityItem[],
  certifications: [
    {
      title: "National Cadet Corps",
      subtitle: "NCC 'C' Certificate",
    },
    {
      title: "L&T EduTech",
      subtitle: "Python Programming",
    },
  ] as CertificationItem[],
};
