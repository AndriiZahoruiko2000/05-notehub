import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNoteById } from "../../services/noteService";

interface NoteListProps {
  notesList: Note[];
}

const NoteList = ({ notesList }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNoteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
    },
  });

  return (
    <div className={css["noteList"]}>
      <ul className={css.list}>
        {notesList.map((note) => {
          return (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button
                  onClick={() => {
                    deleteNoteMutation.mutate(note.id);
                  }}
                  className={css.button}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;
