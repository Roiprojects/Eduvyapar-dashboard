export const school = {
  name: "Sri Vivekananda PVT ITI",
  short: "SVPITI",
  product: "AIVRM",
  tollFree: "0120 690 1888",
};

export const stats = [
  { label: "Applications", value: 144, prefix: "", delta: "+12 this week", color: "from-[#2a3fd6] to-[#8fb6ff]" },
  { label: "Students", value: 9, prefix: "", delta: "+2 admitted", color: "from-[#ff6a3d] to-[#ffb23e]" },
  { label: "Teachers", value: 13, prefix: "", delta: "All active", color: "from-[#2fd3a5] to-[#8fe8cf]" },
  { label: "Fee Collection", value: 3010, prefix: "₹", delta: "Today", color: "from-[#b48cff] to-[#e2d4ff]" },
];

export const queryCategories = ["All", "Operations", "Overview", "Academics", "Attendance", "Finance", "Staff", "Admissions"] as const;

export const queries: { cat: (typeof queryCategories)[number]; q: string; a: string }[] = [
  { cat: "Operations", q: "What are the upcoming COE details and events?", a: "2 events this month: Practical exams (Oct 14) and Industry visit to BHEL (Oct 22)." },
  { cat: "Overview", q: "Overall school health score?", a: "Health score is 82/100 — attendance strong, fee collection lagging at 38% of target." },
  { cat: "Academics", q: "Which students might fail this term?", a: "3 students flagged: attendance below 60% and internal marks under 40%." },
  { cat: "Attendance", q: "Which classes have attendance problems?", a: "1Yr Fitter SH2 averages 71% — lowest this month, mostly on Mondays." },
  { cat: "Finance", q: "How much fee will we collect this year?", a: "Projected ₹18.4L against a target of ₹22L at current conversion rate." },
  { cat: "Finance", q: "Today's money summary?", a: "₹3,010 collected today across 2 receipts. No petty cash expenses logged." },
  { cat: "Staff", q: "Which teachers are overloaded?", a: "2 instructors exceed 28 periods/week — consider rebalancing Electrician SH3." },
  { cat: "Academics", q: "Who are the top students?", a: "Diwakar Reddy, Manoj M J and Anusha A S lead the internal assessments." },
  { cat: "Admissions", q: "How many applications are pending payment?", a: "13 applications have filled forms but not completed payment." },
  { cat: "Admissions", q: "Which trade is most in demand?", a: "1Yr Fitter accounts for 70% of this year's applications." },
  { cat: "Operations", q: "Any low inventory items?", a: "Welding rods and safety goggles are below the reorder level." },
  { cat: "Staff", q: "Who is on leave this week?", a: "1 instructor on planned leave Thu–Fri; substitutes assigned." },
];

export type ModuleDef = { name: string; legacy?: string; area: Area; desc: string; icon: string; badge?: string; groups: { title: string; items: { label: string; href?: string; desc?: string }[] }[] };
export type Area = "Students" | "Academics" | "Money" | "Campus" | "AI";
export const areas: Area[] = ["Students", "Academics", "Money", "Campus", "AI"];

const APPS = "/dashboard/preadmission";

export const modules: ModuleDef[] = [
  { name: "Admissions", legacy: "Preadmission", area: "Students", icon: "GraduationCap", badge: "13", desc: "Review, edit and approve new applicants", groups: [
    { title: "Applications", items: [{ label: "All applications", href: APPS, desc: "Every applicant in one list" }, { label: "PU applications", href: APPS, desc: "Pre-university intake" }] },
    { title: "Documents", items: [{ label: "Uploaded documents", desc: "Certificates & photos" }] },
    { title: "Tracking", items: [{ label: "Application tracker", href: APPS, desc: "Where each applicant is" }] },
  ] },
  { name: "Students", legacy: "Admission", area: "Students", icon: "UserPlus", desc: "Enrolled students, records and certificates", groups: [
    { title: "Records", items: [{ label: "New enrolment" }, { label: "Student register" }, { label: "Transfer certificate" }] },
    { title: "Reports", items: [{ label: "Admissions report" }, { label: "Class strength" }, { label: "Category report" }] },
  ] },
  { name: "Birthdays", legacy: "Birthday", area: "Students", icon: "Cake", desc: "Send wishes to students and staff", groups: [{ title: "Today", items: [{ label: "Today's birthdays" }] }] },
  { name: "Lesson plans", legacy: "Lesson Plan", area: "Academics", icon: "BookOpen", desc: "Plan and track what is taught", groups: [{ title: "Plans", items: [{ label: "Create a plan" }, { label: "Progress tracker" }] }] },
  { name: "Exams & events", legacy: "COE", area: "Academics", icon: "CalendarCheck", desc: "Calendar of exams and events", groups: [{ title: "Calendar", items: [{ label: "Events calendar" }] }, { title: "Reports", items: [{ label: "Events report" }, { label: "Month-end report" }] }] },
  { name: "Online learning", legacy: "LMS", area: "Academics", icon: "MonitorPlay", desc: "Courses and assignments", groups: [{ title: "Learning", items: [{ label: "Courses" }, { label: "Assignments" }] }] },
  { name: "Fees", area: "Money", icon: "Wallet", badge: "₹", desc: "Collect fees, issue receipts, track dues", groups: [{ title: "Collection", items: [{ label: "Collect a fee" }, { label: "Receipts" }, { label: "Concessions" }] }, { title: "Reports", items: [{ label: "Today's collection" }, { label: "Pending dues" }] }] },
  { name: "Daily expenses", legacy: "Petty Cash", area: "Money", icon: "Coins", desc: "Small cash spends and the cash book", groups: [{ title: "Cash", items: [{ label: "Log an expense" }, { label: "Cash book" }] }] },
  { name: "Purchases", legacy: "Purchase", area: "Money", icon: "ShoppingCart", desc: "Orders and vendors", groups: [{ title: "Orders", items: [{ label: "Purchase orders" }, { label: "Vendors" }] }] },
  { name: "Inventory", area: "Campus", icon: "Boxes", badge: "2", desc: "Stock in, stock out, reorder alerts", groups: [{ title: "Stock", items: [{ label: "All items" }, { label: "Receive stock" }, { label: "Issue stock" }] }] },
  { name: "Reception", legacy: "Front Office", area: "Campus", icon: "Building2", desc: "Visitors and enquiries", groups: [{ title: "Desk", items: [{ label: "Visitor log" }, { label: "Enquiries" }] }] },
  { name: "School setup", legacy: "Pre Configuration", area: "Campus", icon: "Settings2", desc: "Years, classes and fee heads", groups: [{ title: "Setup", items: [{ label: "Academic years" }, { label: "Classes & sections" }, { label: "Fee heads" }] }] },
  { name: "AI assistant", legacy: "AI Edge", area: "AI", icon: "Sparkles", desc: "Ask questions, get predictions", groups: [{ title: "Intelligence", items: [{ label: "Principal Assistant", href: "/dashboard#assistant" }, { label: "Predictions" }] }] },
];

export const pipeline = [
  { label: "Registered", value: 1, tone: "#2fd3a5" },
  { label: "Form Not Filled", value: 1, tone: "#ff4d6d" },
  { label: "Form Filled", value: 13, tone: "#ffb23e" },
  { label: "Payment Done", value: 0, tone: "#2fd3a5" },
  { label: "Payment Pending", value: 13, tone: "#ff4d6d" },
  { label: "Transferred", value: 10, tone: "#b48cff" },
  { label: "Duplicate", value: 1, tone: "#2a3fd6" },
];

export type Applicant = {
  appNo: string; name: string; gender: "Male" | "Female"; cls: string;
  appStatus: "APP ACCEPTED" | "Unknown"; admStatus: "CONFIRM"; active: boolean;
};

export const applicants: Applicant[] = [
  { appNo: "20240005", name: "Test Abc", gender: "Male", cls: "1Yr Fitter SH3", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240006", name: "Diwakar Reddy D A", gender: "Female", cls: "1Yr Fitter SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240007", name: "Rahul Test", gender: "Male", cls: "1Yr Fitter SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: false },
  { appNo: "20240008", name: "Svpiti Student S I", gender: "Male", cls: "1Yr Fitter SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: false },
  { appNo: "20240009", name: "Aruna A A", gender: "Female", cls: "1Yr Fitter SH2", appStatus: "Unknown", admStatus: "CONFIRM", active: false },
  { appNo: "20240010", name: "Jeevan K M", gender: "Male", cls: "1Yr Electrician SH3", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: false },
  { appNo: "20240011", name: "Anusha A S", gender: "Female", cls: "1Yr Fitter SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: false },
  { appNo: "20240012", name: "Manoj M J", gender: "Male", cls: "1st Fitter", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240013", name: "Xyz Z C", gender: "Male", cls: "1st Fitter", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240014", name: "Test Abc Test", gender: "Male", cls: "1Yr Fitter SH3", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240015", name: "Priya N", gender: "Female", cls: "1Yr Electrician SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
  { appNo: "20240016", name: "Kiran Kumar", gender: "Male", cls: "1Yr Welder SH1", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: false },
  { appNo: "20240017", name: "Sneha R", gender: "Female", cls: "1Yr Fitter SH2", appStatus: "APP ACCEPTED", admStatus: "CONFIRM", active: true },
];

export const weekly = [32, 41, 38, 55, 48, 62, 71, 66, 80, 74, 91, 88];
