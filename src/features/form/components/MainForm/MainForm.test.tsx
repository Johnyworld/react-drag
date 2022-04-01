import { render, screen, fireEvent } from '@testing-library/react';
import MainForm from './MainForm';

const mockSubmit = jest.fn();

test('버튼 텍스트를 렌더합니다.', () => {
  render(<MainForm onSubmit={mockSubmit} />);
  const buttonEl = screen.getByText('Submit');
  expect(buttonEl).toBeInTheDocument();
});

test('버튼 텍스트를 렌더합니다. 두번째 방법', () => {
  render(<MainForm onSubmit={mockSubmit} />);
  const buttonEl = screen.getByTestId('mainform__submit-button');
  expect(buttonEl.textContent).toBe('Submit');
});

test('라벨 렌더링 테스트', () => {
  render(<MainForm onSubmit={mockSubmit} />);
  const nameInputEl = screen.getByLabelText('Name');
  const emailInputEl = screen.getByLabelText('Email');
  expect(nameInputEl).toBeInTheDocument();
  expect(emailInputEl).toBeInTheDocument();
});

test('제출 이벤트 작동 테스트', () => {
  render(<MainForm onSubmit={mockSubmit} />);
  const buttonEl = screen.getByTestId('mainform__submit-button');
  fireEvent.click(buttonEl);
  expect(mockSubmit.mock.calls.length).toBe(1);
});

// test('버튼 클릭 이벤트가 작동합니다.');
test('제출 이벤트로 값이 제대로 전달 되는지 테스트합니다.', () => {
  let values: { [x: string]: string } = {};
  const handleSubmit = (name: string, email: string) => {
    values.name = name;
    values.email = email;
  };
  render(<MainForm onSubmit={handleSubmit} />);
  const nameInputEl = screen.getByLabelText('Name');
  const emailInputEl = screen.getByLabelText('Email');
  const buttonEl = screen.getByTestId('mainform__submit-button');
  fireEvent.change(nameInputEl, { target: { value: 'Johny Kim' } });
  fireEvent.change(emailInputEl, { target: { value: 'johnyworld@naver.com' } });
  fireEvent.click(buttonEl);
  expect(values.name).toEqual('Johny Kim');
  expect(values.email).toEqual('johnyworld@naver.com');
});
