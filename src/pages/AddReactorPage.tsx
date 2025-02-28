import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { ROUTES } from '../../Routes';
import { RootState, useAppDispatch } from '../store';
import { addReactor } from '../slices/reactorSlice';
import { Reactor } from '../modules/NuclearApi';
import { BreadCrumbs } from '../components/BreadCrumbs';
import './meetupPage.css';

const AddReactorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Состояние для формы добавления
  const [formData, setFormData] = useState<Reactor>({
    id: 0, // ID будет присвоен на сервере
    status: 0,
    name: '',
    fuel: '',
    description: '',
    image: '',
  });

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addReactor(formData)); // Отправляем данные нового спикера
    navigate(ROUTES.REACTORS); // Перенаправляем на страницу списка спикеров
  };

  return (
    <div className="container mx-0">
      <BreadCrumbs crumbs={[{ label: 'Добавление реактора' }]} />
      <h2>Добавление нового реактора</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Статус: 1 - Действует, 2 - Удалена</Form.Label>
          <Form.Control
            type="number"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFuel">
          <Form.Label>Топливо</Form.Label>
          <Form.Control
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Добавить реактор
        </Button>
      </Form>
    </div>
  );
};

export default AddReactorPage;