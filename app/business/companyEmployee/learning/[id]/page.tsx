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
      <Tabs defaultValue="account" className="w-full flex gap-10 mt-20 ">
        <TabsList className="flex flex-wrap w-[150px] gap-6">
          <TabsTrigger value="account">Chapter 1</TabsTrigger>
          <TabsTrigger value="password">Chapter 2</TabsTrigger>
          <TabsTrigger value="account1">
            Chapter 1
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="password2">
            Chapter 2<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
        </TabsList>
        <div className={"w-full"}>
          <TabsContent value="account">
            <Card>
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
          <TabsContent value="password">
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
