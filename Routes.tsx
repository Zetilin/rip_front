export const ROUTES = {
  HOME: "/",
  REACTORS: "/reactors",
  LOGIN: '/login',
  STATION: '/station',
  REGISTER: '/register',
  FORBIDDEN: "/403",
  ACCOUNT: "/account"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  REACTORS: "Реакторы",
  LOGIN: "Авторизация",
  STATION: "Станция",
  REGISTER: "Регистрация",
  FORBIDDEN: "403",
  ACCOUNT: "Личный кабинет"
};