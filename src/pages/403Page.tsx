import "../styles.css";
import { FC } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS } from "../../Routes";

export const Page403: FC = () => {
  return (
    <div>
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.FORBIDDEN }]} />
        <h1>К сожалению, Вам нельзя просматривать эту страницу</h1>
    </div>
  );
};