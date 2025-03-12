export const loadCollisionData = async () => {
  const response = await fetch("/Collision.csv")
  const text = await response.text();
  const parsed = text
    .trim()
    .split("\n")
    .map(row => row.split(",").map(cell => {
      const num = Number(cell);
      if (isNaN(num)) console.error("Invalid number found:", cell);
      return num;
    }));

  return parsed;
}
