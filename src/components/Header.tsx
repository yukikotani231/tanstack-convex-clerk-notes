import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { NotebookPen } from "lucide-react";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <NotebookPen size={28} />
        <h1 className="text-xl font-semibold">Notes</h1>
      </Link>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors font-medium">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
