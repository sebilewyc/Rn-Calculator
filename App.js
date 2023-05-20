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
      // 检查是否连续输入运算符
      if (/[+\-*/.]$/.test(prevInput) && /[+\-*/.]/.test(value)) {
        return prevInput.replace(/[+\-*/.]$/, value); // 用新输入的运算符替换掉旧的运算符
      }

      // 检查是否按下"="号后直接按下运算符
      if (prevInput === '' && /[+\-*/.]/.test(value)) {
        if (result !== '') {
          return result + value; // 将前一步计算的结果自动拼接到运算符前
        }
      }

      return prevInput + value;
    });
  };

  const calculateResult = () => {
    try {
      const validInput = validateInput();
      const parts = validInput.match(/[+\-*/.]|\d+(?:\.\d+)?/g); // 使用正则截断用户输入的部分
      let parsedResult = Decimal(parts[0]);
      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const operand = Decimal(parts[i + 1]);
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
    validInput = validInput.replace(/[^0-9+\-*/.]/g, ''); // 移除非数字、加减乘除和小数点的字符
    validInput = validInput.replace(/([+\-*/.])[+\-*/.]+/g, '$1'); // 连续的运算符只保留第一个
    validInput = validInput.replace(/^[*/]/, ''); // 去除开头的乘除符号
    validInput = validInput.replace(/[+\-*/.]$/, ''); // 去除末尾的运算符和小数点
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
        <Text style={styles.resultText} numberOfLines={2}>
          {result}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText} numberOfLines={2}>
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
