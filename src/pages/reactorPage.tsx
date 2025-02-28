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
import { setSearchValue, selectSearchValue, getReactorList, fetchReactor } from '../slices/reactorSlice'
import { useAppDispatch, RootState } from '../store';
import { useSelector, useDispatch } from "react-redux";

export const AlbumPage: FC = () => {
  /*const [pageData, setPageDdata] = useState<Reactor>();

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
          ) 
      );
  }, [id]);*/
  const { id } = useParams(); // ид страницы, пример: "/albums/12"
  const dispatch = useAppDispatch();
  const current_reactor = useSelector((state: RootState) => state.reactor.currentReactor);

  useEffect(() => {
    dispatch(fetchReactor(Number(id)));
  }, [dispatch]); 


  return (
    <main className="container reactor-page"> {/* Добавляем уникальный класс */}
     <BreadCrumbs 
         crumbs={[
           { label: ROUTE_LABELS.REACTORS, path: ROUTES.REACTORS },
           { label: current_reactor ? `${current_reactor.name}` : "Реактор" },
         ]}
       />
       {current_reactor ? ( // проверка на наличие данных, иначе загрузка
         <div className="row">
           <div className="col-6">
             <img src={current_reactor.image as string ? current_reactor.image.replace('http://localhost:9000', '/minio') as string : defaultImage} className="reactor-image"/>
           </div>
           <div className="col-6 reactor-info">
             <h1>{current_reactor.name}</h1>
             <span>Описание: { current_reactor.description }</span>
             <span>Топливо: { current_reactor.fuel }</span>
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