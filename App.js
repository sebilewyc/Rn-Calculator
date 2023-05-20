import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Decimal } from 'decimal.js';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    setInput((prevInput) => {
      // Check if consecutive operators are entered
      if (/[+\-*/.]$/.test(prevInput) && /[+\-*/.]/.test(value)) {
        return prevInput.replace(/[+\-*/.]$/, value); // Replace the old operator with the new one
      }

      // Check if an operator is pressed immediately after "="
      if (prevInput === '' && /[+\-*/.]/.test(value)) {
        if (result !== '') {
          return result + value; // Automatically concatenate the previous result before the operator
        }
      }

      return prevInput + value;
    });
  };

  const calculateResult = () => {
    try {
      const validInput = validateInput();
      // Split the input into parts using regex. If the first character starts with "-", it indicates a negative value, and we need to treat the "-" sign and the following number as one part.
      const parts = validInput.match(
        /^-?\d+(?:\.\d+)?|[+\-*/.]|\d+(?:\.\d+)?/g
      );
      let parsedResult = Decimal(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        let operand = Decimal(parts[i + 1]);

        if (
          operator === '-' &&
          i + 2 < parts.length &&
          /^\d+(?:\.\d+)?$/.test(parts[i + 2])
        ) {
          // If the current operator is "-", and there is a number following it, consider the "-" sign and the number as one part.
          operand = operand.negated();
          i++; // Skip the next number
        }

        switch (operator) {
          case '+':
            parsedResult = parsedResult.plus(operand);
            break;
          case '-':
            parsedResult = parsedResult.minus(operand);
            break;
          case '*':
            parsedResult = parsedResult.times(operand);
            break;
          case '/':
            parsedResult = parsedResult.dividedBy(operand);
            break;
          default:
            throw new Error('Invalid operator');
        }
      }

      setResult(parsedResult.toString());
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  const validateInput = () => {
    let validInput = input;
    validInput = validInput.replace(/[^0-9+\-*/.]/g, ''); // Remove characters other than numbers, operators (+-*/), and decimal point.
    validInput = validInput.replace(/([+\-*/.])[+\-*/.]+/g, '$1'); // Keep only the first operator in consecutive operators.
    validInput = validInput.replace(/^[*/]/, ''); // Remove leading multiplication and division symbols.
    validInput = validInput.replace(/[+\-*/.]$/, ''); // Remove trailing operators and decimal point.
    return validInput;
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const buttons = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['.', '0', '=', '/'],
    ['', '', '⌫', 'C'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text testID='resultText' style={styles.resultText}>
          {result}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>
          {input}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  button === '=' ? styles.equalButton : null,
                ]}
                onPress={() => {
                  if (button === 'C') {
                    clearInput();
                  } else if (button === '=') {
                    calculateResult();
                  } else if (button === '⌫') {
                    backspace();
                  } else {
                    handlePress(button);
                  }
                }}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  buttonsContainer: {
    flex: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  equalButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  inputText: {
    fontSize: 40,
    color: '#333',
    textAlign: 'right',
  },
  resultText: {
    fontSize: 60,
    color: '#333',
    textAlign: 'right',
  },
});

export default App;
