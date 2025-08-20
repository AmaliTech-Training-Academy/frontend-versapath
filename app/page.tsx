import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-screen bg-background">
      <h1 className="p-2 font-bold text-4xl text-foreground uppercase">
        Versapath
      </h1>
      <Button size={"lg"} variant={"default"}>
        ShadCN button
      </Button>
      <ModeToggle />
    </section>
  );
}
