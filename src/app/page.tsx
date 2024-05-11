import Calendar from "@/components/Calendar";
import { monthlyData } from "@/server/mocks/monthlyData";

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <Calendar monthlyData={monthlyData} />
    </main>
  );
}
