import React, { useState } from 'react';
import './MainForm.scss';

export interface MainFormProps {
  onSubmit: (name: string, email: string) => void;
}

const MainForm: React.FC<MainFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<{ [x: string]: string }>({});

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(values.name, values.email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name='name' type='text' value={values.name || ''} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name='email' type='email' value={values.email || ''} onChange={handleChange} />
      </label>
      <button type='submit' data-testid='mainform__submit-button'>
        Submit
      </button>
    </form>
  );
};

export default MainForm;
