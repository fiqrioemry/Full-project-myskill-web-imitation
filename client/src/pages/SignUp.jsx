import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signUpFormInput } from "../config";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { useGlobal } from "../context/GlobalProvider";
import FormInput from "../components/common/common-form/FormInput";

const SignUp = () => {
  const { loading } = useGlobal();
  const { signUpForm, setSignUpForm, handleSignUp } = useAuth();

  function isFormFilled() {
    return (
      signUpForm &&
      signUpForm.fullname &&
      signUpForm.email &&
      signUpForm.password &&
      signUpForm.passwordConfirm
    );
  }

  return (
    <main className="bg-muted">
      <section className="h-screen flex items-center justify-center flex-col space-y-3">
        <Link to="/">back home</Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create LearnSphere Account</CardTitle>
            <CardDescription>
              Please fill following form to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormInput
              handleSubmit={handleSignUp}
              isButtonLoading={loading}
              buttonTitle={"Sign Up"}
              formControls={signUpFormInput}
              formData={signUpForm}
              setFormData={setSignUpForm}
              isButtonDisabled={!isFormFilled()}
            />
            <Button className="w-full">
              <FcGoogle /> <span>Sign-Up with google</span>
            </Button>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Already have an account ? Sign-In <Link to="/sign-in">here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default SignUp;
