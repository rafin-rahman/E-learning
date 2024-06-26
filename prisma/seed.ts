//@ts-nocheck
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
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["STAFF", "SUPER_ADMIN"],
      },
      {
        firstName: "Jonah",
        lastName: "Alison",
        email: "business@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["STAFF", "COMPANY_ADMIN"],
      },
      {
        firstName: "Keanu",
        lastName: "Patton",
        email: "course@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["STAFF", "COURSE_MANAGER"],
        permissions: ["can_delete_students"],
      },
    ],
  });

  await prisma.student.deleteMany();

  // Seed students
  await prisma.student.createMany({
    data: [
      {
        firstName: "Margaret",
        lastName: "Jonson",
        email: "student@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["STUDENT"],
      },
      {
        firstName: "Elizabeth",
        lastName: "Hart",
        email: "student2@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["STUDENT"],
      },
    ],
  });

  //region Courses

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

  // random image urls to populate courses background images
  const listOfImgUrls = [
    "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1532618793091-ec5fe9635fbd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1683135216954-ab7130031b44?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?q=80&w=3734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=3632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680807868966-90a84c68c944?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1507537509458-b8312d35a233?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661783433420-ddc45d35004a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1673865641073-4479f93a7776?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  // get random image url
  const getRandomImageUrl = () => {
    return listOfImgUrls[Math.floor(Math.random() * listOfImgUrls.length)];
  };
  const courses = [
    {
      title: "Introduction to Programming",
      description:
        "This course provides a comprehensive introduction to programming, covering fundamental concepts, syntax, and problem-solving techniques. Students will learn to write and debug code, work with data structures, and develop basic algorithms. Ideal for beginners.",
      image: getRandomImageUrl(),
      price: 199.99,
      discountedPrice: 149.99,
      duration: "10 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "CS101",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(0),
    },
    {
      title: "Advanced Algorithms",
      description:
        "Dive deep into complex algorithms with this course, exploring advanced topics like graph theory, dynamic programming, and optimization. Students will enhance their problem-solving skills and learn to implement efficient algorithms in various programming languages.",
      image: getRandomImageUrl(),
      price: 299.99,
      discountedPrice: 249.99,
      duration: "12 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "CS201",
      courseSubjectId: findSubjectId("Artificial Intelligence"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Data Structures",
      description:
        "Understand the essential data structures used in computer science, including arrays, linked lists, stacks, queues, trees, and graphs. This course focuses on efficient data organization and manipulation techniques, crucial for optimizing algorithm performance.",
      image: getRandomImageUrl(),
      price: 149.99,
      discountedPrice: 129.99,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "CS102",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(0),
    },
    {
      title: "Calculus I",
      description:
        "Explore the fundamental concepts of calculus, including limits, derivatives, and integrals. This course provides a solid foundation in mathematical principles essential for advanced studies in science, engineering, and economics.",
      image: getRandomImageUrl(),
      price: 199.99,
      discountedPrice: 179.99,
      duration: "10 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Foundation"),
      courseCode: "MATH101",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Cyber Security Basics",
      description:
        "Learn the essentials of cyber security, including threat identification, risk management, and protective measures. This course covers key concepts in securing digital information and protecting systems against cyber threats and attacks.",
      image: getRandomImageUrl(),
      price: 250.0,
      discountedPrice: 200.0,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "CS203",
      courseSubjectId: findSubjectId("Cyber Security"),
      deliveryPartnerId: findPartnerId(2),
    },
    {
      title: "Engineering Mechanics",
      description:
        "Study the fundamental principles of mechanics in engineering, focusing on force systems, equilibrium, and the behavior of materials. This course provides a critical understanding of mechanical systems and their applications in various engineering fields.",
      image: getRandomImageUrl(),
      price: 300.0,
      discountedPrice: 270.0,
      duration: "12 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "ENG101",
      courseSubjectId: findSubjectId("Engineering"),
      deliveryPartnerId: findPartnerId(3),
    },
    {
      title: "Introduction to Healthcare",
      description:
        "Gain an overview of healthcare systems, policies, and practices. This course introduces students to the structure and function of healthcare organizations, patient care, and the various allowedRoles of healthcare professionals.",
      image: getRandomImageUrl(),
      price: 200.0,
      discountedPrice: 180.0,
      duration: "10 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "HC101",
      courseSubjectId: findSubjectId("Healthcare"),
      deliveryPartnerId: findPartnerId(4),
    },
    {
      title: "Human Resources Management",
      description:
        "Learn the key principles and practices of human resource management, including recruitment, training, performance management, and employee relations. This course prepares students for effective HR management in various organizational settings.",
      image: getRandomImageUrl(),
      price: 180.0,
      discountedPrice: 160.0,
      duration: "8 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "HR101",
      courseSubjectId: findSubjectId("Human Resources (HR)"),
      deliveryPartnerId: findPartnerId(5),
    },
    {
      title: "Leadership Skills",
      description:
        "Develop essential leadership skills, including communication, decision-making, and team management. This course focuses on practical techniques and strategies to enhance leadership abilities and drive organizational success.",
      image: getRandomImageUrl(),
      price: 220.0,
      discountedPrice: 200.0,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "LD101",
      courseSubjectId: findSubjectId("Leadership"),
      deliveryPartnerId: findPartnerId(6),
    },
    {
      title: "Marketing Strategies",
      description:
        "Learn effective marketing strategies, including market research, branding, and digital marketing. This course equips students with the knowledge and skills to develop and implement successful marketing plans for various businesses.",
      image: getRandomImageUrl(),
      price: 250.0,
      discountedPrice: 230.0,
      duration: "8 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("CPD"),
      courseCode: "MK101",
      courseSubjectId: findSubjectId("Marketing"),
      deliveryPartnerId: findPartnerId(7),
    },
    {
      title: "AI for Business Leaders",
      description:
        "Integrate AI strategies into business leadership with this comprehensive course. Explore the applications of artificial intelligence in decision-making, operations, and innovation, enhancing business performance and competitive advantage.",
      image: getRandomImageUrl(),
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
      description:
        "Explore advanced machine learning methodologies, including supervised and unsupervised learning, neural networks, and deep learning. This course provides hands-on experience with real-world data sets and machine learning frameworks.",
      image: getRandomImageUrl(),
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
        "Understand the ethical implications of artificial intelligence, including bias, privacy, and accountability. This course examines the societal impact of AI technologies and explores frameworks for ethical decision-making in AI development and deployment.",
      image: getRandomImageUrl(),
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
      description:
        "Learn the basics of quantum computation, including qubits, superposition, and entanglement. This course introduces the principles of quantum mechanics and explores the potential applications of quantum computing in various industries.",
      image: getRandomImageUrl(),
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
      description:
        "Delve into complex neural network architectures, including convolutional and recurrent neural networks. This course covers advanced topics in deep learning, providing practical experience with cutting-edge techniques and applications.",
      image: getRandomImageUrl(),
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
      description:
        "Cultivate entrepreneurial skills with this course, focusing on innovation, business planning, and startup management. Learn to identify opportunities, develop business models, and navigate the challenges of launching and growing a successful business.",
      image: getRandomImageUrl(),
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
      description:
        "Master techniques and strategies for effective management with this course. Explore strategic planning, competitive analysis, and organizational design to enhance your ability to lead and manage complex business environments.",
      image: getRandomImageUrl(),
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
      description:
        "Learn to lead change effectively within organizations. This course covers change management theories, leadership strategies, and practical tools to help you drive successful transformations and navigate organizational change.",
      image: getRandomImageUrl(),
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
      description:
        "Analyze data to make better business decisions. This course covers statistical analysis, data visualization, and predictive modeling, equipping students with the skills to interpret data and apply insights to real-world business problems.",
      image: getRandomImageUrl(),
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
        "Master project management techniques in the construction industry. This course covers project planning, scheduling, budgeting, and risk management, providing practical skills to manage construction projects effectively from inception to completion.",
      image: getRandomImageUrl(),
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
        "Explore the fundamentals of criminological theory and practice. This course examines the causes and consequences of criminal behavior, the functioning of the criminal justice system, and contemporary issues in crime and punishment.",
      image: getRandomImageUrl(),
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
      description:
        "Prepare and manage emergency situations effectively with this course. Learn the principles of emergency response planning, including risk assessment, resource management, and crisis communication to ensure preparedness for various emergency scenarios.",
      image: getRandomImageUrl(),
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
      description:
        "Cover the essential concepts of engineering with this foundational course. Topics include materials science, mechanics, thermodynamics, and electrical circuits, providing a broad overview of engineering principles and their real-world applications.",
      image: getRandomImageUrl(),
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
        "Take a deeper look into modern healthcare systems around the world. This course explores advanced topics in healthcare policy, management, and technology, preparing students to address complex challenges in global healthcare delivery.",
      image: getRandomImageUrl(),
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
        "Explore effective human resource strategies for modern organizations. This course covers talent management, organizational development, and employee engagement, providing practical tools to enhance HR practices and improve organizational performance.",
      image: getRandomImageUrl(),
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
      description:
        "Explore current issues and debates in the humanities with this course. Topics include cultural studies, philosophy, literature, and history, providing a broad perspective on contemporary human experiences and societal challenges.",
      image: getRandomImageUrl(),
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
        "Learn in-depth strategies and technologies to protect information systems from cyber threats. This course covers advanced topics in network security, encryption, and ethical hacking, providing hands-on experience with cutting-edge security tools and techniques.",
      image: getRandomImageUrl(),
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
      description:
        "Develop effective leadership strategies for the non-profit sector. This course covers topics such as fundraising, volunteer management, and organizational sustainability, equipping students with the skills to lead and manage non-profit organizations successfully.",
      image: getRandomImageUrl(),
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
      description:
        "Explore contemporary design and architecture trends with this course. Topics include sustainable design, urban planning, and digital modeling, providing students with a comprehensive understanding of modern architectural practices and their impact on the built environment.",
      image: getRandomImageUrl(),
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
        "Understand the psychological factors driving criminal actions with this course. Explore theories of criminal behavior, mental health issues, and forensic psychology, providing insights into the mind of a criminal and the implications for the criminal justice system.",
      image: getRandomImageUrl(),
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
      description:
        "Identify and mitigate cyber threats effectively with this course. Learn about the latest cyber threat landscapes, risk assessment methodologies, and mitigation strategies to protect information systems and ensure cybersecurity resilience.",
      image: getRandomImageUrl(),
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
      description:
        "Study the spread and control of diseases with this course. Learn about epidemiological methods, public health interventions, and global health challenges, providing a comprehensive understanding of how to protect and improve population health.",
      image: getRandomImageUrl(),
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
        "Dive into advanced concepts and techniques in structural engineering. This course covers topics such as finite element analysis, seismic design, and material science, providing students with the knowledge to tackle complex engineering challenges.",
      image: getRandomImageUrl(),
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
        "Focus on psychiatric and mental health nursing practices with this course. Learn about mental health assessment, therapeutic interventions, and patient care strategies, preparing students to support individuals with mental health conditions.",
      image: getRandomImageUrl(),
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
      description:
        "Explore the core principles and effective strategies for teaching. This course covers instructional design, classroom management, and assessment techniques, providing practical skills to enhance teaching effectiveness and student learning outcomes.",
      image: getRandomImageUrl(),
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
        "Learn strategies for developing and enhancing human resources in organizations. This course covers training and development, performance management, and organizational development, providing tools to improve employee skills and drive organizational success.",
      image: getRandomImageUrl(),
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
        "Explore innovative strategies and tools in digital marketing. This course covers topics such as content marketing, social media, SEO, and data analytics, providing practical skills to create effective digital marketing campaigns and measure their success.",
      image: getRandomImageUrl(),
      price: 3200,
      discountedPrice: 2900,
      duration: "12 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "MK301",
      courseSubjectId: findSubjectId("Marketing"),
      deliveryPartnerId: findPartnerId(2),
    },
    {
      title: "Introduction to Environmental Science",
      description:
        "This course offers an overview of environmental science, exploring the interactions between the natural environment and human activities. Topics include ecology, sustainability, and environmental policy.",
      image: getRandomImageUrl(),
      price: 180.0,
      discountedPrice: 160.0,
      duration: "8 weeks",
      courseType: "Self-paced",
      courseLevelId: findCourseLevelId("Certificate"),
      courseCode: "ES101",
      courseSubjectId: findSubjectId("Humanities"),
      deliveryPartnerId: findPartnerId(7),
    },
    {
      title: "Modern Software Development",
      description:
        "Gain practical skills in modern software development methodologies, including Agile, DevOps, and continuous integration/continuous deployment (CI/CD). This course covers the latest tools and practices for efficient software engineering.",
      image: getRandomImageUrl(),
      price: 250.0,
      discountedPrice: 220.0,
      duration: "10 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "SD101",
      courseSubjectId: findSubjectId("IT & Computer Science"),
      deliveryPartnerId: findPartnerId(3),
    },
    {
      title: "Financial Accounting Fundamentals",
      description:
        "Learn the basics of financial accounting, including balance sheets, income statements, and cash flow management. This course provides foundational knowledge essential for careers in finance and accounting.",
      image: getRandomImageUrl(),
      price: 200.0,
      discountedPrice: 180.0,
      duration: "8 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "FA101",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(9),
    },
    {
      title: "Robotics Engineering",
      description:
        "Explore the fundamentals of robotics engineering, including mechanical design, control systems, and programming. This course provides hands-on experience with building and programming robots.",
      image: getRandomImageUrl(),
      price: 3200,
      discountedPrice: 2900,
      duration: "16 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Undergraduate"),
      courseCode: "RE101",
      courseSubjectId: findSubjectId("Engineering"),
      deliveryPartnerId: findPartnerId(4),
    },
    {
      title: "Clinical Psychology",
      description:
        "Study the principles of clinical psychology, including diagnosis, treatment, and research methods. This course prepares students for advanced studies and careers in mental health professions.",
      image: getRandomImageUrl(),
      price: 2800,
      discountedPrice: 2500,
      duration: "12 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "CP101",
      courseSubjectId: findSubjectId("Psychology"),
      deliveryPartnerId: findPartnerId(1),
    },
    {
      title: "Sustainable Urban Planning",
      description:
        "Learn about sustainable urban planning practices, including green building, renewable energy, and smart city technologies. This course addresses the challenges and solutions for sustainable urban development.",
      image: getRandomImageUrl(),
      price: 3100,
      discountedPrice: 2800,
      duration: "14 weeks",
      courseType: "In-person",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "UP101",
      courseSubjectId: findSubjectId("Construction Management"),
      deliveryPartnerId: findPartnerId(5),
    },
    {
      title: "Global Health Policy",
      description:
        "Examine global health policy issues, including healthcare access, disease prevention, and international health organizations. This course provides a comprehensive understanding of global health challenges and solutions.",
      image: getRandomImageUrl(),
      price: 4500,
      discountedPrice: 4200,
      duration: "20 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "GH101",
      courseSubjectId: findSubjectId("Public Health"),
      deliveryPartnerId: findPartnerId(9),
    },
    {
      title: "Ethics in Biotechnology",
      description:
        "Explore the ethical issues surrounding biotechnology, including genetic engineering, cloning, and stem cell research. This course provides a framework for understanding the ethical implications of biotechnological advancements.",
      image: getRandomImageUrl(),
      price: 2300,
      discountedPrice: 2100,
      duration: "10 weeks",
      courseType: "Instructor-led",
      courseLevelId: findCourseLevelId("CPD"),
      courseCode: "BT101",
      courseSubjectId: findSubjectId("Healthcare"),
      deliveryPartnerId: findPartnerId(8),
    },
    {
      title: "Digital Transformation Strategies",
      description:
        "Understand the principles and practices of digital transformation in organizations. This course covers the latest trends and technologies driving digital change, including cloud computing, big data, and AI.",
      image: getRandomImageUrl(),
      price: 3000,
      discountedPrice: 2700,
      duration: "12 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Professional course"),
      courseCode: "DT101",
      courseSubjectId: findSubjectId("Business & Management"),
      deliveryPartnerId: findPartnerId(6),
    },
    {
      title: "Advanced Pharmacology",
      description:
        "Delve into the advanced principles of pharmacology, including drug interactions, pharmacokinetics, and pharmacodynamics. This course is essential for students pursuing careers in medical and healthcare fields.",
      image: getRandomImageUrl(),

      price: 3600,
      discountedPrice: 3300,
      duration: "15 weeks",
      courseType: "Online",
      courseLevelId: findCourseLevelId("Postgraduate"),
      courseCode: "PHAR101",
      courseSubjectId: findSubjectId("Healthcare"),
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
  //endregion

  //region Company and Company Employee

  await prisma.companyEmployee.deleteMany();
  await prisma.company.deleteMany();

  await prisma.company.createMany({
    data: [
      {
        name: "Elizabeth School of London Limited",
        shortName: "ESL",
        logo: "/testings/esl_logo.png",
        domains: ["esl.ac.uk", "elizabethschool.com"],
      },
      {
        name: "Victoria College of Arts and Design",
        shortName: "VCAD",
        logo: "/testings/vcad_logo.png",
        domains: ["vcad.ac.uk"],
      },
      {
        name: "William College",
        shortName: "WC",
        logo: "/testings/wc_logo.png",
        domains: ["williamcollege.com"],
      },
      {
        name: "London Professional College",
        shortName: "LPC",
        logo: "/testings/lpc_logo.png",
        domains: [
          "londonprofessionalcollege.com",
          "lpc.ac.uk",
          "londonpc.org.uk",
        ],
      },
      {
        name: "University Application Portal",
        shortName: "UAP",
        logo: "/testings/uap_logo.png",
        domains: [
          "uniapplicationportal.com",
          "universityapplicationportal.com",
        ],
      },
      {
        name: "Planet Education Networks",
        shortName: "pengroup",
        logo: "/testings/pen_logo.png",
        domains: ["planeteducationnetworks.com", "pengroup.com"],
      },
      {
        name: "Zenith School of Studies",
        shortName: "ZSOS",
        logo: "/testings/zsos_logo.png",
        domains: ["zenithschool.com", "zsos.com"],
      },
    ],
  });

  const companyEsl = await prisma.company.findFirst({
    where: {
      name: "Elizabeth School of London Limited",
    },
  });

  const companyVcad = await prisma.company.findFirst({
    where: {
      name: "Victoria College of Arts and Design",
    },
  });

  const companyWilliam = await prisma.company.findFirst({
    where: {
      name: "William College",
    },
  });

  const companyLpc = await prisma.company.findFirst({
    where: {
      name: "London Professional College",
    },
  });

  const companyUap = await prisma.company.findFirst({
    where: {
      name: "University Application Portal",
    },
  });

  const companyPen = await prisma.company.findFirst({
    where: {
      name: "Planet Education Networks",
    },
  });

  const companyZsos = await prisma.company.findFirst({
    where: {
      name: "Zenith School of Studies",
    },
  });

  if (
    !companyEsl ||
    !companyVcad ||
    !companyWilliam ||
    !companyLpc ||
    !companyUap ||
    !companyPen ||
    !companyZsos
  ) {
    return console.error("Business client not found");
  }

  // Create ADMINS for each company
  await prisma.companyEmployee.createMany({
    data: [
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "companyesl@esl.ac.uk",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyEsl.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@vcad.co.uk",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyVcad.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@williamcollege.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyWilliam.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@londonpc.org.uk",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyEsl.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@universityapplicationportal.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyUap.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@pengroup.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyPen.id,
      },
      {
        firstName: "Moshfiqur",
        lastName: "Rahman",
        email: "moshfiqur@zsos.co.uk",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        roles: ["COMPANY_ADMIN"],
        companyId: companyZsos.id,
      },
    ],
  });

  // Create random employees for each company
  const employeeData = [
    {
      firstName: "Rafin Rahman",
      lastName: "Moshfiqur",
      email: "employeeesl@esl.ac.uk",
      telephone: "9876543210",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@elizabethschool.com",
      telephone: "1231231234",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob@vcad.ac.uk",
      telephone: "4564564567",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie@vcad.ac.uk",
      telephone: "7897897890",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "David",
      lastName: "Wilson",
      email: "david@zenithschool.com",
      telephone: "2342342345",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Eva",
      lastName: "Moore",
      email: "eva@zsos.com",
      telephone: "3453453456",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Frank",
      lastName: "Taylor",
      email: "frank@uniapplicationportal.com",
      telephone: "4564564567",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Grace",
      lastName: "Anderson",
      email: "grace@universityapplicationportal.com",
      telephone: "5675675678",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Hank",
      lastName: "Thomas",
      email: "hank@williamcollege.com",
      telephone: "6786786789",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Ivy",
      lastName: "Jackson",
      email: "ivy@williamcollege.com",
      telephone: "7897897890",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Jack",
      lastName: "White",
      email: "jack@londonprofessionalcollege.com",
      telephone: "8908908901",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Kara",
      lastName: "Harris",
      email: "kara@lpc.ac.uk",
      telephone: "9019019012",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Liam",
      lastName: "Martin",
      email: "liam@londonpc.org.uk",
      telephone: "0120120123",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Mia",
      lastName: "Lee",
      email: "mia@planeteducationnetworks.com",
      telephone: "1231231234",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Nate",
      lastName: "Clark",
      email: "nate@pengroup.com",
      telephone: "2342342345",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Olivia",
      lastName: "Green",
      email: "olivia@esl.ac.uk",
      telephone: "1111111111",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Liam",
      lastName: "Brown",
      email: "liam@esl.ac.uk",
      telephone: "2222222222",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Sophia",
      lastName: "Davis",
      email: "sophia@esl.ac.uk",
      telephone: "3333333333",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Lucas",
      lastName: "Wilson",
      email: "lucas@esl.ac.uk",
      telephone: "4444444444",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Mia",
      lastName: "Taylor",
      email: "mia@esl.ac.uk",
      telephone: "5555555555",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma@elizabethschool.com",
      telephone: "6666666666",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Ava",
      lastName: "White",
      email: "ava@elizabethschool.com",
      telephone: "7777777777",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Noah",
      lastName: "Harris",
      email: "noah@elizabethschool.com",
      telephone: "8888888888",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Isabella",
      lastName: "Martin",
      email: "isabella@elizabethschool.com",
      telephone: "9999999999",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "Elijah",
      lastName: "Thompson",
      email: "elijah@elizabethschool.com",
      telephone: "1010101010",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyEsl.id,
    },
    {
      firstName: "James",
      lastName: "Lopez",
      email: "james@vcad.ac.uk",
      telephone: "1111222233",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Charlotte",
      lastName: "Gonzalez",
      email: "charlotte@vcad.ac.uk",
      telephone: "2222333344",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Benjamin",
      lastName: "Perez",
      email: "benjamin@vcad.ac.uk",
      telephone: "3333444455",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Harper",
      lastName: "Moore",
      email: "harper@vcad.ac.uk",
      telephone: "4444555566",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Ethan",
      lastName: "Miller",
      email: "ethan@vcad.ac.uk",
      telephone: "5555666677",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyVcad.id,
    },
    {
      firstName: "Amelia",
      lastName: "Garcia",
      email: "amelia@zenithschool.com",
      telephone: "6666777788",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Alexander",
      lastName: "Martinez",
      email: "alexander@zenithschool.com",
      telephone: "7777888899",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Mason",
      lastName: "Rodriguez",
      email: "mason@zenithschool.com",
      telephone: "8888999900",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Evelyn",
      lastName: "Martinez",
      email: "evelyn@zenithschool.com",
      telephone: "9999000011",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Logan",
      lastName: "Hernandez",
      email: "logan@zenithschool.com",
      telephone: "0000111122",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Oliver",
      lastName: "Clark",
      email: "oliver@zsos.com",
      telephone: "1111333344",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Scarlett",
      lastName: "Lewis",
      email: "scarlett@zsos.com",
      telephone: "2222444455",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Henry",
      lastName: "Robinson",
      email: "henry@zsos.com",
      telephone: "3333555566",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Emily",
      lastName: "Walker",
      email: "emily@zsos.com",
      telephone: "4444666677",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Jack",
      lastName: "Young",
      email: "jack@zsos.com",
      telephone: "5555777788",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyZsos.id,
    },
    {
      firstName: "Michael",
      lastName: "King",
      email: "michael@uniapplicationportal.com",
      telephone: "6666888899",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Luna",
      lastName: "Wright",
      email: "luna@uniapplicationportal.com",
      telephone: "7777999900",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "William",
      lastName: "Hill",
      email: "william@uniapplicationportal.com",
      telephone: "8888000011",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Ella",
      lastName: "Scott",
      email: "ella@uniapplicationportal.com",
      telephone: "9998111122",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Daniel",
      lastName: "Adams",
      email: "daniel@uniapplicationportal.com",
      telephone: "0008222233",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Jacob",
      lastName: "Baker",
      email: "jacob@universityapplicationportal.com",
      telephone: "1119333344",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Aiden",
      lastName: "Gonzalez",
      email: "aiden@universityapplicationportal.com",
      telephone: "2229444455",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Zoey",
      lastName: "Nelson",
      email: "zoey@universityapplicationportal.com",
      telephone: "3339555566",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Sebastian",
      lastName: "Carter",
      email: "sebastian@universityapplicationportal.com",
      telephone: "4449666677",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Aria",
      lastName: "Mitchell",
      email: "aria@universityapplicationportal.com",
      telephone: "5559777788",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyUap.id,
    },
    {
      firstName: "Matthew",
      lastName: "Perez",
      email: "matthew@williamcollege.com",
      telephone: "6669888899",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Ella",
      lastName: "Roberts",
      email: "ella@williamcollege.com",
      telephone: "7779999900",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Samuel",
      lastName: "Turner",
      email: "samuel@williamcollege.com",
      telephone: "8881000011",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Avery",
      lastName: "Phillips",
      email: "avery@williamcollege.com",
      telephone: "9991111122",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Carter",
      lastName: "Campbell",
      email: "carter@williamcollege.com",
      telephone: "0001222233",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyWilliam.id,
    },
    {
      firstName: "Sofia",
      lastName: "Parker",
      email: "sofia@londonprofessionalcollege.com",
      telephone: "1111333355",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Dylan",
      lastName: "Evans",
      email: "dylan@londonprofessionalcollege.com",
      telephone: "2221444466",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Leah",
      lastName: "Edwards",
      email: "leah@londonprofessionalcollege.com",
      telephone: "3331555577",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Jackson",
      lastName: "Collins",
      email: "jackson@londonprofessionalcollege.com",
      telephone: "4441666688",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Grace",
      lastName: "Stewart",
      email: "grace@londonprofessionalcollege.com",
      telephone: "5551777799",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Victoria2",
      lastName: "Sanchez",
      email: "victoria2@lpc.ac.uk",
      telephone: "6661888800",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Gabriel",
      lastName: "Morris",
      email: "gabriel@lpc.ac.uk",
      telephone: "7771999911",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Riley",
      lastName: "Rogers",
      email: "riley@lpc.ac.uk",
      telephone: "8882111122",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Victoria",
      lastName: "Reed",
      email: "victoria@lpc.ac.uk",
      telephone: "9992222233",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "David",
      lastName: "Cook",
      email: "david@lpc.ac.uk",
      telephone: "0002333344",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Zoey",
      lastName: "Morgan",
      email: "zoey@londonpc.org.uk",
      telephone: "1112444455",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Lillian",
      lastName: "Bell",
      email: "lillian@londonpc.org.uk",
      telephone: "2222555566",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Lucas",
      lastName: "Murphy",
      email: "lucas@londonpc.org.uk",
      telephone: "3332666677",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Addison",
      lastName: "Bailey",
      email: "addison@londonpc.org.uk",
      telephone: "4442777788",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Grace",
      lastName: "Rivera",
      email: "grace@londonpc.org.uk",
      telephone: "5552888899",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyLpc.id,
    },
    {
      firstName: "Victoria",
      lastName: "Cooper",
      email: "victoria@planeteducationnetworks.com",
      telephone: "6662999900",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Luna",
      lastName: "Richardson",
      email: "luna@planeteducationnetworks.com",
      telephone: "7772111122",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Sebastian",
      lastName: "Cox",
      email: "sebastian@planeteducationnetworks.com",
      telephone: "8882222233",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Grace",
      lastName: "Howard",
      email: "grace@planeteducationnetworks.com",
      telephone: "9992333344",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Evelyn",
      lastName: "Ward",
      email: "evelyn@planeteducationnetworks.com",
      telephone: "0002444455",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Riley",
      lastName: "Torres",
      email: "riley@pengroup.com",
      telephone: "1112555566",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Daniel",
      lastName: "Peterson",
      email: "daniel@pengroup.com",
      telephone: "2222666677",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Aria",
      lastName: "Gray",
      email: "aria@pengroup.com",
      telephone: "3332777788",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Jacob",
      lastName: "Ramirez",
      email: "jacob@pengroup.com",
      telephone: "4442888899",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
    {
      firstName: "Ella",
      lastName: "James",
      email: "ella@pengroup.com",
      telephone: "5552999900",
      password: await hashPassword("123123"),
      roles: ["COMPANY_EMPLOYEE"],
      companyId: companyPen.id,
    },
  ];

  await prisma.companyEmployee.createMany({
    data: employeeData,
  });

  //endregion

  //region Business Courses and Modules
  // delete all courses
  await prisma.businessCourseModule.deleteMany();
  await prisma.businessCourse.deleteMany();

  // create business courses
  const businessCourses = [
    {
      title: "The Essentials of Data Protection",
      description:
        "Learn the core principles of data protection with this comprehensive course. Covering topics such as data privacy laws, information security, and risk management, this course provides a solid foundation for safeguarding sensitive information in any organization.",
      thumbnail: "testings/data_protection.png",
      price: 2500,
    },
    {
      title: "Radicalisation and Extremism (Prevent)",
      description:
        "Understand the causes and consequences of radicalization and extremism with this course. Learn about the strategies and policies in place to prevent radicalization, identify warning signs, and promote community cohesion.",
      thumbnail: "testings/extremism.png",
      price: 2000,
    },
    {
      title: "Level 2 Safeguarding Adults",
      description:
        "Gain essential knowledge on safeguarding adults with this Level 2 course. Learn about the legal responsibilities, types of abuse, and best practices for protecting vulnerable adults in various settings.",
      thumbnail: "testings/safeguarding_adults.png",
      price: 1800,
    },
    {
      title: "Unconscious Bias in the Workplace",
      description:
        "Identify and address unconscious biases in the workplace with this insightful course. Learn about the impact of biases on decision-making, workplace culture, and how to implement strategies for creating a more inclusive environment.",
      thumbnail: "testings/bias.png",
      price: 2200,
    },
    {
      title: "Bullying and Harassment in the Workplace",
      description:
        "Learn how to recognize, prevent, and address bullying and harassment in the workplace. This course covers the legal framework, organizational policies, and practical steps for creating a safe and respectful work environment.",
      thumbnail: "testings/bullying.png",
      price: 2300,
    },
    {
      title: "Equality, Diversity and Inclusion for Employees",
      description:
        "Understand the principles of equality, diversity, and inclusion in the workplace with this course. Learn about the benefits of a diverse workforce, legal requirements, and strategies for promoting an inclusive organizational culture.",
      thumbnail: "testings/equality.png",
      price: 2400,
    },
    {
      title: "Cybersecurity Fundamentals",
      description:
        "Get an introduction to the basics of cybersecurity. Learn about different types of cyber threats, security protocols, and measures to protect your digital assets from cyber-attacks.",
      thumbnail: "testings/cybersecurity.png",
      price: 2750,
    },
    {
      title: "Project Management Professional (PMP) Certification Prep",
      description:
        "Prepare for the PMP certification with this comprehensive course. Covering all key aspects of project management, this course is designed to help you pass the PMP exam with confidence.",
      thumbnail: "",
      price: 2900,
    },
    {
      title: "Emotional Intelligence in Leadership",
      description:
        "Enhance your leadership skills by developing emotional intelligence. This course explores techniques to improve self-awareness, empathy, and effective communication in a leadership role.",
      thumbnail: "testings/emotional_intelligence.png",
      price: 2600,
    },
    {
      title: "Advanced Excel for Data Analysis",
      description:
        "Master advanced Excel functions and tools for data analysis. Learn about pivot tables, macros, and data visualization techniques to enhance your data analysis skills.",
      thumbnail: "testings/analytics.webp",
      price: 2000,
    },
    {
      title: "Introduction to Digital Marketing",
      description:
        "Discover the fundamentals of digital marketing, including SEO, social media marketing, content marketing, and email marketing. Learn how to create effective digital marketing strategies.",
      thumbnail: "testings/digital_marketing.jpeg",
      price: 1800,
    },
    {
      title: "Time Management and Productivity",
      description:
        "Improve your productivity by mastering time management skills. This course provides practical tips and techniques for organizing your tasks, setting priorities, and managing your time effectively.",
      thumbnail: "testings/time_management.jpg",
      price: 1500,
    },
    {
      title: "Conflict Resolution in the Workplace",
      description:
        "Learn strategies for resolving conflicts in the workplace. This course covers conflict resolution techniques, negotiation skills, and how to foster a collaborative work environment.",
      thumbnail: "testings/conflict_resolution.png",
      price: 2300,
    },
    {
      title: "Mental Health Awareness for Managers",
      description:
        "Equip managers with the knowledge to support employees' mental health. This course covers mental health awareness, recognizing signs of mental distress, and providing appropriate support.",
      thumbnail: "testings/mental_health.jpg",
      price: 2200,
    },
    {
      title: "Effective Communication Skills",
      description:
        "Enhance your communication skills with this course. Learn about different communication styles, active listening, and how to convey your message clearly and effectively.",
      thumbnail: "testings/communication_skills.jpg",
      price: 1700,
    },
    {
      title: "Customer Service Excellence",
      description:
        "Develop outstanding customer service skills with this course. Learn how to handle customer inquiries, manage complaints, and deliver exceptional service to enhance customer satisfaction.",
      thumbnail: "testings/customer_service.png",
      price: 1900,
    },
  ];

  function getRandomBusinessCourseId(businessCourses) {
    //businessCourses is an array of business courses, each with an id
    const randomIndex = Math.floor(Math.random() * businessCourses.length);
    return businessCourses[randomIndex].id;
  }

  await prisma.businessCourse.createMany({
    data: businessCourses,
  });

  //endregion

  //region Business orders
  await prisma.businessOrderCourseQuantity.deleteMany();
  await prisma.businessOrder.deleteMany();

  // TODO: Create business orders with random courses and quantities

  // await prisma.businessOrder.createMany({
  //   data: [
  //     {
  //       companyId: companyEsl.id,
  //       businessOrderCourseQuantity: {
  //         create: {
  //           quantity: 1,
  //           businessCourseId: getRandomBusinessCourseId(businessCourses),
  //           businessOrderId:
  //         },
  //       },
  //     },
  //     {
  //       companyId: companyVcad.id,
  //     },
  //     {
  //       companyId: companyWilliam.id,
  //     },
  //     {
  //       companyId: companyLpc.id,
  //     },
  //     {
  //       companyId: companyUap.id,
  //     },
  //   ],
  // });

  //endregion

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
