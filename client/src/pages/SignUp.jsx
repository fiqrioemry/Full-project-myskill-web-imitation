import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUp = () => {
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
            <form onSubmit={""} className="space-y-3 py-3 border-b">
              <Input type="text" placeholder="Enter your email" />
              <Input type="password" placeholder="Enter your password" />
              <Input
                type="password"
                placeholder="Enter your confirmation password"
              />
              <Button type="submit" className="w-full" disabled={true}>
                Sign-Up
              </Button>
            </form>
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
