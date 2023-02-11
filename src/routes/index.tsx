import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import usePagination from "~/hooks/usePagination";

// Pagination sin fetch

export default component$(() => {
  const elementsArray = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
  ];

  const initialState = {
    currentPage: 1,
    pageSize: 10,
  };
  const [state, actions] = usePagination(initialState);
  const start = (state.currentPage - 1) * state.pageSize;
  const end = state.currentPage * state.pageSize;
  const elementsToDisplay = elementsArray.slice(start, end);

  const isPrevDisabled = state.currentPage === 1;
  const isNextDisabled =
    state.currentPage === Math.ceil(elementsArray.length / state.pageSize);

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
        <p>Número total de elementos: {elementsArray.length}</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "⭐️ Pagination No Fetch",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
