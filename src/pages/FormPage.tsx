import React from 'react';
import MainForm from '../features/form/components/MainForm';
const FormPage: React.FC = () => (
  <main>
    <MainForm onSubmit={(name, email) => alert(`name: ${name}\nemail: ${email} `)} />
  </main>
);
export default FormPage;
