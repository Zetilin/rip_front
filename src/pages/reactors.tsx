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

const ITunesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [reactors, setReactors] = useState<Reactor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getReactors()
      .then((response) => {
        setReactors(response.reactors);
        setLoading(false);
      })
      .catch(() => {
        setReactors(REACTORS_MOCK.reactors); // Используем mock данные в случае ошибки
        setLoading(false);
      });
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз

  const handleSearch = () => {
    setLoading(true);
    getReactors()
      .then((response) => {
        setReactors(
          response.reactors.filter((item) =>
              item.name
                  .toLocaleLowerCase()
                  .startsWith(searchValue.toLocaleLowerCase())
          )
        );
        setLoading(false);
      })
      .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
        setReactors(
          REACTORS_MOCK.reactors.filter((item) =>
            item.name
              .toLocaleLowerCase()
              .startsWith(searchValue.toLocaleLowerCase())
          )
        ); 
        setLoading(false);
      });
  };
  const handleCardClick = (id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.REACTORS}/${id}`);
  };

  return (


    <main className="container">
      <div className="row d-flex justify-content-between">
        <InputField
          value={searchValue}
          setValue={(value) => setSearchValue(value)}
          loading={loading}
          onSubmit={handleSearch}
          placeholder="Введите название"
        />
        <div className="col-md-3 justify-end">
          <button type="submit" className="bin btn btn-secondary disabled w-50">
              Корзина
          </button>
        </div>
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