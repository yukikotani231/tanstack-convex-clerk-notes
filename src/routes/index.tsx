import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { useUser, SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { api } from "../../convex/_generated/api";
import { Plus, FileText, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = useUser();
  const notes = useQuery(api.notes.list, user ? { userId: user.id } : "skip");
  const createNote = useMutation(api.notes.create);
  const deleteNote = useMutation(api.notes.remove);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = async () => {
    if (!user) return;
    setIsCreating(true);
    await createNote({
      userId: user.id,
      title: "無題のメモ",
      content: "",
    });
    setIsCreating(false);
  };

  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteNote({ id: id as any });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <SignedOut>
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Notes App</h2>
          <p className="text-gray-600 mb-8">
            シンプルなメモアプリです。サインインして始めましょう。
          </p>
          <div className="flex flex-col gap-4 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-700">
              <FileText className="text-cyan-600" />
              <span>リアルタイム同期でどこからでもアクセス</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Plus className="text-cyan-600" />
              <span>シンプルで使いやすいインターフェース</span>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">マイノート</h2>
            <button
              onClick={handleCreateNote}
              disabled={isCreating}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
              新規作成
            </button>
          </div>

          {notes === undefined ? (
            <div className="text-center py-10 text-gray-500">読み込み中...</div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>まだメモがありません</p>
              <p className="text-sm mt-2">「新規作成」をクリックして始めましょう</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Link
                  key={note._id}
                  to="/notes/$noteId"
                  params={{ noteId: note._id }}
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 truncate flex-1">
                      {note.title || "無題"}
                    </h3>
                    <button
                      onClick={(e) => handleDeleteNote(note._id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {note.content || "メモなし"}
                  </p>
                  <p className="text-gray-400 text-xs mt-3">
                    {new Date(note.updatedAt).toLocaleDateString("ja-JP")}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SignedIn>
    </main>
  );
}
