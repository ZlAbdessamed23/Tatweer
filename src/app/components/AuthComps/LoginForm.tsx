import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import InputField from "@/app/components/AuthComps/InputField";

export default function PersonalInformationForm() {
  return (
    <div className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6 text-purple-600">
        Personal Information
      </h1>

      <InputField   type="text" placeholder="First name" Icon={MdPerson} />
      <InputField type="text" placeholder="Last name" Icon={MdPerson} />
      <InputField type="email" placeholder="Email" Icon={MdEmail} />
      <InputField type="password" placeholder="Password" Icon={MdLock} />
      <InputField type="password" placeholder="Confirm Password" Icon={MdLock} />

      <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6">
        Next
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        You already have an account?{" "}
        <a href="#" className="text-purple-600 hover:underline">Sign in</a>
      </p>
    </div>
  );
}
