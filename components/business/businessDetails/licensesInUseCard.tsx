import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function LicensesInUseCard({
  emailsList,
}: {
  emailsList: { email: string; progress: number; awards: string }[];
}) {
  return (
    <Card className={" shadow"}>
      <CardHeader>
        <CardTitle>
          <div>Licenses in use </div>
        </CardTitle>
        <CardDescription className={"flex justify-between"}>
          <div>Licences is use: 10/50</div>
          <div>
            Account <span className={"text-green-600"}>ACTIVE</span>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator
        className={
          "mb-12 mt-4 shadow bg-gradient-to-r from-amber-300 to-red-400 opacity-40"
        }
      />
      <CardContent>
        <ul className={"leading-10"}>
          {emailsList.map((item) => {
            return (
              <li className={"flex items-center gap-10 group justify-between"}>
                <div className={"w-[20%]"}>{item.email}</div>
                <div className={"flex w-[50%] items-center gap-4 "}>
                  {" "}
                  <div className={"text-xs"}>Training Progress</div>
                  <Progress value={item.progress} className="w-[30%] " />{" "}
                  {item.progress}%
                </div>
                <div>Award obtained: {item.awards} </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className={"shadow"}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
