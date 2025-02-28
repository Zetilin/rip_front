import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useNavigate } from "react-router-dom";
import { Speaker, getSpeakers } from "../modules/aimaApi";
import { Spinner } from "react-bootstrap";
import { REACTORS_MOCK } from "../modules/mock";
import defaultImage from "../assets/defaultImage.png";
import { useSelector } from 'react-redux';
import { deleteReactor } from '../slices/reactorSlice';
import { RootState, useAppDispatch } from '../store';
import { api } from '../api';
import { getReactorList } from '../slices/reactorSlice'

const POLLING_INTERVAL = 20000; // 5 секунд

export const ReactorListEditor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isModerator = useSelector((state: RootState) => state.user.isModerator);
  const reactorsData = useSelector((state: RootState) => state.reactor.reactorsData);
  const reactors = reactorsData?.reactors || [];
  const draft_station = reactorsData?.draft_station || null;
  const reactors_count = reactorsData?.reactors_count || null;

 
useEffect(() => {
    dispatch(getReactorList());
    const interval = setInterval(() => {
        dispatch(getReactorList()); // Запрос для фильтров
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);


  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот реактор?")) {
      await dispatch(deleteReactor(id));
      dispatch(getReactorList());
    }
  };


  const handleEdit = (id: string) => {
    navigate(`${ROUTES.REACTORSEDITOR}/${id}`);
  };


  const handleUpdatePhoto = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      // Создаем FormData и добавляем файл
      const formData = new FormData();
      formData.append("image", imageFile); // Ключ "image" должен совпадать с ожидаемым на сервере

      try {
        await api.reactors.addReactorPhoto(id, formData);
        dispatch(getReactorList());
      } catch (error) {
        console.error("Ошибка при обновлении фотографии:", error);
      }
    }
  };

 
  const handleAddNewReactor = () => {
    navigate(ROUTES.REACTORSCREATOR);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.REACTORS, path: ROUTES.REACTORS },
          { label: "Редактор реакторов" },
        ]}
      />
        <div className="container">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={handleAddNewReactor}>
              Добавить новый реактор
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Фото</th>
                <th>Название</th>
                <th>Топливо</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {reactors.map((reactor) => (
                <tr key={reactor.id}>
                  <td>
                    <img
                      src={reactor.image ? reactor.image.replace('http://localhost:9000', '/minio') : defaultImage}
                      className="img-thumbnail"
                      alt="Reactor"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{reactor.name}</td>
                  <td>{reactor.fuel}</td>
                  <td>{reactor.status}</td>
                  <td>
                    {isAuthenticated && isModerator && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(String(reactor.id))}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(String(reactor.id))}
                        >
                          Удалить
                        </button>
                        <label htmlFor={`upload-photo-${reactor.id}`} className="btn btn-info btn-sm">
                          Обновить фото
                        </label>
                        <input
                          id={`upload-photo-${reactor.id}`}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleUpdatePhoto(String(reactor.id), e)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};