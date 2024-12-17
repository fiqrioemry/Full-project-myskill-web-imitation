import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Learning = () => {
  return (
    <main>
      <section className="container mx-auto space-y-6 py-6">
        <h2>Choose your topic and start learning</h2>
      </section>
      <Tabs defaultValue="machine learning">
        <TabsList className="space-x-3 bg-red-500">
          <TabsTrigger value="machine learning">machine learning</TabsTrigger>
          <TabsTrigger value="machine learning">machine learning</TabsTrigger>
          <TabsTrigger value="machine learning">machine learning</TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  );
};

export default Learning;
