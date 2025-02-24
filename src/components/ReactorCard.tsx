import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
//import "./ReactorCard.css";
import "../styles.css"
import defaultImage from "../assets/defaultImage.png"

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

  return (/*
    <Card className="card">
      <Card.Body className="p-0">
        <div className="text-container">
          <Card.Title className="primary-text">{name}</Card.Title>
          <Card.Subtitle className="secondary-text">Топливо: {fuel}</Card.Subtitle>
        </div>
      </Card.Body>
      <Card.Img
        className="cardImage"
        variant="bottom"
        src={image || defaultImage}
        onClick={imageClickHandler}
      />
    </Card>
  );*/
    <Card className="card">
      <Card.Img
        className="reactor-preview"
        src={image || defaultImage}
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
            <button className="add-btn btn btn-secondary" type="button">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};