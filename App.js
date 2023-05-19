import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');

  const handleButtonPress = (buttonValue) => {
    setInput((prevInput) => prevInput + buttonValue);
  };

  const handleEqualsPress = () => {
    try {
      const result = eval(input); // 使用eval函数计算输入的表达式
      setInput(result.toString()); // 将计算结果设置为新的输入内容
    } catch (error) {
      setInput('Error'); // 如果计算出错，则显示"Error"
    }
  };

    const handleClearPress = () => {
      setInput('');
    };

    const handleDeletePress = () => {
      setInput((prevInput) => prevInput.slice(0, -1));
    };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{input}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.numberButtonContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('7')}
            >
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('8')}
            >
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('9')}
            >
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('4')}
            >
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('5')}
            >
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('6')}
            >
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('1')}
            >
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('2')}
            >
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('3')}
            >
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('0')}
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.operatorButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('*')}
          >
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('/')}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleClearPress}
        >
          <Text style={styles.bottomButtonText}>清空</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleDeletePress}
        >
          <Text style={styles.bottomButtonText}>删除</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.equalsButton} onPress={handleEqualsPress}>
        <Text style={styles.equalsButtonText}>=</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberButtonContainer: {
    marginRight: 10,
  },
  operatorButtonContainer: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  equalsButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  equalsButtonText: {
    fontSize: 24,
    textAlign: 'center',
  },

  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 18,
  },
});

export default App;
