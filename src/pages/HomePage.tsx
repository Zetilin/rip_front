import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button, Container } from "react-bootstrap";
import '../styles.css'

export const HomePage: FC = () => {
  return (
    <Container>
        <div className="t-container">
          <h1 className="primary-text">АЭС СССР и СНГ</h1>
          <h2 className="secondary-text">Предлагаем вам ознакомиться с реакторами для установки на станцию</h2>
          <Link to={ROUTES.REACTORS}>
            <Button className="btn btn.primary">Реакторы</Button>
          </Link>
        </div>
    </Container>
  );
};