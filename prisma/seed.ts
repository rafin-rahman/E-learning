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
        role: ["STAFF", "ADMIN"],
      },
      {
        firstName: "Keanu",
        lastName: "Patton",
        email: "basic@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        role: ["STAFF", "COURSE_MANAGER"],
        permissions: ["can_delete_students"],
      },
      {
        firstName: "Hugo",
        lastName: "Mcgee",
        email: "superadmin@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        role: ["STAFF", "SUPER_ADMIN"],
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
        role: ["STUDENT"],
      },
      {
        firstName: "Elizabeth",
        lastName: "Hart",
        email: "student2@gmail.com",
        telephone: "1234567890",
        password: await hashPassword("123123"),
        role: ["STUDENT"],
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
      description:
        "This course provides a comprehensive introduction to programming, covering fundamental concepts, syntax, and problem-solving techniques. Students will learn to write and debug code, work with data structures, and develop basic algorithms. Ideal for beginners.",
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
        "Gain an overview of healthcare systems, policies, and practices. This course introduces students to the structure and function of healthcare organizations, patient care, and the various roles of healthcare professionals.",
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
      image:
        "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-MW9sQkVaHQxGCvXfMnb4kDtKDd0aKv.webp",
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
