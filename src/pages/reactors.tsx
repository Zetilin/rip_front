import "../styles.css";
import { FC, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Reactor, getReactors } from "../modules/NuclearApi";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { ReactorCard } from "../components/ReactorCard";
import { useNavigate } from "react-router-dom";
import { REACTORS_MOCK } from "../modules/mock";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue, selectSearchValue, getReactorList } from '../slices/reactorSlice'
import { useAppDispatch, RootState } from '../store';
import { CartCard } from "../components/cartCard";

const ITunesPage: FC = () => {
  //const dispatch = useDispatch();
  //const { searchValue, loading } = useSelector((state: RootState) => state.reactor); // Получаем значение поиска из Redux
  //const [reactors, setReactors] = useState<Reactor[]>([]);
  const dispatch = useAppDispatch();
  const { searchValue, loading } = useSelector((state: RootState) => state.reactor); // Получаем значение поиска из Redux
  const reactorsData = useSelector((state: RootState) => state.reactor.reactorsData);
  const reactors = reactorsData?.reactors || [];

  const navigate = useNavigate();

  const current_station_id =reactorsData?.draft_station || null;
  const reactors_quantity = reactorsData?.reactors_count || null;

  useEffect(() => {
    dispatch(getReactorList());
  }, [dispatch]); 
  const handleCardClick = (id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.REACTORS}/${id}`);
  };

  return (

    /*button type="submit" className="bin btn btn-secondary disabled w-50">
              Корзина
          </button>*/


    <main className="container">
      <div className="row d-flex justify-content-between">
        <InputField
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          loading={loading}
          //onSubmit={handleSearch}
          placeholder="Введите название"
        />
        <CartCard value={reactors_quantity} station_id={current_station_id}/>
      </div>

      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.REACTORS }]} />
      {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!reactors.length  ? (
          <div>
            <h1>К сожалению, пока ничего не найдено</h1>
          </div>
        ) : (
          <div className="cards-wrapper">
            {reactors.map((item, index) => (
                <ReactorCard
                  imageClickHandler={() => handleCardClick(item.id)}
                  {...item}
                />
            ))}
          </div>
        ))}

    </main>
  );
};

export default ITunesPage;