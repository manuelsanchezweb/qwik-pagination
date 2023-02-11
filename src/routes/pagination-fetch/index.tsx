import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import usePagination from "~/hooks/usePagination";

export default component$(() => {
  const pokemons = useSignal<string[]>([]);

  // const fetchPokemons = useResource$(async () => {
  //   const res = await fetch("../../../data.json", {});
  //   return res.json();
  // });

  const initialState = {
    currentPage: 1,
    pageSize: 10,
    total: 10,
  };

  // Pagination things
  const [state, actions] = usePagination(initialState);
  const start = (state.currentPage - 1) * state.pageSize;
  const end = state.currentPage * state.pageSize;
  const elementsToDisplay = pokemons.value.slice(start, end);

  const isPrevDisabled = state.currentPage === 1;
  const isNextDisabled =
    state.currentPage === Math.ceil(state.total / state.pageSize);

  return (
    <>
      <div class="elements">
        {elementsToDisplay.map((element: any, index: any) => (
          <div key={index}>{element}</div>
        ))}
      </div>
      <div class="pagination">
        <div class="pagination__buttons">
          <button onClick$={actions.prevPage} disabled={isPrevDisabled}>
            Página anterior
          </button>
          <button onClick$={actions.nextPage} disabled={isNextDisabled}>
            Siguiente página
          </button>
        </div>
        <p>Página actual: {state.currentPage}</p>
        <p>Número max de elementos por página: {state.pageSize}</p>
        <p>Número total de elementos: {state.total}</p>
      </div>
    </>
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
