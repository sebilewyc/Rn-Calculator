import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';
import '@testing-library/jest-native/extend-expect';

describe('Calculator', () => {
  it('adds two positive numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button1 = getByText('1');
    const button2 = getByText('2');
    const addButton = getByText('+');
    const equalButton = getByText('=');

    fireEvent.press(button1);
    fireEvent.press(addButton);
    fireEvent.press(button2);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('3');
  });

  it('subtracts two positive numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button5 = getByText('5');
    const button2 = getByText('2');
    const subtractButton = getByText('-');
    const equalButton = getByText('=');

    fireEvent.press(button5);
    fireEvent.press(subtractButton);
    fireEvent.press(button2);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('3');
  });

  it('multiplies two positive numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button3 = getByText('3');
    const button4 = getByText('4');
    const multiplyButton = getByText('*');
    const equalButton = getByText('=');

    fireEvent.press(button3);
    fireEvent.press(multiplyButton);
    fireEvent.press(button4);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('12');
  });

  it('divides two positive numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button8 = getByText('8');
    const button2 = getByText('2');
    const divideButton = getByText('/');
    const equalButton = getByText('=');

    fireEvent.press(button8);
    fireEvent.press(divideButton);
    fireEvent.press(button2);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('4');
  });

  it('handles negative numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button3 = getByText('3');
    const buttonMinus = getByText('-');
    const button2 = getByText('2');
    const addButton = getByText('+');
    const equalButton = getByText('=');

    fireEvent.press(button3);
    fireEvent.press(buttonMinus);
    fireEvent.press(button2);
    fireEvent.press(addButton);
    fireEvent.press(button3);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('4');
  });

  it('handles decimal numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const button1 = getByText('1');
    const buttonDot = getByText('.');
    const button5 = getByText('5');
    const addButton = getByText('+');
    const button2 = getByText('2');
    const equalButton = getByText('=');

    fireEvent.press(button1);
    fireEvent.press(buttonDot);
    fireEvent.press(button5);
    fireEvent.press(addButton);
    fireEvent.press(button2);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('3');
  });

  it('adds two negative numbers correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const buttonMinus = getByText('-');
    const button2 = getByText('2');
    const addButton = getByText('+');
    const equalButton = getByText('=');

    fireEvent.press(buttonMinus);
    fireEvent.press(button2);
    fireEvent.press(addButton);
    fireEvent.press(buttonMinus);
    fireEvent.press(button2);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('-4');
  });

  it('handles decimal precision correctly', () => {
    const { getByText, getByTestId } = render(<App />);
    const buttonDot = getByText('.');
    const button1 = getByText('1');
    const button2 = getByText('2');
    const addButton = getByText('+');
    const equalButton = getByText('=');

    fireEvent.press(button1);
    fireEvent.press(buttonDot);
    fireEvent.press(button2);
    fireEvent.press(addButton);
    fireEvent.press(button2);
    fireEvent.press(buttonDot);
    fireEvent.press(button1);
    fireEvent.press(equalButton);

    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('3.3');
  });
});
