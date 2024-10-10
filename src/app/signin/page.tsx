import SignIn from "@/app/components/account/SignIn";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <SignIn />
    </div>
  );
}
