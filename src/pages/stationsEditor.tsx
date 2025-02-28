import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { getStations, getStationsFiltered, moderateStation } from '../slices/stationmanySlice';
import { RootState, useAppDispatch } from '../store';
import './meetupPage.css';
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Station } from '../modules/NuclearApi';
import qr_icon from '../assets/qr_icon.png'

const POLLING_INTERVAL = 5000; // 5 секунд

const StationsEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stations } = useSelector((state: RootState) => state.stations); 
  const isModerator = useSelector((state: RootState) => state.user.isModerator);
  const userId = useSelector((state: RootState) => state.user.userId);

  const [isFiltered, setIsFiltered] = useState(false);

  const [filters, setFilters] = useState({
    status: '',
    date_formation_start: "",
    date_formation_end: ""
  });

  const [filteredMeetups, setFilteredMeetups] = useState(stations);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Функция фильтрации
  const filterMeetups = (stations: Station[], filters: any) => {
    let filtered = stations;

    // Применяем фильтрацию по статусу, если он указан
    if (filters.status) {
      filtered = filtered.filter((station) => station.status == (filters.status));
    }

    // Применяем фильтрацию по дате начала
    if (filters.date_formation_startstart) {
      filtered = filtered.filter((station) => new Date(station.date_formation) >= new Date(filters.date_formation_start));
    }

    // Применяем фильтрацию по дате окончания
    if (filters.date_formation_end) {
      filtered = filtered.filter((station) => new Date(station.date_formation) <= new Date(filters.date_formation_end));
    }

    // Фильтрация по пользователю
    //if (!isModerator) {
    //  filtered = filtered.filter((station) => String(station.owner) === String(userId));
    //}

    return filtered;
  };

  useEffect(() => {
    dispatch(getStations());
    
    const interval = setInterval(() => {
      if (isFiltered) {
        dispatch(getStationsFiltered(filters)); // Запрос для фильтров
      } else {
        dispatch(getStations());
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, isFiltered, filters]);

  useEffect(() => {
    // Фильтрация происходит каждый раз, когда данные митапов или фильтры меняются
    setFilteredMeetups(filterMeetups(stations, filters));
  }, [stations, filters, isModerator, userId]);

  const handleCardClick = (station_id: number | undefined) => {
    navigate(`${ROUTES.STATION}/${station_id}`);
  };

  const handleCommit = (station_id: string) => {
    dispatch(moderateStation({station_id: station_id, status: 3}));
    dispatch(getStations());
  };

  const handleReject = (station_id: string) => {
    dispatch(moderateStation({station_id: station_id, status: 4}));
    dispatch(getStations());
  };

  const handleFilter = () => {
    setIsFiltered(true); // Включаем фильтрацию
    // Здесь мы не вызываем getMeetupsFiltered напрямую, так как фильтрация происходит локально в useEffect
  };

  const resetFilter = () => {
    setIsFiltered(false); // Отключаем фильтрацию
    setFilters({ status: 0, date_formation_start: "", date_fromation_end: "" });
    dispatch(getStations()); // Сбрасываем митапы и выводим все
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <div className="container mx-0">
          <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.STATIONSEDITOR }]} />
                  <div className="info-container">
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="2" className="primary-text">Статус</Form.Label>
                      <Col sm="10">
                      <Form.Control type="text" name="status" value={filters.status} onChange={handleChange} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="2" className="primary-text">От</Form.Label>
                      <Col sm="10">
                      <Form.Control type="date" name="date_formation_start" value={filters.date_formation_start} onChange={handleChange} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="2" className="primary-text">До</Form.Label>
                      <Col sm="10">
                      <Form.Control type="date" name="date_formation_end" value={filters.date_formation_end} onChange={handleChange} />
                      </Col>
                  </Form.Group>
                  </div>
        <div className="meetup-card-list">
          {filteredMeetups.map((station, index) => (
            <div key={index} className="speaker-card justify-content-between align-items-center px-4">
              <div className="m-text-container d-flex flex-column">
                <p className="primary-text">Название: {station.name || '-'}</p>
                <p className="primary-text">Дата формирования: {station.date_formation ? new Date(station.date_formation).toISOString().split('T')[0] : '-'}</p>
                <p className="primary-text">Владелец: {station.owner}</p>
              </div>
              <div className="m-text-container d-flex flex-column">
                  <p className="primary-text">Статус: {station.status || '-'}</p>
                  <p className="primary-text">Местоположение: {station.location || '-'}</p>
                  <p className="primary-text">Год ввода в строй: {station.year || '-'}</p>
              </div>
              <div className="dinner-icon">
                {station.status <3 ? (
                <></>
                ) : (
                <div className="qr-hover-wrapper">
                    <img className="status-icon" src={qr_icon} alt="QR Icon" />
                    <div className="qr-hover">
                    {station.qr && <img className="qr-code" src={`data:image/png;base64,${station.qr}`} alt="QR Code" />}
                    </div>
                </div>
                )}
            </div>







              {station.status === 2 && isModerator && (
              <>
                  <Button variant="primary" className="m-commit-btn" value={station.id} onClick={() => handleCommit(station.id.toString())}>Завершить</Button>
                  <Button variant="primary" className="m-reject-btn" value={station.id} onClick={() => handleReject(station.id.toString())}>Отклонить</Button>
              </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationsEditor;