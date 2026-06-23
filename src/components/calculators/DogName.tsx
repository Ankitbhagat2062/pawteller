import { DogNameGenerator } from "@/components/calculators/dogNameComponents/DogNameGenerator";

const DogName = ({token}:{token:string}) => {
  return <DogNameGenerator token={token ?? ''} />;
};

export default DogName;
