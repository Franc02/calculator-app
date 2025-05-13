import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');

  const handlePress = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput('');
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleCalculate = () => {
    try {
      const expression = input
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/\^/g, '');
      const result = eval(expression);
      setInput(result.toString());
    } catch (e) {
      setInput('Erreur');
    }
  };

  const renderButton = (label, onPress = () => handlePress(label), style = {}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputContainer} horizontal contentContainerStyle={{ alignItems: 'flex-end' }}>
        <Text style={styles.input}>{input}</Text>
      </ScrollView>

      {/* Ligne scientifique */}
      <View style={styles.row}>
        {renderButton('(', undefined, styles.scientific)}
        {renderButton(')', undefined, styles.scientific)}
        {renderButton('√', undefined, styles.scientific)}
        {renderButton('^', undefined, styles.scientific)}
      </View>
      <View style={styles.row}>
        {renderButton('π', undefined, styles.scientific)}
        {renderButton('.', undefined, styles.scientific)}
        {renderButton('⌫', handleBackspace, styles.control)}
        {renderButton('C', handleClear, styles.control)}
      </View>

      {/* Chiffres et opérateurs */}
      <View style={styles.row}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('/', undefined, styles.operator)}
      </View>
      <View style={styles.row}>
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('*', undefined, styles.operator)}
      </View>
      <View style={styles.row}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('-', undefined, styles.operator)}
      </View>
      <View style={styles.row}>
        {renderButton('0')}
        {renderButton('=',
          handleCalculate,
          [styles.operator, { backgroundColor: '#27ae60' }]
        )}
        {renderButton('+', undefined, styles.operator)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 10,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    maxHeight: 100,
    marginBottom: 20,
  },
  input: {
    fontSize: 42,
    color: '#ecf0f1',
    textAlign: 'right',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  button: {
    flex: 1,
    height: 60,
    marginHorizontal: 4,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 24,
    color: '#ecf0f1',
    fontWeight: '600',
  },
  operator: {
    backgroundColor: '#e67e22',
  },
  control: {
    backgroundColor: '#e74c3c',
  },
  scientific: {
    backgroundColor: '#9b59b6',
  },
});