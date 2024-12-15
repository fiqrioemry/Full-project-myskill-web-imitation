import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Purchase = () => {
  return (
    <main className="container mx-auto">
      <section className="h-screen py-3 px-6 space-y-3">
        <Tabs defaultValue="e-learning" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="e-learning" className="">
              E-Learning
            </TabsTrigger>
            <TabsTrigger value="bootcamp">Bootcamp</TabsTrigger>
          </TabsList>

          {/* E-Learning */}
          <TabsContent value="e-learning" className="space-y-3 px-3">
            <div>
              <h2>Congratulate, Your e-learning plan is activated</h2>
              <span>your plan is active until 23 september 2025</span>
              <div className="space-x-3 py-3">
                <Button>Extend Subscription</Button>
                <Button>Access e-learning</Button>
              </div>
            </div>

            <div>
              <h2>Purchase History</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
                {[...Array(3)].map((__, index) => (
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
            </div>
          </TabsContent>

          {/* Bootcamp */}
          <TabsContent value="bootcamp">
            <div className="py-2 px-2 h-screen flex items-center justify-center">
              <h2>Bootcamp Content</h2>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Purchase;
