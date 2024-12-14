import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userData = {
  userName: "ahmad fiqri oemry",
  phoneNumber: "082160945033",
  location: "Jakarta",
  profession: "Front End Developer",
  lookingFor: "Fulltime Entry Level",
  linkCV: "www.linkcv.com",
};

const Profile = () => {
  return (
    <main className="container mx-auto">
      <section className="h-screen py-3 px-6 ">
        <h3>Welcome, {userData.userName}</h3>
        <div>
          <form className="space-y-3">
            <div>
              <Label htmlFor="">Username</Label>
              <Input value={userData.userName} className="w-1/2" />
            </div>

            <div>
              <Input value={userData.phoneNumber} />
              <Input value={userData.location} />
              <Input value={userData.profession} />
              <Input value={userData.lookingFor} />
              <Input value={userData.linkCV} />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Profile;
