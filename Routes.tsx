export const ROUTES = {
  HOME: "/",
  REACTORS: "/reactors",
  LOGIN: '/login',
  STATION: '/station',
  REGISTER: '/register',
  FORBIDDEN: "/403",
  ACCOUNT: "/account",
  REACTORSEDITOR: "/reactors-editor",
  REACTORSCREATOR: "/reactors-create",
  REACTORSLISTEDITOR: "/reactors-list-editor",
  STATIONSEDITOR: "/stations-editor"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  REACTORS: "Реакторы",
  LOGIN: "Авторизация",
  STATION: "Станция",
  REGISTER: "Регистрация",
  FORBIDDEN: "403",
  ACCOUNT: "Личный кабинет",
  REACTORSEDITOR: "Редактирование реакторов",
  REACTORSCREATOR: "Создание реактора",
  REACTORSLISTEDITOR: "Модерация реакторов",
  STATIONSEDITOR: "Станции"
};