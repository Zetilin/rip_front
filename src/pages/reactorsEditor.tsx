import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { ROUTES } from '../../Routes';
import { RootState, useAppDispatch } from '../store';
import { getReactorList, updateReactor } from '../slices/reactorSlice';
import { Reactor } from '../modules/NuclearApi';
import './meetupPage.css';
import { BreadCrumbs } from '../components/BreadCrumbs';

const ReactorEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { reactorId } = useParams<{ reactorId: string }>(); 
  const reactors = useSelector((state: RootState) => state.reactor.reactorsData.reactors);

  
  const currentReactor = reactors.find((reactor) => reactor.id === Number(reactorId));

  // Состояние для формы редактирования
  const [formData, setFormData] = useState<Reactor>({
    id: 0,
    status: 0,
    name: '',
    fuel: '',
    description: '',
    image: '',
  });

  
  useEffect(() => {
    dispatch(getReactorList());
  }, [dispatch]);

  
  useEffect(() => {
    if (currentReactor) {
      setFormData(currentReactor);
    }
  }, [currentReactor]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateReactor({ reactorId: String(formData.id), data: formData })); 
    navigate(ROUTES.REACTORS); 
  };

  if (!currentReactor) {
    return <div>Реактор не найден</div>;
  }

  return (
    <div className="container mx-0">
      <BreadCrumbs crumbs={[{ label: 'Редактирование реактора' }]} />
      <h2>Редактирование реактора: {currentReactor.name}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Статус: 1 - Действует, 2 - Удалена</Form.Label>
          <Form.Control
            type="number"
            name="name"
            value={formData.status}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formfuel">
          <Form.Label>Топливо</Form.Label>
          <Form.Control
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleInputChange}
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
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Сохранить изменения
        </Button>
      </Form>
    </div>
  );
};

export default ReactorEditor;