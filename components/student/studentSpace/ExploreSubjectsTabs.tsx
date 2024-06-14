import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function ExploreSubjectsTabs({
  allCourseUrl,
}: {
  allCourseUrl: string;
}) {
  return (
    <Tabs defaultValue="business" className="w-full mt-10">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="business">Business & Management</TabsTrigger>
        <TabsTrigger value="healthcare">Healthcare & Medicine</TabsTrigger>
        <TabsTrigger value="teaching">Teaching</TabsTrigger>
        <TabsTrigger value="tech">Tech & IT</TabsTrigger>
        <TabsTrigger value="psychology">Psychology </TabsTrigger>
        <TabsTrigger value="science">Science & Engineering </TabsTrigger>
      </TabsList>
      <TabsContent value="business">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Business & Management</CardTitle>
            <CardDescription>
              Boss it in business with our specialist upskilling courses,
              industry certifications and high-flying degrees.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                No matter what your goals are, leading experts from the likes of
                Accenture, AWS and Deakin University will guide you to achieve
                them. From data analytics to digital marketing, start learning
                from the best.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                The course was beautifully conceptualised, and well presented.
                The videos were lucid, clear, articulate and informative.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Business & Management
                  </div>
                  <p className={"font-bold mb-2"}>
                    Business Opportunities in Additive Manufacturing
                  </p>
                  <div className="text-gray-700 text-xs  ">
                    Discover how business is enhanced and created with additive
                    manufacturing and find out how it works in a real-life
                    situation.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Business & Management
                  </div>
                  <p className={"font-bold mb-2"}>
                    Harnessing Al in Marketing and Communication
                  </p>

                  <div className="text-gray-700 text-xs  ">
                    Learn how to harness Al technology to plan and deliver
                    compelling content, automate marketing processes, and boost
                    efficiency.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="healthcare">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Healthcare & Medicine</CardTitle>
            <CardDescription>
              Earning CPD and getting that all-important professional
              development has never been easier. Our expansive range of
              healthcare & medicine courses by leading experts will support your
              career journey – no matter where you want to go.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                For nurses, pharmacists and clinical researchers alike, it all
                starts here. The work you do matters, and so does your future.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                Throughout the course there was an emphasis on reflection and
                self observation, which I found very insightful. I feel that as
                well as gaining practical strategies, I have learned something
                about myself too.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Healthcare & Medicine
                  </div>
                  <p className={"font-bold mb-2"}>
                    Train the Healthcare Trainer
                  </p>
                  <div className="text-gray-700 text-xs  ">
                    Learn how to deliver healthcare training using
                    evidence-based teaching methods, and progress towards
                    becoming an expert trainer.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Healthcare & Medicine
                  </div>
                  <p className={"font-bold mb-2"}>
                    End of Life Challenges and Palliative Care
                  </p>

                  <div className="text-gray-700 text-xs  ">
                    Explore critical perspectives on dying, death, and grief to
                    develop your professional practice or reflect on personal
                    experience.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Microcredential
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="teaching">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Teaching</CardTitle>
            <CardDescription>
              Become an effective educational leader and confidently empower
              future generations with our rich portfolio of online teaching
              courses, covering everything from curriculum design to inclusive
              teaching.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                As education experts ourselves, we'll help you master essential
                skills and teaching pedagogies. Start putting your professional
                development goals first.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                The course was informative, interactive and useful. I will
                definitely use the methods and techniques of inclusion in my
                classroom. Thank you.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Teaching
                  </div>
                  <p className={"font-bold mb-2"}>Teach like an Entrepreneur</p>
                  <div className="text-gray-700 text-xs  ">
                    Learn how to teach entrepreneurial skills, inspire young
                    people and transform teaching and learning to become more
                    entrepreneurial
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661769726567-9a31d3a22751?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Teaching
                  </div>
                  <p className={"font-bold mb-2"}>Teaching English Online</p>

                  <div className="text-gray-700 text-xs  ">
                    Learn how to transfer your teaching skills to an online
                    context and start teaching English online.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Microcredential
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tech">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Tech & IT</CardTitle>
            <CardDescription>
              Step into the future with our ever-growing tech & IT portfolio,
              offering cutting-edge courses in topics like generative Al,
              programming and cyber security.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                Learn from world-renowned industry experts such as Microsoft,
                CloudSwyft and Cisco, and start building a roster of skills
                that'll catapult you into the next generation of tech leaders.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                The course modules were well-structured, with clear
                explanations, relevant examples, and interactive exercises that
                allowed me to apply what I learned in a hands-on manner.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    IT & Computer Science
                  </div>
                  <p className={"font-bold mb-2"}>
                    Computer Programming for Everyone
                  </p>
                  <div className="text-gray-700 text-xs  ">
                    Discover the art of computer programming and learn what code
                    can do with the Institute of Coding and the University of
                    Leeds.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    IT & Computer Science{" "}
                  </div>
                  <p className={"font-bold mb-2"}>
                    Cisco: Python Programming (OpenEDG)
                  </p>

                  <div className="text-gray-700 text-xs  ">
                    Prepare for a future in programming as you learn from
                    experts at Cisco and The Open University.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Microcredential
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="psychology">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Psychology & Mental Health</CardTitle>
            <CardDescription>
              Become one of society's changemakers with our credible collection
              of online psychology & mental health courses.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                Whether tackling trauma, mastering mindfulness or gearing up for
                a career as a psychologist, our expert-led courses and
                credentials will help you achieve career success and
                satisfaction.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                Great balance of research, personal stories and practical
                advice. Thank you.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1638443436690-db587cc66f12?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Business & Management
                  </div>
                  <p className={"font-bold mb-2"}>
                    Neurodiversity in the Workplace
                  </p>
                  <div className="text-gray-700 text-xs  ">
                    Develop your understanding of neurodiversity in the
                    workplace to better support your neurodivergent colleagues
                    or team members.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHN5Y2hvbG9neXxlbnwwfHwwfHx8MA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Psychology & Mental Health
                  </div>
                  <p className={"font-bold mb-2"}>
                    Mental Health: Working with Children and Young People
                  </p>

                  <div className="text-gray-700 text-xs  ">
                    Gain critical knowledge and practical skills to identify and
                    address mental health issues in children and young people.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Microcredential
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="science">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Science, Engineering & Maths</CardTitle>
            <CardDescription>
              Uncover the rules of the universe and start building a new future
              with our innovative online science, engineering & maths courses.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap w-2/3 items-stretch mr-10"}>
              <div>
                Guided by credible experts in fields such as genomics, quantum
                computing and climate science, you can upskill and prepare for a
                long and groundbreaking career in STEM.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                The course was very well-organised into manageable sections,
                with opportunities to hear from researchers in each field and
                suggested further learning links for personal study.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Science, Engineering & Maths
                  </div>
                  <p className={"font-bold mb-2"}>
                    Batteries for the Energy Transition
                  </p>
                  <div className="text-gray-700 text-xs  ">
                    Discover how batteries function, how they are produced, and
                    what happens at the end of their life cycle.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Short Course
                  </p>
                </div>
              </div>
              <div className="w-1/2 rounded overflow-hidden shadow-lg ">
                <div className="relative w-full h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image path
                    alt="Card Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 ">
                  <div className="bg-red-50 mb-2 text-xs font-light text-center rounded p-1">
                    Business & Management
                  </div>
                  <p className={"font-bold mb-2"}>
                    Data Analytics for Managers
                  </p>

                  <div className="text-gray-700 text-xs  ">
                    Maximise the data analytics capabilities of your team to
                    solve business problems or achieve business efticiencies.
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p
                    className={
                      "text-xs font-extralight bg-blue-50 text-center p-1 rounded"
                    }
                  >
                    Microcredential
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={allCourseUrl}>Explore courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
