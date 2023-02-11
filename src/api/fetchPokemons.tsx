// https://dummyjson.com/users

export async function fetchPokemons(
  controller?: AbortController
): Promise<any> {
  const response = await fetch("../../data.json", {
    signal: controller?.signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const results = await response.json();

  return results.users;
}
