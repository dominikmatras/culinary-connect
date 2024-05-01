export const getMeals = async () => {
  const res = await fetch("http://127.0.0.1:3000/api/v1/meals");
  const { data }= await res.json();
  return data.meals
}