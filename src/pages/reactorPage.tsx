import "../styles.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Reactor, getReactorById } from "../modules/NuclearApi";
import { Spinner } from "react-bootstrap";
import { REACTORS_MOCK } from "../modules/mock";
import defaultImage from "../assets/defaultImage.png";
import { Link } from 'react-router-dom';

export const AlbumPage: FC = () => {
  const [pageData, setPageDdata] = useState<Reactor>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getReactorById(id)
      .then((response) => setPageDdata(response))
      .catch(
        () =>
          setPageDdata(
            REACTORS_MOCK.reactors.find(
              (reactor) => String(reactor.id) == id
            )
          ) /* В случае ошибки используем мок данные, фильтруем по ид */
      );
  }, [id]);

  return (
   <main className="container">
    <BreadCrumbs 
        crumbs={[
          { label: ROUTE_LABELS.REACTORS, path: ROUTES.REACTORS },
          { label: pageData ? `${pageData.name}` : "Реактор" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="row">
          <div className="col-6">
            <img src={pageData.image as string || defaultImage} className="reactor-image"/>
          </div>
          <div className="col-6 d-flex flex-md-column gap-md-3">
            <h1>{pageData.name}</h1>
            <span>Описание: { pageData.description }</span>
            <span>Топливо: { pageData.fuel }</span>
            <Link to={`/reactors/`} className="return-btn btn btn-primary my-4 w-25">
                Назад
            </Link>
          </div>
        </div>
      ) : (
        <div className="album_page_loader_block">{}
          <Spinner animation="border" />
        </div>
      )}
   </main>
  );
};