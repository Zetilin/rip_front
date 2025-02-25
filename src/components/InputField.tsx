import React, { FC } from 'react';
import { Button } from 'react-bootstrap'; // Предполагаем, что используется react-bootstrap
import '../styles.css'


interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder: string;
}

const InputField: FC<Props> = ({ value, onChange, onSubmit, loading, placeholder }) => (
    <div className="col-md-8">
      <form className="search-bar" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name="reactor_name"
            />
          </div>
          <div className="col-md-3">
            <Button
              type="submit"
              className="search-btn btn btn-primary w-100"
              disabled={loading}
            >
              Поиск
            </Button>
          </div>
        </div>
      </form>
    </div>
);

export default InputField;