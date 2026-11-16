/**
 * certificates.js
 * Easily customizable certificate data for Moksha Mehta's portfolio.
 * - Layout automatically adapts to any number of certificates (2, 3, 5, etc.)
 * - Optional fields (e.g. score) will automatically hide if left empty or omitted.
 * - Replace the image paths with your actual certificate files in /public/certificates/
 */
export const CERTIFICATES = [
  {
    id: "dbms-nptel",
    title: "Database Management Systems",
    shortTitle: "DBMS",
    issuer: "NPTEL",
    image: "/certificates/dbms-nptel.jpg",
    year: "2024",
    score: "Elite + Silver",
    description:
      "Advanced certification covering relational algebra, relational calculus, SQL optimization, transaction management, ACID properties, indexing, and concurrency control.",
    skills: ["SQL", "Relational Algebra", "Transactions", "Indexing", "Query Optimization"],
  },
  {
    id: "computer-networks-nptel",
    title: "Computer Networks",
    shortTitle: "Computer Networks",
    issuer: "NPTEL",
    image: "/certificates/computer-networks-nptel.jpg",
    year: "2024",
    score: "Elite",
    description:
      "Comprehensive certification on the OSI & TCP/IP layered architecture, routing protocols, subnetting, flow and congestion control, transport protocols, and socket programming principles.",
    skills: ["TCP/IP", "Routing Protocols", "Subnetting", "Flow Control", "Network Security"],
  },
  {
    id: "adda-certificate",
    title: "Advanced Data Structures & Algorithms",
    shortTitle: "ADDA",
    issuer: "ADDA",
    image: "/certificates/adda-certificate.jpg",
    year: "2024",
    score: "", // Optional: leave empty to automatically hide from UI
    description:
      "In-depth course on asymptotic analysis, divide-and-conquer, greedy techniques, dynamic programming, advanced graph algorithms, and amortized complexity.",
    skills: ["Algorithms", "Dynamic Programming", "Graph Theory", "Time Complexity"],
  },
];

export default CERTIFICATES;
