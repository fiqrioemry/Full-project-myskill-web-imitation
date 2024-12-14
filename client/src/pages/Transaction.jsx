import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const Transaction = () => {
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(40);

  return (
    <main className="container mx-auto">
      <section className="h-screen py-3 px-6 space-y-3">
        <div className="space-y-3">
          <h2>Your Transaction</h2>
          <span>see all your transaction history below</span>
          <div className="py-3 space-y-3">
            <Card className="flex space-x-3 p-3">
              <div className="hidden md:block rounded-md border w-32 "></div>
              <div className="space-y-3 w-full md:w-1/2">
                <h3></h3>Build a Property Web: Setup Projects & Homepage
                <p>Alfi Nur Hakim - Software Engineer at Evermos</p>
                <div className="w-full space-x-3 flex items-center">
                  <Progress value={progress} className="w-[80%]" />
                  <div>40 %</div>
                </div>
                <Button>Continue Learn</Button>
              </div>
            </Card>
            <Card className="flex space-x-3 p-3">
              <div className="hidden md:block rounded-md border w-32 "></div>
              <div className="space-y-3 w-full md:w-1/2">
                <h3></h3>Build a Property Web: Setup Projects & Homepage
                <p>Alfi Nur Hakim - Software Engineer at Evermos</p>
                <div className="w-full space-x-3 flex items-center">
                  <Progress value={progress} className="w-[80%]" />
                  <div>40 %</div>
                </div>
                <Button>Continue Learn</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Transaction;
