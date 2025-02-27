import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
//import "./ReactorCard.css";
import "../styles.css"
import defaultImage from "../assets/defaultImage.png"
import { RootState, useAppDispatch} from '../store'
import { useNavigate } from "react-router-dom";
import { addReactor } from '../slices/stationsSlice'
import { useSelector } from 'react-redux';
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getReactorList } from "../slices/reactorSlice";

interface ReactorCardProps {
    id: number;
    name: string;
    fuel: string;
    description: string;
    image: string;
    imageClickHandler: () => void;
}

export const ReactorCard: FC<ReactorCardProps> = ({
    id,
    name,
    fuel,
    image,
    imageClickHandler,
}) => {

  //const { id } = useParams(); // ид страницы, пример: "/albums/12"
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const handleAdd = async () => {
        await dispatch(addReactor(id.toString()));
        await dispatch(getReactorList());
        navigate(`${ROUTES.REACTORS}`);
}
//<button className="add-btn btn btn-secondary" type="button">
//Добавить
//</button>
  
  return (
    <Card className="card">
      <Card.Img
        className="reactor-preview"
        src={image ? image.replace('http://localhost:9000', '/minio') : defaultImage}
        onClick={imageClickHandler}
      />
      <div className="card-body">
        <div className="card-info">
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Subtitle className="secondary-text">Топливо: {fuel}</Card.Subtitle>
        </div>
        <div className="row card-btns">
          <div className="col d-flex justify-content-center flex-grow-1">
            <Link to={`/reactors/${id}`} className="btn btn-primary">
                Открыть
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            {(isAuthenticated == true ) && (
            <button type="button" className="add-btn btn btn-secondary" onClick={() => handleAdd() }>Добавить</button>
          )}
          </div>
        </div>
      </div>
    </Card>
  );
};