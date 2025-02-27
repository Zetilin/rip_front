import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { getStation, deleteStattion, setError, setStationData, updateStation, setReactorStation, deleteReactorStation, commitStation, updateReactorStation } from '../slices/stationsSlice';
import { RootState, useAppDispatch } from '../store';
import './stationPage.css';
import defaultImage from "../assets/defaultImage.png";
import { BreadCrumbs } from "../components/BreadCrumbs";

const StationPage: React.FC = () => {
    const { current_station_id } = useParams<{ current_station_id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { reactorstations, stationData, error } = useSelector((state: RootState) => state.station);
    const isDraft = useSelector((state: RootState) => state.station.isDraft);

    const handleDeleteReactorStation = async (reactor_id: number) => {
        if (current_station_id && reactor_id) {
            await dispatch(deleteReactorStation({ current_station_id: current_station_id, reactor_id: reactor_id }));
            dispatch(getStation(current_station_id));
        }
    }

    const handleSaveStation = () => {
        if (current_station_id) {
            const stationDataToSend = {
                status: stationData.status,
                owner: stationData.owner,
                name: stationData.name ?? '', 
                location: stationData.location ?? '',
                year: stationData.year
              };
          try {
            dispatch(updateStation({ current_station_id: current_station_id, stationData: stationDataToSend }));
          } catch (error) {
            dispatch(setError(error));
          }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(
            setStationData({
                ...stationData,
                [name]: value,
            })
        );
      };

      const handleReactorStationChange = (reactor_id: number, value: string) => {
        dispatch(
          setReactorStation(
            reactorstations.map((reactorstation) =>
              reactorstation.id === reactor_id
                ? { ...reactorstation, value: Number(value) || null }
                : reactorstation
            )
          )
        );
      };

      const handleSaveInvite = async (reactor_id: number) => {
        const ReactorStationToUpdate = reactorstations.find(reactorstation => reactorstation.id === reactor_id);
        if (ReactorStationToUpdate && current_station_id) {
          try {
            await dispatch(updateReactorStation({ 
              current_station_id, 
              reactor_id, 
              ReactorStationData: ReactorStationToUpdate
            })).unwrap();
          } catch (error) {
            dispatch(setError(error));
          }
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (current_station_id) {
          try {
            await dispatch(commitStation(current_station_id)).unwrap();
            navigate(ROUTES.REACTORS);
          } catch (error) {
            dispatch(setError(error));
          }
        }
      };

      const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (current_station_id) {
          try {
            await dispatch(deleteStattion(current_station_id)).unwrap();
            navigate(ROUTES.REACTORS);
          } catch (error) {
            dispatch(setError(error));
          }
        }
      };

      useEffect(() => {
        if (current_station_id) {
          dispatch(getStation(current_station_id));
        }
      }, [dispatch, current_station_id]);

      const handleCardClick = (reactor_id: number | undefined) => {
        navigate(`${ROUTES.REACTORS}/${reactor_id}`);
      };

      console.log(reactorstations);
      return (
        <main className="container">
            <BreadCrumbs 
                     crumbs={[
                       { label: ROUTE_LABELS.REACTORS, path: ROUTES.REACTORS },
                       { label: "Корзина" },
                     ]}
            />
            <h3 className="text-center">Черновая АЭС</h3>
            <Form>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Название</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введите название" 
                        disabled={!isDraft} 
                        value={stationData.name || ''} 
                        onChange={handleInputChange}
                        name="name"
                        style={{ width: '250px' }}
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Местоположение</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Введите местоположение" 
                        disabled={!isDraft} 
                        value={stationData.location || ''} 
                        onChange={handleInputChange}
                        name="location"
                        style={{ width: '250px', height: '150px' }}
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Год ввода в строй</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введите год" 
                        disabled={!isDraft} 
                        value={stationData.year || ''} 
                        onChange={handleInputChange}
                        name="year"
                        style={{ width: '250px' }}
                    />
                </Form.Group>
                <div className='knopki'>
                    <div className='knopkis'>
                        <Button variant="primary" onClick={handleSaveStation} className="delete-draft-station-btn">Сохранить</Button>
                        <Button variant="primary" onClick={handleSubmit} className="delete-draft-station-btn">Отправить</Button>
                    </div>
                    <Button variant="danger" onClick={handleDelete} className="delete-draft-station-btn">Удалить</Button>
                </div>
            </Form>
            <h4 className="text-center">Реакторы</h4>
            <div className="cards-wrapper d-flex flex-column">
                {reactorstations.map((reactorstation, index) => (
                    <div key={index} className="card w-100 mb-5">
                        <div className="row g-0 d-flex justify-content-between">
                            <div className="col-md-1 d-flex justify-center" style={ {width: '150px'} } >
                                <img src={reactorstation.image as string ? reactorstation.image.replace('http://localhost:9000', '/minio') as string: defaultImage} alt="reactor" style={{ height: '150px', objectFit: 'cover', aspectRatio: '1 / 1', width: '100px', marginLeft: '10px', marginRight: '5px' }} />
                            </div>
                            <div className="col-md-8 d-flex align-items-center justify-content-center" style={{ width: 'calc(100% - 150px)' }}>
                                <div className="card-body" >
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <div id='carddd' style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <span className="card-text" style={{ marginLeft: '5px' }}>{reactorstation.name}</span>
                                            <span className="card-text" style={{ marginLeft: '5px' }}>Топливо: {reactorstation.fuel}</span>
                                            <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
                                                <Form.Control
                                                    disabled={!isDraft}
                                                    className="form-control"
                                                    style={{ width: '100px', marginRight: '5px' }}
                                                    value={reactorstation.value || ''}
                                                    onChange={(e) => handleReactorStationChange(reactorstation.id, e.target.value)}
                                                    onBlur={() => handleSaveInvite(reactorstation.id)}
                                                />
                                                <Form.Label style={{marginBottom: '0px'}}>Вт</Form.Label>
                                            </Form.Group>
                                            <Button 
                                                variant="primary" 
                                                style={{ width: '100px', marginLeft: '20px', marginTop: '10px', marginBottom: '10px'}}
                                                onClick={() => handleCardClick(reactorstation.id)}
                                                id='but_otkr'
                                            >
                                                Открыть
                                            </Button>
                                            <div className="m-text-container" style={ {marginTop: '12px', marginRight: '12px'}} onClick={() => handleDeleteReactorStation(reactorstation.id)}>
                                                <p className="primary-text fs-3"> &#128465;</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
      );
};

export default StationPage;