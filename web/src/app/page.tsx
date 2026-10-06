import { Prelanding } from "@/components/prelanding/Prelanding";
import { getSiteBrand } from "@/config/brands";

export default function Home() {
  return <Prelanding site={getSiteBrand().id} />;
}
