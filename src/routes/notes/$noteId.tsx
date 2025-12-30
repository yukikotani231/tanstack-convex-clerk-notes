import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

export const Route = createFileRoute("/notes/$noteId")({
  component: NoteDetail,
});

function NoteDetail() {
  const { noteId } = Route.useParams();
  const navigate = useNavigate();
  const note = useQuery(api.notes.get, { id: noteId as Id<"notes"> });
  const updateNote = useMutation(api.notes.update);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      setHasChanges(title !== note.title || content !== note.content);
    }
  }, [title, content, note]);

  const handleSave = async () => {
    if (!hasChanges) return;
    setIsSaving(true);
    await updateNote({
      id: noteId as Id<"notes">,
      title,
      content,
    });
    setIsSaving(false);
  };

  if (note === undefined) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center py-10 text-gray-500">読み込み中...</div>
      </main>
    );
  }

  if (note === null) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center py-10">
          <p className="text-gray-500 mb-4">メモが見つかりません</p>
          <button onClick={() => navigate({ to: "/" })} className="text-cyan-600 hover:underline">
            一覧に戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            戻る
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {isSaving ? "保存中..." : "保存"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="w-full text-2xl font-bold text-gray-800 border-none outline-none mb-4 placeholder-gray-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="メモを入力..."
            className="w-full min-h-[400px] text-gray-700 border-none outline-none resize-none placeholder-gray-400"
          />
        </div>

        <p className="text-gray-400 text-sm mt-4 text-right">
          最終更新: {new Date(note.updatedAt).toLocaleString("ja-JP")}
        </p>
      </div>
    </main>
  );
}
