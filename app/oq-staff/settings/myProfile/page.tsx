import MyProfileComponent from "@/components/myProfile/MyProfileComponent";
import getUserDetails from "@/app/oq-staff/settings/myProfile/getUserDetails";

export default function MyProfile() {
  getUserDetails();
  return (
    <div className={"container mt-10"}>
      <h1 className={"text-4xl mb-10"}>My Profile</h1>
      <MyProfileComponent userType="staff" />
    </div>
  );
}
