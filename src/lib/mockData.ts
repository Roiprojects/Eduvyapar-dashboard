export interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  gender: "Male" | "Female";
  trade: string;
  batch: string;
  avatar: string;
  attendance: number;
  cgpa: number;
  feeStatus: "Paid" | "Partial" | "Overdue";
  feePaid: number;
  feeTotal: number;
  status: "Active" | "Defaulter" | "Leave";
  guardian: string;
  phone: string;
  email: string;
  enrolledDate: string;
}

export const demoStudents: StudentRecord[] = [
  {
    id: "STU-2026-001",
    rollNo: "SVP-FIT-01",
    name: "Rahul Sharma",
    gender: "Male",
    trade: "1Yr Fitter (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-rahul.jpg",
    attendance: 94,
    cgpa: 8.8,
    feeStatus: "Paid",
    feePaid: 28500,
    feeTotal: 28500,
    status: "Active",
    guardian: "Ramesh Sharma",
    phone: "+91 98450 12384",
    email: "rahul.s@student.aivrm.edu",
    enrolledDate: "12 Aug 2025",
  },
  {
    id: "STU-2026-002",
    rollNo: "SVP-ELE-04",
    name: "Priya Mehta",
    gender: "Female",
    trade: "1Yr Electrician (Section B)",
    batch: "2025–2026",
    avatar: "/images/student-priya.jpg",
    attendance: 96,
    cgpa: 9.2,
    feeStatus: "Paid",
    feePaid: 32000,
    feeTotal: 32000,
    status: "Active",
    guardian: "Deepak Mehta",
    phone: "+91 97412 88471",
    email: "priya.m@student.aivrm.edu",
    enrolledDate: "14 Aug 2025",
  },
  {
    id: "STU-2026-003",
    rollNo: "SVP-FIT-09",
    name: "Arjun Rao",
    gender: "Male",
    trade: "1Yr Fitter (Section B)",
    batch: "2025–2026",
    avatar: "/images/student-arjun.jpg",
    attendance: 88,
    cgpa: 8.1,
    feeStatus: "Partial",
    feePaid: 18000,
    feeTotal: 28500,
    status: "Active",
    guardian: "K. V. Rao",
    phone: "+91 94480 33918",
    email: "arjun.rao@student.aivrm.edu",
    enrolledDate: "16 Aug 2025",
  },
  {
    id: "STU-2026-004",
    rollNo: "SVP-FIT-14",
    name: "Sneha Iyer",
    gender: "Female",
    trade: "1Yr Fitter (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-sneha.jpg",
    attendance: 98,
    cgpa: 9.5,
    feeStatus: "Paid",
    feePaid: 28500,
    feeTotal: 28500,
    status: "Active",
    guardian: "M. Iyer",
    phone: "+91 99801 54720",
    email: "sneha.i@student.aivrm.edu",
    enrolledDate: "10 Aug 2025",
  },
  {
    id: "STU-2026-005",
    rollNo: "SVP-WLD-02",
    name: "Karan Singh",
    gender: "Male",
    trade: "1Yr Welder (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-karan.jpg",
    attendance: 62,
    cgpa: 6.4,
    feeStatus: "Overdue",
    feePaid: 10000,
    feeTotal: 24000,
    status: "Defaulter",
    guardian: "Harbhajan Singh",
    phone: "+91 91234 56789",
    email: "karan.s@student.aivrm.edu",
    enrolledDate: "20 Aug 2025",
  },
  {
    id: "STU-2026-006",
    rollNo: "SVP-ELE-11",
    name: "Anusha A S",
    gender: "Female",
    trade: "1Yr Electrician (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-priya.jpg",
    attendance: 91,
    cgpa: 8.9,
    feeStatus: "Paid",
    feePaid: 32000,
    feeTotal: 32000,
    status: "Active",
    guardian: "Shankar A N",
    phone: "+91 98860 11223",
    email: "anusha.as@student.aivrm.edu",
    enrolledDate: "18 Aug 2025",
  },
  {
    id: "STU-2026-007",
    rollNo: "SVP-FIT-18",
    name: "Diwakar Reddy",
    gender: "Male",
    trade: "1Yr Fitter (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-rahul.jpg",
    attendance: 85,
    cgpa: 8.4,
    feeStatus: "Paid",
    feePaid: 28500,
    feeTotal: 28500,
    status: "Active",
    guardian: "Anand Reddy",
    phone: "+91 96112 34455",
    email: "diwakar.r@student.aivrm.edu",
    enrolledDate: "19 Aug 2025",
  },
  {
    id: "STU-2026-008",
    rollNo: "SVP-WLD-07",
    name: "Manoj M J",
    gender: "Male",
    trade: "1Yr Welder (Section A)",
    batch: "2025–2026",
    avatar: "/images/student-arjun.jpg",
    attendance: 93,
    cgpa: 8.7,
    feeStatus: "Paid",
    feePaid: 24000,
    feeTotal: 24000,
    status: "Active",
    guardian: "Jayaram M",
    phone: "+91 94498 77665",
    email: "manoj.mj@student.aivrm.edu",
    enrolledDate: "15 Aug 2025",
  },
];

export interface CourseRecord {
  id: string;
  code: string;
  title: string;
  trade: string;
  duration: string;
  instructor: string;
  enrolledCount: number;
  credits: number;
  modulesCompleted: number;
  totalModules: number;
  syllabusStatus: "On Schedule" | "Ahead" | "Behind";
  nextExam: string;
}

export const demoCourses: CourseRecord[] = [
  {
    id: "CRS-101",
    code: "FIT-TH-101",
    title: "Precision Engineering & Bench Work Theory",
    trade: "1Yr Fitter",
    duration: "1 Year (NSQF Level 4)",
    instructor: "Er. K. S. Venkatesh",
    enrolledCount: 68,
    credits: 18,
    modulesCompleted: 14,
    totalModules: 18,
    syllabusStatus: "On Schedule",
    nextExam: "14 Nov 2026",
  },
  {
    id: "CRS-102",
    code: "FIT-PR-102",
    title: "Workshop Machine Tools & Lathe Practicals",
    trade: "1Yr Fitter",
    duration: "1 Year (NSQF Level 4)",
    instructor: "Er. R. Nagaraj",
    enrolledCount: 68,
    credits: 24,
    modulesCompleted: 20,
    totalModules: 24,
    syllabusStatus: "Ahead",
    nextExam: "18 Nov 2026",
  },
  {
    id: "CRS-103",
    code: "ELE-TH-201",
    title: "Industrial Wiring, Power Electronics & AC Motors",
    trade: "1Yr Electrician",
    duration: "1 Year (NSQF Level 5)",
    instructor: "Er. S. Chandrashekar",
    enrolledCount: 54,
    credits: 20,
    modulesCompleted: 12,
    totalModules: 18,
    syllabusStatus: "On Schedule",
    nextExam: "21 Nov 2026",
  },
  {
    id: "CRS-104",
    code: "WLD-PR-301",
    title: "TIG, MIG & Shielded Metal Arc Welding Lab",
    trade: "1Yr Welder",
    duration: "1 Year (NSQF Level 4)",
    instructor: "Er. Mahendra Gowda",
    enrolledCount: 32,
    credits: 22,
    modulesCompleted: 15,
    totalModules: 20,
    syllabusStatus: "On Schedule",
    nextExam: "12 Nov 2026",
  },
  {
    id: "CRS-105",
    code: "EMP-SK-001",
    title: "Employability Skills, IT Literacy & English",
    trade: "All Trades (Core)",
    duration: "120 Hours",
    instructor: "Prof. Shalini Roy",
    enrolledCount: 154,
    credits: 6,
    modulesCompleted: 8,
    totalModules: 10,
    syllabusStatus: "Ahead",
    nextExam: "05 Dec 2026",
  },
];

export interface ExamRecord {
  id: string;
  subject: string;
  trade: string;
  examType: "Theory Examination" | "Practical Viva" | "Internal Assessment";
  date: string;
  time: string;
  venue: string;
  registeredStudents: number;
  invigilator: string;
  status: "Scheduled" | "In Evaluation" | "Completed";
}

export const demoExams: ExamRecord[] = [
  {
    id: "EXM-001",
    subject: "Fitter Workshop Practical & Job Piece Evaluation",
    trade: "1Yr Fitter (Section A & B)",
    examType: "Practical Viva",
    date: "14 Oct 2026",
    time: "09:30 AM – 04:30 PM",
    venue: "Workshop Block B · Bay 2",
    registeredStudents: 68,
    invigilator: "Er. R. Nagaraj & External DGT Assessor",
    status: "Scheduled",
  },
  {
    id: "EXM-002",
    subject: "Industrial Electrician Safety & Circuitry Theory",
    trade: "1Yr Electrician",
    examType: "Theory Examination",
    date: "22 Oct 2026",
    time: "10:00 AM – 01:00 PM",
    venue: "Auditorium Hall 1",
    registeredStudents: 54,
    invigilator: "Er. S. Chandrashekar",
    status: "Scheduled",
  },
  {
    id: "EXM-003",
    subject: "Welding Blueprint Reading & Metallurgy Quiz",
    trade: "1Yr Welder",
    examType: "Internal Assessment",
    date: "28 Oct 2026",
    time: "11:00 AM – 12:30 PM",
    venue: "Lecture Pavilion 3",
    registeredStudents: 32,
    invigilator: "Er. Mahendra Gowda",
    status: "Scheduled",
  },
  {
    id: "EXM-004",
    subject: "Employability Skills & Digital Communication",
    trade: "All Trades Combined",
    examType: "Theory Examination",
    date: "30 Sep 2026",
    time: "02:00 PM – 04:00 PM",
    venue: "Computer Lab 1 & 2",
    registeredStudents: 154,
    invigilator: "Prof. Shalini Roy",
    status: "In Evaluation",
  },
];

export interface FeeTransaction {
  id: string;
  receiptNo: string;
  studentName: string;
  rollNo: string;
  trade: string;
  amount: number;
  feeType: "Tuition Fee" | "Admission Intake" | "Workshop Lab" | "Examination Fee";
  paymentMode: "UPI / QR" | "Net Banking" | "Debit Card" | "Bank Challan";
  date: string;
  status: "Settled" | "Processing" | "Reconciled";
  referenceId: string;
}

export const demoTransactions: FeeTransaction[] = [
  {
    id: "TXN-8841",
    receiptNo: "REC-2026-1042",
    studentName: "Rahul Sharma",
    rollNo: "SVP-FIT-01",
    trade: "1Yr Fitter",
    amount: 14250,
    feeType: "Tuition Fee",
    paymentMode: "UPI / QR",
    date: "Today, 11:24 AM",
    status: "Settled",
    referenceId: "UPI/38491823901/HDFC",
  },
  {
    id: "TXN-8840",
    receiptNo: "REC-2026-1041",
    studentName: "Priya Mehta",
    rollNo: "SVP-ELE-04",
    trade: "1Yr Electrician",
    amount: 16000,
    feeType: "Tuition Fee",
    paymentMode: "Net Banking",
    date: "Today, 09:15 AM",
    status: "Settled",
    referenceId: "NEFT/SBIN88391823",
  },
  {
    id: "TXN-8839",
    receiptNo: "REC-2026-1040",
    studentName: "Arjun Rao",
    rollNo: "SVP-FIT-09",
    trade: "1Yr Fitter",
    amount: 2500,
    feeType: "Examination Fee",
    paymentMode: "Debit Card",
    date: "Yesterday, 04:40 PM",
    status: "Settled",
    referenceId: "POS/AUTH-991204",
  },
  {
    id: "TXN-8838",
    receiptNo: "REC-2026-1039",
    studentName: "Sneha Iyer",
    rollNo: "SVP-FIT-14",
    trade: "1Yr Fitter",
    amount: 28500,
    feeType: "Admission Intake",
    paymentMode: "Bank Challan",
    date: "Yesterday, 02:18 PM",
    status: "Reconciled",
    referenceId: "CHL/CANARA-48192",
  },
  {
    id: "TXN-8837",
    receiptNo: "REC-2026-1038",
    studentName: "Karan Singh",
    rollNo: "SVP-WLD-02",
    trade: "1Yr Welder",
    amount: 5000,
    feeType: "Workshop Lab",
    paymentMode: "UPI / QR",
    date: "06 Oct 2026",
    status: "Settled",
    referenceId: "UPI/38291048123/ICICI",
  },
];

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "Machine Tools" | "Safety & PPE" | "Consumables" | "Electronic Instruments";
  quantity: number;
  unit: string;
  minReorderLevel: number;
  location: string;
  status: "In Stock" | "Low Stock" | "Critical";
  lastRestocked: string;
}

export const demoInventory: InventoryItem[] = [
  {
    id: "INV-101",
    sku: "WLD-ROD-MS6013",
    name: "Mild Steel Welding Electrodes 6013 (3.15mm)",
    category: "Consumables",
    quantity: 14,
    unit: "Packets (5kg)",
    minReorderLevel: 25,
    location: "Welding Store · Rack W-04",
    status: "Critical",
    lastRestocked: "18 Sep 2026",
  },
  {
    id: "INV-102",
    sku: "PPE-GGL-UV400",
    name: "Industrial Clear Safety Goggles (Anti-Fog)",
    category: "Safety & PPE",
    quantity: 18,
    unit: "Units",
    minReorderLevel: 30,
    location: "Central Safety Cabinet · Bay 1",
    status: "Low Stock",
    lastRestocked: "24 Sep 2026",
  },
  {
    id: "INV-103",
    sku: "FIT-CLP-MITU200",
    name: "Mitutoyo 200mm Stainless Vernier Calipers",
    category: "Machine Tools",
    quantity: 42,
    unit: "Units",
    minReorderLevel: 15,
    location: "Precision Metrology Lab · Cupboard 2",
    status: "In Stock",
    lastRestocked: "01 Oct 2026",
  },
  {
    id: "INV-104",
    sku: "ELE-MM-FLUKE101",
    name: "Fluke 101 Digital Multimeter & Probe Kits",
    category: "Electronic Instruments",
    quantity: 26,
    unit: "Units",
    minReorderLevel: 10,
    location: "Electrical Lab 1 · Tester Shelf",
    status: "In Stock",
    lastRestocked: "28 Sep 2026",
  },
  {
    id: "INV-105",
    sku: "FIT-BLD-BAHCO300",
    name: "High Speed Steel Hacksaw Blades 300mm",
    category: "Consumables",
    quantity: 140,
    unit: "Pieces",
    minReorderLevel: 50,
    location: "Fitter Workshop · Tool Crib 1",
    status: "In Stock",
    lastRestocked: "04 Oct 2026",
  },
];

export interface FacultyMember {
  id: string;
  empId: string;
  name: string;
  role: string;
  department: string;
  experience: string;
  workload: number;
  maxWorkload: number;
  status: "Active on Campus" | "In Workshop Session" | "On Planned Leave";
  phone: string;
  email: string;
  qualification: string;
}

export const demoFaculty: FacultyMember[] = [
  {
    id: "FAC-01",
    empId: "SVP-EMP-101",
    name: "Er. K. S. Venkatesh",
    role: "Senior Training Officer (Fitter Trade)",
    department: "Mechanical & Fitter Technology",
    experience: "16 Years",
    workload: 26,
    maxWorkload: 28,
    status: "In Workshop Session",
    phone: "+91 94481 99201",
    email: "venkatesh.ks@aivrm.edu",
    qualification: "B.E. Mechanical, DGT Certified Master Trainer",
  },
  {
    id: "FAC-02",
    empId: "SVP-EMP-102",
    name: "Er. S. Chandrashekar",
    role: "Head of Electrical Instruction",
    department: "Electrical Engineering",
    experience: "14 Years",
    workload: 28,
    maxWorkload: 28,
    status: "Active on Campus",
    phone: "+91 98862 33490",
    email: "chandrashekar.s@aivrm.edu",
    qualification: "M.Tech Power Systems, A-Grade License Holder",
  },
  {
    id: "FAC-03",
    empId: "SVP-EMP-103",
    name: "Er. Mahendra Gowda",
    role: "Master Welder & Inspection Specialist",
    department: "Welding & Fabrication",
    experience: "12 Years",
    workload: 24,
    maxWorkload: 28,
    status: "Active on Campus",
    phone: "+91 99001 77612",
    email: "mahendra.g@aivrm.edu",
    qualification: "DME, ASME IX Certified Welding Inspector",
  },
  {
    id: "FAC-04",
    empId: "SVP-EMP-104",
    name: "Prof. Shalini Roy",
    role: "Soft Skills & Employability Coordinator",
    department: "Applied Sciences & Language Lab",
    experience: "9 Years",
    workload: 22,
    maxWorkload: 26,
    status: "Active on Campus",
    phone: "+91 97422 10884",
    email: "shalini.roy@aivrm.edu",
    qualification: "M.A. English, Cambridge CELTA",
  },
  {
    id: "FAC-05",
    empId: "SVP-EMP-105",
    name: "Er. R. Nagaraj",
    role: "Workshop Superintendent",
    department: "Workshop Maintenance & Tool Crib",
    experience: "20 Years",
    workload: 18,
    maxWorkload: 24,
    status: "On Planned Leave",
    phone: "+91 94490 55112",
    email: "nagaraj.r@aivrm.edu",
    qualification: "Diploma in Tool & Die Making",
  },
];
