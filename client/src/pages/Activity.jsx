import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const Activity = () => {
  const [progress, setProgress] = useState(40);

  return (
    <main className="container mx-auto">
      <section className="h-screen py-3 px-6 space-y-3">
        <div className="space-y-3">
          <h2>Continue Learning</h2>
          <span>Complete your learning progress to get certificate</span>
          <div className="py-3">
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
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="saved" className="">
              Saved Course
            </TabsTrigger>
            <TabsTrigger value="completed">Completed Course</TabsTrigger>
          </TabsList>

          {/* E-Learning */}
          <TabsContent value="saved" className="space-y-3 px-3">
            <div>
              <span>
                you dont have saved course, try to add one from e-learning
              </span>
            </div>

            <div className="space-y-3 py-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-3">
                {[...Array(4)].map((__, index) => (
                  <Card key={index}>
                    <CardHeader className="space-y-4">
                      <CardTitle>E-learning Package 12 Month</CardTitle>
                      <CardDescription>GRATIS</CardDescription>
                      <CardDescription>
                        <div className="px-3 py-2 border">
                          Purchased at December 12, 2022
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <div className="space-x-3">
                <Button className="w-1/3">Next</Button>
                <Button className="w-1/3">Previous</Button>
              </div>
            </div>
          </TabsContent>

          {/* Bootcamp */}
          <TabsContent value="completed">
            <div className="py-2 px-2  flex items-center justify-center">
              <h2>Completed Course : Left-blank</h2>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Activity;
