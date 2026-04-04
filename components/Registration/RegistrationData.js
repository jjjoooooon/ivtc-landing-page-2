import { BookOpen, GraduationCap, Users, Globe } from "lucide-react";

export const REGISTRATION_TYPES = [
    {
        id: "al",
        title: "A/L ICT",
        tags: ["Local", "Cambridge"],
        desc: "Master the syllabus with top instructors.",
        icon: BookOpen,
    },
    {
        id: "course",
        title: "Pro Courses",
        tags: ["CCNA", "CompTIA"],
        desc: "Industry programs for impact.",
        icon: Globe,
    },
    {
        id: "membership",
        title: "Membership",
        tags: ["Network", "Community"],
        desc: "IT professional network.",
        icon: Users,
    },
    {
        id: "degree",
        title: "BIT Degree",
        tags: ["Moratuwa", "Colombo"],
        desc: "Degree pathways.",
        icon: GraduationCap,
    },
];

export const SRI_LANKA_DISTRICTS = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Mannar", "Vavuniya",
    "Mullaitivu", "Kilinochchi", "Batticaloa", "Ampara", "Trincomalee",
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
    "Moneragala", "Ratnapura", "Kegalle",
];

export const COUNTRIES = [
    { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { name: "UAE", code: "+971", flag: "🇦🇪" },
    { name: "Qatar", code: "+974", flag: "🇶🇦" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "UK", code: "+44", flag: "🇬🇧" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "USA", code: "+1", flag: "🇺🇸" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
];

export const COURSES = {
    course: ["Software Engineering", "Data Science", "Cyber Security", "Cloud Computing", "Web Development", "Mobile App Development"],
    al: ["A/L ICT Regular", "A/L ICT Revision", "Practical Sessions"],
    membership: ["General Membership", "Student Membership", "Professional Membership"],
    degree: ["BIT - University of Moratuwa", "BIT - University of Colombo", "Foundation Program", "Diploma Programs"],
};
