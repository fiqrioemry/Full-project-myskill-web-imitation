import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../store/action/user-action";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  function isDataChanged() {
    return null;
  }

  useEffect(() => {
    if (!profile) dispatch(getUserProfile());
  }, [dispatch, profile]);
  return (
    <main className="container mx-auto">
      {!profile ? (
        <section className="h-screen flex items-center justify-center">
          <h1>LOADING...</h1>
        </section>
      ) : (
        <section className="h-screen py-3 px-6 space-y-3">
          <h3>Welcome, {profile.userName}</h3>
          <span>
            information about your profile and preference accross learningSphere
            services.
          </span>
          <div>
            <form className="space-y-3 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <div>
                  <Label htmlFor="">Username</Label>
                  <Input value={profile.fullname} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <div>
                  <Label htmlFor="">phone number</Label>
                  <Input value={profile.phone} />
                </div>

                <div>
                  <Label htmlFor="">Location</Label>
                  <Input value={profile.location} />
                </div>

                <div>
                  <Label htmlFor="">profession</Label>
                  <Input value={profile.profession} />
                </div>

                <div>
                  <Label htmlFor="">Oppurtunity Looking</Label>
                  <Input value={profile.opportunity} />
                </div>

                <div>
                  <Label htmlFor="">Link CV</Label>
                  <Input value={profile.linkCV} />
                </div>
              </div>
              <Button disabled={isDataChanged()} className="w-full md:w-1/2">
                Save change
              </Button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
