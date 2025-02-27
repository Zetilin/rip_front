import { FC } from "react";
import { Card } from "react-bootstrap";
import cartImage from "../assets/meetup_icon.jpg"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";
import '../styles.css'

interface Props {
    value: string | null
    station_id: number | null
}
export const CartCard: FC<Props> = ({
    value,
    station_id
}) => {

    const navigate = useNavigate();

const handleClick = (id: number | null) => {
    //if (id) {
        navigate(`${ROUTES.STATION}/${id}`);
    //}
};

/*<div className="meetup-card">
      <Card.Img
        className="cardImage"
        variant="bottom"
        src={cartImage}
        onClick={() => handleClick(station_id ? station_id : NaN)}
      />
      <p className="speakers-counter">{value}</p>
    </div>*/

    return (
      <div className="col-md-3 justify-end position-relative"> 
          <button 
              type="submit" 
              className="bin btn btn-secondary w-50 position-relative"
              id="korzina" 
              disabled={!station_id} 
              onClick={() => handleClick(station_id ? station_id : NaN)}
          >
              Корзина
              {((station_id) && Number(value) != 0) && <div className="badge bg-primary rounded-pill position-absolute">
                  {value} {/* Значение счетчика */}
              </div>}
          </button>
      </div>
  );
};