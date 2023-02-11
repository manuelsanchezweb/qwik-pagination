import { component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();

  return (
    <>
      <nav>
        <button
          onClick$={() => {
            nav.path = "/";
          }}
        >
          {" "}
          Pagination sin fetch
        </button>

        <button
          onClick$={() => {
            nav.path = "/pagination-fetch";
          }}
        >
          {" "}
          Pagination con fetch
        </button>
      </nav>

      <Slot />
    </>
  );
});
