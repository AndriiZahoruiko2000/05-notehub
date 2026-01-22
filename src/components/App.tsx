import css from "./App.module.css";
import Modal from "./Modal/Modal";
import NoteList from "./NoteList/NoteList";
import Pagination from "./Pagination/Pagination";
import SearchBox from "./SearchBox/SearchBox";
import NoteForm from "./NoteForm/NoteForm";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, getNotes } from "../services/noteService";
import { useState } from "react";
import type { NewNote } from "../types/note";
import { useDebounce } from "use-debounce";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const App = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [query] = useDebounce(search, 1000);

  const noteQuery = useQuery({
    queryKey: ["getNotes", page, query],
    queryFn: () => getNotes({ page, search: query }),
    placeholderData: keepPreviousData,
  });

  const noteMutation = useMutation({
    mutationFn: (body: NewNote) => createNote(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
    },
  });

  const notesList = noteQuery.data?.notes || [];
  const totalPages = noteQuery.data?.totalPages ?? 0;
  const loading = noteQuery.isLoading;
  const error = noteQuery.isError;

  const handleSubmit = (values: NewNote) => {
    noteMutation.mutate(values);
    setIsOpenModal(false);
  };

  const handleModalClick = () => {
    setIsOpenModal(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <button className={css.button} onClick={handleModalClick}>
          Create note +
        </button>
      </header>
      <main>
        <NoteList notesList={notesList} />
      </main>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onSubmit={handleSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default App;
