import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // function to hash password
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  // delete all users
  await prisma.user.deleteMany();

  // Seed users
  await prisma.user.createMany({
    data: [
      {
        firstName: "Esmee",
        lastName: "Garrett",
        email: "admin@gmail.com",
        password: await hashPassword("123123"),
        role: ["ADMIN"],
      },
      {
        firstName: "Keanu",
        lastName: "Patton",
        email: "basic@gmail.com",
        password: await hashPassword("123123"),
        role: ["COURSE_MANAGER"],
        permissions: ["can_delete_students"],
      },
      {
        firstName: "Hugo",
        lastName: "Mcgee",
        email: "superadmin@gmail.com",
        password: await hashPassword("123123"),
        role: ["SUPER_ADMIN"],
      },
    ],
  });

  await prisma.course.deleteMany();
  await prisma.deliveryPartner.deleteMany();
  await prisma.courseSubject.deleteMany();
  await prisma.courseLevel.deleteMany();

  // Array of course subjects
  const courseSubjects = [
    { name: "Artificial Intelligence" },
    { name: "Business & Management" },
    { name: "Construction Management" },
    { name: "Criminology" },
    { name: "Cyber Security" },
    { name: "Disaster & Emergency Management" },
    { name: "Engineering" },
    { name: "Healthcare" },
    { name: "Human Resources (HR)" },
    { name: "Humanities" },
    { name: "IT & Computer Science" },
    { name: "Leadership" },
    { name: "Marketing" },
    { name: "Nursing" },
    { name: "PGCE" },
    { name: "Psychology" },
    { name: "Public Health" },
    { name: "Teaching" },
  ];

  // Array of delivery partners
  const deliveryPartners = [
    {
      name: "University of Oxford",
      logo: "",
      phone: "01865 270000",
      email: "info@ox.ac.uk",
    },
    {
      name: "Harvard University",
      logo: "",
      phone: "617-495-1000",
      email: "info@harvard.edu",
    },
    {
      name: "Stanford University",
      logo: "",
      phone: "650-723-2300",
      email: "info@stanford.edu",
    },
    {
      name: "Massachusetts Institute of Technology (MIT)",
      logo: "",
      phone: "617-253-1000",
      email: "info@mit.edu",
    },
    {
      name: "University of Cambridge",
      logo: "",
      phone: "01223 337733",
      email: "info@cam.ac.uk",
    },
    {
      name: "Imperial College London",
      logo: "",
      phone: "020 7589 5111",
      email: "info@imperial.ac.uk",
    },
    {
      name: "London School of Economics (LSE)",
      logo: "",
      phone: "020 7405 7686",
      email: "info@lse.ac.uk",
    },
    {
      name: "University of Edinburgh",
      logo: "",
      phone: "0131 650 1000",
      email: "info@ed.ac.uk",
    },
    {
      name: "University of Melbourne",
      logo: "",
      phone: "+61 3 9035 5511",
      email: "info@unimelb.edu.au",
    },
    {
      name: "University of Toronto",
      logo: "",
      phone: "416-978-2011",
      email: "info@utoronto.ca",
    },
  ];

  // Array of course levels
  const courseLevels = [
    { name: "Postgraduate" },
    { name: "Undergraduate" },
    { name: "Top-Up undergraduate" },
    { name: "Top-Up postgraduate" },
    { name: "CPD" },
    { name: "Professional course" },
    { name: "Foundation" },
    { name: "Diploma" },
    { name: "Certificate" },
  ];

  // Create CourseSubjects
  const createdSubjects = await Promise.all(
    courseSubjects.map((subject) =>
      prisma.courseSubject.create({ data: subject })
    )
  );

  // Create DeliveryPartners
  const createdPartners = await Promise.all(
    deliveryPartners.map((partner) =>
      prisma.deliveryPartner.create({ data: partner })
    )
  );

  // Create CourseLevels
  const createdCourseLevels = await Promise.all(
    courseLevels.map((level) => prisma.courseLevel.create({ data: level }))
  );

  // Helper function to find subject and partner safely
  const findSubjectId = (name: string) => {
    const subject = createdSubjects.find((subject) => subject.name === name);
    if (!subject) throw new Error(`Subject with name ${name} not found`);
    return subject.id;
  };

  const findPartnerId = (index: number) => {
    const partner = createdPartners[index];
    if (!partner) throw new Error(`Partner at index ${index} not found`);
    return partner.id;
  };

  const findCourseLevelId = (name: string) => {
    const level = createdCourseLevels.find((level) => level.name === name);
    if (!level) throw new Error(`Course level with name ${name} not found`);
    return level.id;
  };
  // Array of courses
  const courses = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming.",
      image: "programming-course.png",
      price: 199.99,
      discountedPrice: 149.99,
      duration: "10 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "CS101",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(0), // Assigning first partner
    },
    {
      title: "Advanced Algorithms",
      description: "Explore complex algorithms in computer science.",
      image: "algorithms-course.png",
      price: 299.99,
      discountedPrice: 249.99,
      duration: "12 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "CS201",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(1), // Assigning second partner
    },
    {
      title: "Data Structures",
      description: "Understand fundamental data structures.",
      image: "data-structures-course.png",
      price: 149.99,
      discountedPrice: 129.99,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "CS102",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(0), // Assigning first partner
    },
    {
      title: "Calculus I",
      description: "Introduction to calculus.",
      image: "calculus-course.png",
      price: 199.99,
      discountedPrice: 179.99,
      duration: "10 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Foundation"),
      courseCode: "MATH101",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(1), // Assigning second partner
    },
    {
      title: "Cyber Security Basics",
      description: "Learn the fundamentals of cyber security.",
      image: "cyber-security-course.png",
      price: 250.0,
      discountedPrice: 200.0,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "CS203",
      courseSubjectId: findSubjectId("Cyber Security"),
      deliveryPartnerId: findPartnerId(2), // Assigning third partner
    },
    {
      title: "Engineering Mechanics",
      description: "Fundamentals of mechanics in engineering.",
      image: "engineering-mechanics-course.png",
      price: 300.0,
      discountedPrice: 270.0,
      duration: "12 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "ENG101",
      courseSubjectId: findSubjectId("Engineering"),
      deliveryPartnerId: findPartnerId(3), // Assigning fourth partner
    },
    {
      title: "Introduction to Healthcare",
      description: "Overview of healthcare systems and practices.",
      image: "healthcare-intro-course.png",
      price: 200.0,
      discountedPrice: 180.0,
      duration: "10 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "HC101",
      courseSubjectId: findSubjectId("Healthcare"),
      deliveryPartnerId: findPartnerId(4), // Assigning fifth partner
    },
    {
      title: "Human Resources Management",
      description: "Learn the essentials of HR management.",
      image: "hr-management-course.png",
      price: 180.0,
      discountedPrice: 160.0,
      duration: "8 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "HR101",
      courseSubjectId: findSubjectId("Human Resources (HR)"),
      deliveryPartnerId: findPartnerId(5), // Assigning sixth partner
    },
    {
      title: "Leadership Skills",
      description: "Develop your leadership abilities.",
      image: "leadership-skills-course.png",
      price: 220.0,
      discountedPrice: 200.0,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "LD101",
      courseSubjectId: findSubjectId("Leadership"),
      deliveryPartnerId: findPartnerId(6), // Assigning seventh partner
    },
    {
      title: "Marketing Strategies",
      description: "Learn effective marketing strategies.",
      image: "marketing-strategies-course.png",
      price: 250.0,
      discountedPrice: 230.0,
      duration: "8 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("CPD"),
      courseCode: "MK101",
      courseSubjectId: findSubjectId("Marketing"),
      deliveryPartnerId: findPartnerId(7), // Assigning eighth partner
    },
    {
      title: "AI for Business Leaders",
      description: "Integrating AI strategies into business leadership.",
      image: "ai-business-leaders-course.png",
      price: 4500,
      discountedPrice: 4000,
      duration: "6 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "AI101",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Machine Learning Techniques",
      description: "Exploring advanced machine learning methodologies.",
      image: "ml-techniques-course.png",
      price: 4700,
      discountedPrice: 4200,
      duration: "8 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "AI201",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(2),
    },
    {
      title: "Ethics in AI",
      description:
        "Understanding ethical implications in artificial intelligence.",
      image: "ethics-ai-course.png",
      price: 3000,
      discountedPrice: 2800,
      duration: "4 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "AI301",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(3),
    },
    {
      title: "Quantum Computing Fundamentals",
      description: "Basics of quantum computation for beginners.",
      image: "quantum-computing-course.png",
      price: 5200,
      discountedPrice: 4800,
      duration: "5 months",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "AI401",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(0),
    },
    {
      title: "Advanced Neural Networks",
      description: "Deep dive into complex neural network architectures.",
      image: "advanced-neural-networks-course.png",
      price: 5500,
      discountedPrice: 5000,
      duration: "6 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "AI501",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(4),
    },
    {
      title: "Entrepreneurship in Business",
      description: "Cultivating entrepreneurial skills in business settings.",
      image: "entrepreneurship-business-course.png",
      price: 4300,
      discountedPrice: 3900,
      duration: "7 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "BM101",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(5),
    },
    {
      title: "Strategic Management",
      description: "Techniques and strategies for effective management.",
      image: "strategic-management-course.png",
      price: 4600,
      discountedPrice: 4200,
      duration: "6 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "BM201",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Leadership and Change Management",
      description: "Leading change effectively within organizations.",
      image: "leadership-change-mgmt-course.png",
      price: 4800,
      discountedPrice: 4500,
      duration: "6 months",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "BM301",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(2),
    },
    {
      title: "Business Analytics",
      description: "Analyzing data to make better business decisions.",
      image: "business-analytics-course.png",
      price: 5000,
      discountedPrice: 4700,
      duration: "5 months",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "BM401",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(3),
    },
    {
      title: "Project Management in Construction",
      description:
        "Mastering project management techniques in the construction industry.",
      image: "project-management-construction-course.png",
      price: 3300,
      discountedPrice: 3100,
      duration: "9 months",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "CM101",
      courseSubjectId: findSubjectId("Construction Management"),
      deliveryPartnerId: findPartnerId(6),
    },
    {
      title: "Introduction to Criminology",
      description:
        "Exploring the fundamentals of criminological theory and practice.",
      image: "intro-criminology-course.png",
      price: 2200,
      discountedPrice: 2000,
      duration: "8 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "CR101",
      courseSubjectId: findSubjectId("Criminology"),
      deliveryPartnerId: findPartnerId(7),
    },
    {
      title: "Emergency Response Planning",
      description: "Preparing and managing emergency situations effectively.",
      image: "emergency-response-course.png",
      price: 3600,
      discountedPrice: 3400,
      duration: "12 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("CPD"),
      courseCode: "DE101",
      courseSubjectId: findSubjectId("Disaster & Emergency Management"),
      deliveryPartnerId: findPartnerId(8),
    },
    {
      title: "Fundamentals of Engineering",
      description: "Covering the essential concepts of engineering.",
      image: "engineering-fundamentals-course.png",
      price: 3200,
      discountedPrice: 2900,
      duration: "16 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "ENG201",
      courseSubjectId: findSubjectId("Engineering"),
      deliveryPartnerId: findPartnerId(0),
    },
    {
      title: "Advanced Healthcare Systems",
      description:
        "A deeper look into modern healthcare systems around the world.",
      image: "advanced-healthcare-systems-course.png",
      price: 4600,
      discountedPrice: 4300,
      duration: "20 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "HC201",
      courseSubjectId: findSubjectId("Healthcare"),
      deliveryPartnerId: findPartnerId(4),
    },
    {
      title: "HR Management Strategies",
      description:
        "Effective human resource strategies for modern organizations.",
      image: "hr-management-strategies-course.png",
      price: 2500,
      discountedPrice: 2300,
      duration: "8 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "HR201",
      courseSubjectId: findSubjectId("Human Resources (HR)"),
      deliveryPartnerId: findPartnerId(5),
    },
    {
      title: "Contemporary Humanities Issues",
      description: "Exploring current issues and debates in the humanities.",
      image: "contemporary-humanities-issues-course.png",
      price: 2100,
      discountedPrice: 1900,
      duration: "12 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "HU101",
      courseSubjectId: findSubjectId("Humanities"),
      deliveryPartnerId: findPartnerId(6),
    },
    {
      title: "Advanced IT Security",
      description:
        "In-depth strategies and technologies to protect information systems.",
      image: "advanced-it-security-course.png",
      price: 5200,
      discountedPrice: 4800,
      duration: "14 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "IT301",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Leadership in Non-Profit Organizations",
      description: "Effective leadership strategies for the non-profit sector.",
      image: "non-profit-leadership-course.png",
      price: 3000,
      discountedPrice: 2700,
      duration: "10 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "LD201",
      courseSubjectId: findSubjectId("Leadership"),
      deliveryPartnerId: findPartnerId(2),
    },
    {
      title: "Modern Architecture Design",
      description: "Exploring contemporary design and architecture trends.",
      image: "modern-architecture-design-course.png",
      price: 3100,
      discountedPrice: 2800,
      duration: "10 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "CM202",
      courseSubjectId: findSubjectId("Construction Management"),
      deliveryPartnerId: findPartnerId(3),
    },
    {
      title: "Psychology of Criminal Behavior",
      description:
        "Understanding the psychological factors driving criminal actions.",
      image: "psychology-criminal-behavior-course.png",
      price: 2600,
      discountedPrice: 2400,
      duration: "12 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "CR202",
      courseSubjectId: findSubjectId("Criminology"),
      deliveryPartnerId: findPartnerId(4),
    },
    {
      title: "Cybersecurity Threats and Mitigation",
      description: "Identifying and mitigating cyber threats effectively.",
      image: "cybersecurity-threats-course.png",
      price: 4200,
      discountedPrice: 4000,
      duration: "8 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "CS301",
      courseSubjectId: findSubjectId("Cyber Security"),
      deliveryPartnerId: findPartnerId(5),
    },
    {
      title: "Epidemiology and Public Health",
      description: "Studying the spread and control of diseases.",
      image: "epidemiology-public-health-course.png",
      price: 4700,
      discountedPrice: 4500,
      duration: "15 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "PH101",
      courseSubjectId: findSubjectId("Public Health"),
      deliveryPartnerId: findPartnerId(6),
    },
    {
      title: "Advanced Structural Engineering",
      description:
        "Deep dive into advanced concepts and techniques in structural engineering.",
      image: "advanced-structural-engineering-course.png",
      price: 5200,
      discountedPrice: 4900,
      duration: "18 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "ENG301",
      courseSubjectId: findSubjectId("Engineering"),
      deliveryPartnerId: findPartnerId(7),
    },
    {
      title: "Mental Health Nursing",
      description:
        "Focusing on psychiatric and mental health nursing practices.",
      image: "mental-health-nursing-course.png",
      price: 3600,
      discountedPrice: 3300,
      duration: "12 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "NU101",
      courseSubjectId: findSubjectId("Nursing"),
      deliveryPartnerId: findPartnerId(8),
    },
    {
      title: "Principles of Teaching",
      description: "Core principles and effective strategies for teaching.",
      image: "principles-teaching-course.png",
      price: 2300,
      discountedPrice: 2100,
      duration: "10 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "TE101",
      courseSubjectId: findSubjectId("Teaching"),
      deliveryPartnerId: findPartnerId(0),
    },
    {
      title: "Human Resource Development",
      description:
        "Strategies for developing and enhancing human resources in organizations.",
      image: "hr-development-course.png",
      price: 2500,
      discountedPrice: 2300,
      duration: "14 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "HR301",
      courseSubjectId: findSubjectId("Human Resources (HR)"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Innovations in Digital Marketing",
      description:
        "Exploring innovative strategies and tools in digital marketing.",
      image: "innovations-digital-marketing-course.png",
      price: 3200,
      discountedPrice: 2900,
      duration: "12 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "MK301",
      courseSubjectId: findSubjectId("Marketing"),
      deliveryPartnerId: findPartnerId(2),
    },
  ];

  // Create courses in the database
  await Promise.all(
    courses.map((courseData) =>
      prisma.course.create({
        data: courseData,
      })
    )
  );

  // seed courses, here's the structure of the course object:
  // [{
  //   "title": "MBA in Strategic Management",
  //     "description": "Develop strategic thinking and business planning skills to excel in executive roles.",
  //     "image": "",
  //     "price": 22000,
  //     "discountedPrice": 20000,
  //     "duration": "2 Year",
  //     "subject": "Business & Management",
  //     "courseType": "Part Time",
  //     "courseLevel": "Postgraduate",
  //     "courseCode": "BM-0002"
  // },
  // etc..]

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
