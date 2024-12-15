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
import { signInFormInput } from "../config";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { useGlobal } from "../context/GlobalProvider";
import FormInput from "../components/common/common-form/FormInput";

const SignIn = () => {
  const { loading } = useGlobal();
  const { handleSignIn, signInForm, setSignInForm } = useAuth();

  function isFormFilled() {
    return signInForm && signInForm.email && signInForm.password;
  }

  return (
    <main className="bg-muted">
      <section className="h-screen flex items-center justify-center flex-col space-y-3">
        <Link to="/">back home</Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign-In To LearnSphere</CardTitle>
            <CardDescription>
              Please enter your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormInput
              handleSubmit={handleSignIn}
              isButtonLoading={loading}
              buttonTitle={"Sign In"}
              formControls={signInFormInput}
              formData={signInForm}
              setFormData={setSignInForm}
              isButtonDisabled={!isFormFilled()}
            />
            <Button className="w-full">
              <FcGoogle /> <span>Sign-in with google</span>
            </Button>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Dont have an account ? Sign-up <Link to="/sign-up">here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default SignIn;
