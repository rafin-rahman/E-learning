import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockClosedIcon } from "@heroicons/react/16/solid";

export default function CpdDetails({ params }: { params: { id: string } }) {
  //function that takes a string and converts %20 into spaces
  function wordConvert(word: string) {
    return word.replace(/%20/g, " ");
  }

  return (
    <div className={"container"}>
      <h1 className={"text-4xl"}>{wordConvert(params.id)}</h1>
      <p className={"text-gray-500"}>
        Understand the causes and consequences of radicalization and extremism
        with this course. Learn about the strategies and policies in place to
        prevent radicalization, identify warning signs, and promote community
        cohesion.
      </p>
      <Tabs defaultValue="account" className="w-full flex gap-10 mt-20 my-10">
        <TabsList className="flex flex-wrap w-[150px] gap-6">
          <TabsTrigger value="0">Introduction</TabsTrigger>
          <TabsTrigger value="1">Chapter 1</TabsTrigger>
          <TabsTrigger value="2">Chapter 2</TabsTrigger>
          <TabsTrigger value="3">
            Chapter 3
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="4">
            Chapter 4<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="5">
            Chapter 5
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="6">
            Chapter 6<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>{" "}
          <TabsTrigger value="7">
            Chapter 7
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="8">
            Chapter 8<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="9">
            Chapter 9
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="10">
            Chapter 10
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
        </TabsList>
        <div className={"w-full"}>
          <TabsContent value="0">
            <Card className={"flex-1"}>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="1">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
