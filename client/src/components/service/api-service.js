export const API =
  process.env.NODE_ENV === "production"
    ? `https://ecommerce-kasie.herokuapp.com/`
    : "http://localhost:8080";