export const ROUTES = {
  HOME: "/",
  REACTORS: "/reactors",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  REACTORS: "Реакторы",
};