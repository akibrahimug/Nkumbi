import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Welcome to Nkumbi
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Empowering Ugandan Farmers
        </p>
        <AuthForm />
      </div>
    </div>
  );
}
