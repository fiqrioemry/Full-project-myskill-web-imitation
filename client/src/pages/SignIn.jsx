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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGlobal } from "../context/GlobalProvider";

const SignIn = () => {
  const { handleSignIn } = useGlobal();

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
            <form onSubmit={handleSignIn} className="space-y-3 py-3 border-b">
              <Input name="email" placeholder="Enter your email" />
              <Input name="password" placeholder="Enter your password" />
              <Button type="submit" className="w-full">
                Sign-In
              </Button>
            </form>
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
