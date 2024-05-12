import Calendar from "@/components/Calendar";
import { monthlyData } from "@/server/mocks/monthlyData";

export default async function Home() {
  return <Calendar monthlyData={monthlyData} />;
}
