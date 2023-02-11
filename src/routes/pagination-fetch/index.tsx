import { component$, Resource, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { fetchCharacters } from "~/api/fetchCharacters";
import usePagination from "~/hooks/usePagination";

export default component$(() => {
  const allUsers = useResource$<string[]>(({ cleanup }) => {
    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return fetchCharacters(controller);
  });

  const initialState = {
    currentPage: 1,
    pageSize: 10,
  };

  // Pagination things
  const [state, actions] = usePagination(initialState);
  const start = (state.currentPage - 1) * state.pageSize;
  const end = state.currentPage * state.pageSize;

  return (
    <Resource
      value={allUsers}
      onPending={() => <>Cargando...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(users) => (
        <>
          <ul>
            {users.slice(start, end).map((user: any) => (
              <li>
                <figure>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <figcaption>
                    {user.firstName} {user.lastName}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div class="pagination">
            <div class="pagination__buttons">
              <button
                onClick$={actions.prevPage}
                disabled={state.currentPage === 1}
              >
                Página anterior
              </button>
              <button
                onClick$={actions.nextPage}
                disabled={
                  state.currentPage === Math.ceil(users.length / state.pageSize)
                }
              >
                Siguiente página
              </button>
            </div>
            <p>Página actual: {state.currentPage}</p>
            <p>Número max de elementos por página: {state.pageSize}</p>
            <p>Número total de elementos: {users.length}</p>
          </div>
        </>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "⭐️ Pagination Con Fetch",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
