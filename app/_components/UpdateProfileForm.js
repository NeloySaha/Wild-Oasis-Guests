import { updateProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, countryFlag, nationalID } = guest || {};

  return (
    <form
      action={updateProfile}
      className="bg-primary-900 py-8 px-12 text-lg flex flex-col gap-6"
    >
      <div className="space-y-2">
        <label htmlFor="fullName">Full name</label>
        <input
          name="fullName"
          id="fullName"
          defaultValue={fullName}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          id="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>

          <img
            src={countryFlag}
            alt="Country Flag"
            className="h-5 rounded-sm"
          />
        </div>
      </div>

      {children}

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingText={"Updating"}>Update Profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
