import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Learning = () => {
  return (
    <main>
      <section className="container mx-auto space-y-6 py-6">
        <h2>Choose your topic and start learning</h2>
        <Tabs defaultValue="machine learning">
          <TabsList className="space-x-3 w-full">
            <TabsTrigger value="machine learning">machine learning</TabsTrigger>
            <TabsTrigger value="machine learning">machine learning</TabsTrigger>
            <TabsTrigger value="machine learning">machine learning</TabsTrigger>
          </TabsList>
          <TabsContent value="machine learning">Hello</TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Learning;
