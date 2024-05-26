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
    { name: "MBA" },
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
