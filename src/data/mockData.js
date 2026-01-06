// Mock data for the African School Portal
// This file contains sample data that mirrors the expected API response structure

// School Information
export const schoolInfo = {
    name: "Unity Secondary School",
    motto: "Knowledge, Integrity, Excellence",
    address: "23 Education Avenue, Victoria Island, Lagos, Nigeria",
    phone: "+234 801 234 5678",
    email: "info@unityschool.edu.ng",
    website: "www.unityschool.edu.ng",
    logo: "/images/school-logo.png",
    established: 1985,
    currentSession: "2025/2026",
    currentTerm: "First Term",
};

// Academic Sessions
export const academicSessions = [
    { id: 1, name: "2025/2026", isCurrent: true },
    { id: 2, name: "2024/2025", isCurrent: false },
    { id: 3, name: "2023/2024", isCurrent: false },
];

export const terms = [
    { id: 1, name: "First Term", startDate: "2025-09-09", endDate: "2025-12-15" },
    { id: 2, name: "Second Term", startDate: "2026-01-06", endDate: "2026-04-10" },
    { id: 3, name: "Third Term", startDate: "2026-04-27", endDate: "2026-07-25" },
];

// Classes and Arms
export const classes = [
    { id: 1, name: "JSS 1", level: "Junior", arms: ["A", "B", "C"] },
    { id: 2, name: "JSS 2", level: "Junior", arms: ["A", "B", "C"] },
    { id: 3, name: "JSS 3", level: "Junior", arms: ["A", "B", "C"] },
    { id: 4, name: "SS 1", level: "Senior", arms: ["Science", "Arts", "Commercial"] },
    { id: 5, name: "SS 2", level: "Senior", arms: ["Science", "Arts", "Commercial"] },
    { id: 6, name: "SS 3", level: "Senior", arms: ["Science", "Arts", "Commercial"] },
];

// Subjects
export const subjects = [
    { id: 1, name: "Mathematics", code: "MTH", category: "Core" },
    { id: 2, name: "English Language", code: "ENG", category: "Core" },
    { id: 3, name: "Physics", code: "PHY", category: "Science" },
    { id: 4, name: "Chemistry", code: "CHM", category: "Science" },
    { id: 5, name: "Biology", code: "BIO", category: "Science" },
    { id: 6, name: "Economics", code: "ECO", category: "Commercial" },
    { id: 7, name: "Government", code: "GOV", category: "Arts" },
    { id: 8, name: "Literature in English", code: "LIT", category: "Arts" },
    { id: 9, name: "Civic Education", code: "CVE", category: "Core" },
    { id: 10, name: "Computer Studies", code: "CMP", category: "Core" },
    { id: 11, name: "Agricultural Science", code: "AGR", category: "Vocational" },
    { id: 12, name: "History", code: "HIS", category: "Arts" },
];

// Users
export const students = [
    {
        id: 1,
        regNumber: "USS/2024/001",
        firstName: "Adaeze",
        lastName: "Okonkwo",
        email: "adaeze.o@student.unityschool.edu.ng",
        gender: "Female",
        dateOfBirth: "2010-03-15",
        class: "SS 2",
        arm: "Science",
        parentId: 1,
        avatar: "/images/avatars/student1.jpg",
        status: "Active",
        enrollmentDate: "2021-09-09",
    },
    {
        id: 2,
        regNumber: "USS/2024/002",
        firstName: "Chukwuemeka",
        lastName: "Nwosu",
        email: "emeka.n@student.unityschool.edu.ng",
        gender: "Male",
        dateOfBirth: "2010-07-22",
        class: "SS 2",
        arm: "Science",
        parentId: 2,
        avatar: "/images/avatars/student2.jpg",
        status: "Active",
        enrollmentDate: "2021-09-09",
    },
    {
        id: 3,
        regNumber: "USS/2024/003",
        firstName: "Fatima",
        lastName: "Bello",
        email: "fatima.b@student.unityschool.edu.ng",
        gender: "Female",
        dateOfBirth: "2011-01-08",
        class: "SS 1",
        arm: "Arts",
        parentId: 3,
        avatar: "/images/avatars/student3.jpg",
        status: "Active",
        enrollmentDate: "2022-09-05",
    },
    {
        id: 4,
        regNumber: "USS/2024/004",
        firstName: "Oluwaseun",
        lastName: "Adeyemi",
        email: "seun.a@student.unityschool.edu.ng",
        gender: "Male",
        dateOfBirth: "2010-11-30",
        class: "SS 2",
        arm: "Commercial",
        parentId: 4,
        avatar: "/images/avatars/student4.jpg",
        status: "Active",
        enrollmentDate: "2021-09-09",
    },
];

export const teachers = [
    {
        id: 1,
        staffId: "TCH/2020/001",
        firstName: "Dr. Ngozi",
        lastName: "Eze",
        email: "ngozi.eze@unityschool.edu.ng",
        gender: "Female",
        phone: "+234 802 345 6789",
        subjects: ["Physics", "Mathematics"],
        classes: ["SS 1 Science", "SS 2 Science", "SS 3 Science"],
        avatar: "/images/avatars/teacher1.jpg",
        status: "Active",
        qualification: "Ph.D Physics",
    },
    {
        id: 2,
        staffId: "TCH/2019/002",
        firstName: "Mr. Abubakar",
        lastName: "Ibrahim",
        email: "abubakar.i@unityschool.edu.ng",
        gender: "Male",
        phone: "+234 803 456 7890",
        subjects: ["English Language", "Literature in English"],
        classes: ["SS 1 Arts", "SS 2 Arts", "JSS 3A"],
        avatar: "/images/avatars/teacher2.jpg",
        status: "Active",
        qualification: "M.A English",
    },
    {
        id: 3,
        staffId: "TCH/2021/003",
        firstName: "Mrs. Folake",
        lastName: "Ogundimu",
        email: "folake.o@unityschool.edu.ng",
        gender: "Female",
        phone: "+234 804 567 8901",
        subjects: ["Economics", "Commerce"],
        classes: ["SS 1 Commercial", "SS 2 Commercial"],
        avatar: "/images/avatars/teacher3.jpg",
        status: "Active",
        qualification: "M.Sc Economics",
    },
];

export const parents = [
    {
        id: 1,
        title: "Chief",
        firstName: "Obiora",
        lastName: "Okonkwo",
        email: "obiora.okonkwo@email.com",
        phone: "+234 805 678 9012",
        occupation: "Business Executive",
        address: "45 Marina Road, Lagos",
        children: [1],
    },
    {
        id: 2,
        title: "Engr.",
        firstName: "Emmanuel",
        lastName: "Nwosu",
        email: "emmanuel.nwosu@email.com",
        phone: "+234 806 789 0123",
        occupation: "Civil Engineer",
        address: "12 GRA, Port Harcourt",
        children: [2],
    },
    {
        id: 3,
        title: "Alhaji",
        firstName: "Musa",
        lastName: "Bello",
        email: "musa.bello@email.com",
        phone: "+234 807 890 1234",
        occupation: "Government Official",
        address: "8 Maitama, Abuja",
        children: [3],
    },
    {
        id: 4,
        title: "Dr.",
        firstName: "Adekunle",
        lastName: "Adeyemi",
        email: "adekunle.adeyemi@email.com",
        phone: "+234 808 901 2345",
        occupation: "Medical Doctor",
        address: "22 Bodija, Ibadan",
        children: [4],
    },
];

// Results / Scores
export const studentResults = [
    {
        studentId: 1,
        session: "2025/2026",
        term: "First Term",
        class: "SS 2",
        arm: "Science",
        results: [
            { subject: "Mathematics", ca1: 18, ca2: 17, exam: 58, total: 93, grade: "A1", remark: "Excellent" },
            { subject: "English Language", ca1: 15, ca2: 16, exam: 52, total: 83, grade: "B2", remark: "Very Good" },
            { subject: "Physics", ca1: 19, ca2: 18, exam: 55, total: 92, grade: "A1", remark: "Excellent" },
            { subject: "Chemistry", ca1: 17, ca2: 15, exam: 50, total: 82, grade: "B2", remark: "Very Good" },
            { subject: "Biology", ca1: 16, ca2: 17, exam: 54, total: 87, grade: "A2", remark: "Excellent" },
            { subject: "Civic Education", ca1: 14, ca2: 15, exam: 48, total: 77, grade: "B3", remark: "Good" },
            { subject: "Computer Studies", ca1: 18, ca2: 19, exam: 57, total: 94, grade: "A1", remark: "Excellent" },
        ],
        totalScore: 608,
        average: 86.86,
        position: 2,
        classSize: 45,
        teacherRemark: "An outstanding student. Keep up the excellent work!",
        principalRemark: "Impressive performance. Continue to excel.",
    },
];

// Timetable
export const timetable = [
    {
        day: "Monday", periods: [
            { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Dr. Ngozi Eze" },
            { time: "8:45 - 9:30", subject: "English Language", teacher: "Mr. Abubakar Ibrahim" },
            { time: "9:30 - 10:00", subject: "Break", teacher: null },
            { time: "10:00 - 10:45", subject: "Physics", teacher: "Dr. Ngozi Eze" },
            { time: "10:45 - 11:30", subject: "Chemistry", teacher: "Mrs. Amaka Okoli" },
            { time: "11:30 - 12:15", subject: "Biology", teacher: "Mr. Taiwo Adeleke" },
            { time: "12:15 - 1:00", subject: "Lunch Break", teacher: null },
            { time: "1:00 - 1:45", subject: "Computer Studies", teacher: "Mr. Chidi Uzoma" },
            { time: "1:45 - 2:30", subject: "Civic Education", teacher: "Mrs. Grace Obi" },
        ]
    },
    {
        day: "Tuesday", periods: [
            { time: "8:00 - 8:45", subject: "English Language", teacher: "Mr. Abubakar Ibrahim" },
            { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Dr. Ngozi Eze" },
            { time: "9:30 - 10:00", subject: "Break", teacher: null },
            { time: "10:00 - 10:45", subject: "Biology", teacher: "Mr. Taiwo Adeleke" },
            { time: "10:45 - 11:30", subject: "Physics", teacher: "Dr. Ngozi Eze" },
            { time: "11:30 - 12:15", subject: "Chemistry", teacher: "Mrs. Amaka Okoli" },
            { time: "12:15 - 1:00", subject: "Lunch Break", teacher: null },
            { time: "1:00 - 1:45", subject: "Agricultural Science", teacher: "Mr. James Olu" },
            { time: "1:45 - 2:30", subject: "Physical Education", teacher: "Coach Benson" },
        ]
    },
    {
        day: "Wednesday", periods: [
            { time: "8:00 - 8:45", subject: "Physics", teacher: "Dr. Ngozi Eze" },
            { time: "8:45 - 9:30", subject: "Chemistry", teacher: "Mrs. Amaka Okoli" },
            { time: "9:30 - 10:00", subject: "Break", teacher: null },
            { time: "10:00 - 10:45", subject: "Mathematics", teacher: "Dr. Ngozi Eze" },
            { time: "10:45 - 11:30", subject: "English Language", teacher: "Mr. Abubakar Ibrahim" },
            { time: "11:30 - 12:15", subject: "Computer Studies", teacher: "Mr. Chidi Uzoma" },
            { time: "12:15 - 1:00", subject: "Lunch Break", teacher: null },
            { time: "1:00 - 1:45", subject: "Biology", teacher: "Mr. Taiwo Adeleke" },
            { time: "1:45 - 2:30", subject: "Civic Education", teacher: "Mrs. Grace Obi" },
        ]
    },
    {
        day: "Thursday", periods: [
            { time: "8:00 - 8:45", subject: "Chemistry", teacher: "Mrs. Amaka Okoli" },
            { time: "8:45 - 9:30", subject: "Physics", teacher: "Dr. Ngozi Eze" },
            { time: "9:30 - 10:00", subject: "Break", teacher: null },
            { time: "10:00 - 10:45", subject: "English Language", teacher: "Mr. Abubakar Ibrahim" },
            { time: "10:45 - 11:30", subject: "Mathematics", teacher: "Dr. Ngozi Eze" },
            { time: "11:30 - 12:15", subject: "Biology", teacher: "Mr. Taiwo Adeleke" },
            { time: "12:15 - 1:00", subject: "Lunch Break", teacher: null },
            { time: "1:00 - 2:30", subject: "Laboratory Practical", teacher: "Science Teachers" },
        ]
    },
    {
        day: "Friday", periods: [
            { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Dr. Ngozi Eze" },
            { time: "8:45 - 9:30", subject: "Biology", teacher: "Mr. Taiwo Adeleke" },
            { time: "9:30 - 10:00", subject: "Break", teacher: null },
            { time: "10:00 - 10:45", subject: "Physics", teacher: "Dr. Ngozi Eze" },
            { time: "10:45 - 11:30", subject: "Computer Studies", teacher: "Mr. Chidi Uzoma" },
            { time: "11:30 - 12:15", subject: "English Language", teacher: "Mr. Abubakar Ibrahim" },
            { time: "12:15 - 1:00", subject: "Lunch Break", teacher: null },
            { time: "1:00 - 1:45", subject: "Club Activities", teacher: null },
            { time: "1:45 - 2:30", subject: "Assembly / Dismissal", teacher: null },
        ]
    },
];

// Fees
export const feeStructure = {
    session: "2025/2026",
    term: "First Term",
    items: [
        { name: "Tuition Fee", amount: 150000 },
        { name: "Development Levy", amount: 25000 },
        { name: "Laboratory Fee", amount: 15000 },
        { name: "Computer Fee", amount: 10000 },
        { name: "Library Fee", amount: 5000 },
        { name: "Sports Fee", amount: 5000 },
        { name: "Exam Fee", amount: 10000 },
    ],
    total: 220000,
};

export const feePayments = [
    {
        studentId: 1,
        session: "2025/2026",
        term: "First Term",
        amountPaid: 220000,
        amountDue: 0,
        status: "Paid",
        paymentDate: "2025-09-05",
        receiptNumber: "RCP/2025/00123",
    },
    {
        studentId: 2,
        session: "2025/2026",
        term: "First Term",
        amountPaid: 150000,
        amountDue: 70000,
        status: "Partial",
        paymentDate: "2025-09-10",
        receiptNumber: "RCP/2025/00145",
    },
    {
        studentId: 3,
        session: "2025/2026",
        term: "First Term",
        amountPaid: 0,
        amountDue: 220000,
        status: "Unpaid",
        paymentDate: null,
        receiptNumber: null,
    },
];

// Announcements
export const announcements = [
    {
        id: 1,
        title: "Mid-Term Break Notice",
        content: "Dear Parents and Students, please be informed that the mid-term break will commence on October 21st and end on October 28th, 2025. Students are expected to resume on October 29th, 2025.",
        author: "Principal",
        date: "2025-10-15",
        priority: "high",
        targetAudience: ["all"],
    },
    {
        id: 2,
        title: "Inter-House Sports Competition",
        content: "The annual Inter-House Sports Competition will hold on November 15th, 2025. All students are encouraged to participate. Parents are cordially invited to attend.",
        author: "Sports Director",
        date: "2025-10-20",
        priority: "normal",
        targetAudience: ["students", "parents"],
    },
    {
        id: 3,
        title: "First Term Examination Timetable",
        content: "The First Term Examination will commence on December 1st, 2025. Detailed timetables have been uploaded to the portal. Students should prepare adequately.",
        author: "Academic Director",
        date: "2025-11-01",
        priority: "high",
        targetAudience: ["students", "teachers"],
    },
    {
        id: 4,
        title: "PTA Meeting",
        content: "A PTA meeting has been scheduled for November 8th, 2025 at 10:00 AM in the school hall. All parents are expected to attend.",
        author: "PTA Chairman",
        date: "2025-10-25",
        priority: "normal",
        targetAudience: ["parents"],
    },
    {
        id: 5,
        title: "Science Fair 2025",
        content: "The annual Science Fair will hold on November 22nd, 2025. Science students are encouraged to submit their project proposals to their subject teachers by November 10th.",
        author: "Science Department",
        date: "2025-10-28",
        priority: "normal",
        targetAudience: ["students", "teachers"],
    },
];

// Dashboard Statistics
export const dashboardStats = {
    admin: {
        totalStudents: 1250,
        totalTeachers: 68,
        totalClasses: 18,
        totalSubjects: 24,
        pendingResults: 12,
        activeParents: 980,
        feesCollected: 185000000,
        outstandingFees: 42000000,
    },
    teacher: {
        assignedClasses: 5,
        totalStudents: 215,
        pendingScores: 3,
        upcomingClasses: 4,
    },
    student: {
        enrolledSubjects: 9,
        averageScore: 78.5,
        classPosition: 5,
        attendanceRate: 95,
    },
    parent: {
        numberOfChildren: 2,
        outstandingFees: 70000,
        upcomingEvents: 3,
    },
};

// Grading System (WAEC Style)
export const gradingSystem = {
    name: "WAEC/NECO Style",
    grades: [
        { grade: "A1", minScore: 75, maxScore: 100, points: 1, remark: "Excellent" },
        { grade: "B2", minScore: 70, maxScore: 74, points: 2, remark: "Very Good" },
        { grade: "B3", minScore: 65, maxScore: 69, points: 3, remark: "Good" },
        { grade: "C4", minScore: 60, maxScore: 64, points: 4, remark: "Credit" },
        { grade: "C5", minScore: 55, maxScore: 59, points: 5, remark: "Credit" },
        { grade: "C6", minScore: 50, maxScore: 54, points: 6, remark: "Credit" },
        { grade: "D7", minScore: 45, maxScore: 49, points: 7, remark: "Pass" },
        { grade: "E8", minScore: 40, maxScore: 44, points: 8, remark: "Pass" },
        { grade: "F9", minScore: 0, maxScore: 39, points: 9, remark: "Fail" },
    ],
};

// Navigation menus for different roles
export const navigationMenus = {
    student: [
        { name: "Dashboard", href: "/student", icon: "home" },
        { name: "Results", href: "/student/results", icon: "chart" },
        { name: "Timetable", href: "/student/timetable", icon: "calendar" },
        { name: "Subjects", href: "/student/subjects", icon: "book" },
        { name: "School Fees", href: "/student/fees", icon: "wallet" },
        { name: "Announcements", href: "/student/announcements", icon: "bell" },
        { name: "Profile", href: "/student/profile", icon: "user" },
    ],
    teacher: [
        { name: "Dashboard", href: "/teacher", icon: "home" },
        { name: "My Classes", href: "/teacher/classes", icon: "users" },
        { name: "Students", href: "/teacher/students", icon: "graduationCap" },
        { name: "Upload Scores", href: "/teacher/scores", icon: "edit" },
        { name: "Results", href: "/teacher/results", icon: "chart" },
        { name: "Timetable", href: "/teacher/timetable", icon: "calendar" },
        { name: "Announcements", href: "/teacher/announcements", icon: "bell" },
        { name: "Profile", href: "/teacher/profile", icon: "user" },
    ],
    parent: [
        { name: "Dashboard", href: "/parent", icon: "home" },
        { name: "My Children", href: "/parent/children", icon: "users" },
        { name: "Results", href: "/parent/results", icon: "chart" },
        { name: "Attendance", href: "/parent/attendance", icon: "checkCircle" },
        { name: "School Fees", href: "/parent/fees", icon: "wallet" },
        { name: "Announcements", href: "/parent/announcements", icon: "bell" },
    ],
    admin: [
        { name: "Dashboard", href: "/admin", icon: "home" },
        { name: "Users", href: "/admin/users", icon: "users" },
        { name: "Classes", href: "/admin/classes", icon: "building" },
        { name: "Subjects", href: "/admin/subjects", icon: "book" },
        { name: "Results", href: "/admin/results", icon: "chart" },
        { name: "Sessions", href: "/admin/sessions", icon: "calendar" },
        { name: "Announcements", href: "/admin/announcements", icon: "megaphone" },
        { name: "Settings", href: "/admin/settings", icon: "settings" },
    ],
};
