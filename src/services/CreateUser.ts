interface TechObj {
  title: string;
  experience: number;
}

interface CreteUserData {
  name?: string;
  email: string;
  password: string;
  techs?: Array<string | TechObj>;
}
export default function createUser({
  name,
  email,
  password,
  techs,
}: CreteUserData) {
  const user = {
    name,
    email,
    password,
    techs,
  };
  return user;
}
