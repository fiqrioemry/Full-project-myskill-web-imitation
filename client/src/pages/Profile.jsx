import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../components/common/common-form/FormInput";
import { userProfileFormData, userProfileFormInput } from "../config";
import { getUserProfile, updateUserProfile } from "../store/action/user-action";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(userProfileFormData);

  function isDataChanged() {
    return JSON.stringify(userProfile) === JSON.stringify(profile);
  }

  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfile());
    } else {
      setUserProfile({ ...profile });
    }
  }, [dispatch, profile]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(userProfile));
  };

  return (
    <main className="container mx-auto">
      {!userProfile ? (
        <section className="h-screen flex items-center justify-center">
          <h1>LOADING...</h1>
        </section>
      ) : (
        <section className="h-screen py-3 px-6 space-y-3">
          <h3>Welcome, {profile ? profile.fullname : userProfile.fullname}</h3>
          <span>
            Information about your profile and preferences across LearningSphere
            services.
          </span>
          <div>
            <FormInput
              handleSubmit={handleSaveChanges}
              isButtonLoading={loading}
              buttonTitle={"Save change"}
              formControls={userProfileFormInput}
              formData={userProfile}
              setFormData={setUserProfile}
              isButtonDisabled={isDataChanged()}
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
