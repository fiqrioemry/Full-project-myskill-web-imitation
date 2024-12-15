import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../store/action/user-action";
import { useEffect, useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);

  const { profile, loading } = useSelector((state) => state.user);

  function isDataChanged() {
    return JSON.stringify(userProfile) === JSON.stringify(profile);
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Load user profile from the store
  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfile());
    } else {
      setUserProfile({ ...profile });
    }
  }, [dispatch, profile]);

  // Handle save changes
  const handleSaveChanges = () => {
    if (!isDataChanged()) {
      dispatch(updateUserProfile(userProfile));
    }
  };

  return (
    <main className="container mx-auto">
      {!userProfile ? (
        <section className="h-screen flex items-center justify-center">
          <h1>LOADING...</h1>
        </section>
      ) : (
        <section className="h-screen py-3 px-6 space-y-3">
          <h3>Welcome, {userProfile.userName}</h3>
          <span>
            Information about your profile and preferences across LearningSphere
            services.
          </span>
          <div>
            <form className="space-y-3 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <div>
                  <Label htmlFor="">Username</Label>
                  <Input
                    name="fullname"
                    value={userProfile.fullname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <div>
                  <Label htmlFor="">Phone Number</Label>
                  <Input
                    name="phone"
                    value={userProfile.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="">Location</Label>
                  <Input
                    name="location"
                    value={userProfile.location}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="">Profession</Label>
                  <Input
                    name="profession"
                    value={userProfile.profession}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="">Opportunity Looking</Label>
                  <Input
                    name="opportunity"
                    value={userProfile.opportunity}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="">Link CV</Label>
                  <Input
                    name="linkCV"
                    value={userProfile.linkCV}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button
                disabled={isDataChanged()}
                onClick={handleSaveChanges}
                className="w-full md:w-1/2"
              >
                {loading ? "loading" : "Save Changes"}
              </Button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
