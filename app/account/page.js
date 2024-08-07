import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

async function Page() {
  const session = await auth();
  const userFirstName = session.user.name.split(" ").at(0);

  return (
    <div>
      <h2 className="text-accent-400 font-semibold text-2xl mb-7">
        Welcome, {userFirstName}
      </h2>
    </div>
  );
}

export default Page;
