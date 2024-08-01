import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PersonalDetailsForm from "@/components/myProfile/PersonalDetailsForm";

interface MyProfileComponentProps {
  userType: string;
}

export default function MyProfileComponent({
  userType,
}: MyProfileComponentProps) {
  return (
    <>
      <Card className={"bg-offWhite"}>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonalDetailsForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
