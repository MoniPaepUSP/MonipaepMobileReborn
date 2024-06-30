import React, { useState, useEffect, Fragment } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NewQuestionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NewQuestionModal({ visible, onClose }: NewQuestionModalProps): JSX.Element {
  const [step, setStep] = useState<'input' | 'loading' | 'success'>('input');
  const [error, setError] = useState('');

  const [question, setQuestion] = useState('');
  const handleChangeQuestion = (text: string): void => {
    setQuestion(text);
    setError('');
  }

  const handleSendQuestion = async (): Promise<void> => {
    const cleanQuestion = question.trim();
    if (cleanQuestion !== "") {
      try {
        setError('');
        setStep('loading');
        await new Promise(resolve => setTimeout(resolve, 500));
        setStep('success');
      } catch (e) {
        setError(e.message);
        setStep('input');
      }
    } else {
      setError('Por favor, escreva uma pergunta.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          {step === 'input' && (
            <Fragment>
              <Text style={styles.modalTitle}>Faça a sua pergunta</Text>
              <TextInput
                style={styles.input}
                placeholder="Escreva aqui sua pergunta..."
                multiline
                value={question}
                onChangeText={handleChangeQuestion}
              />
              {error !== '' ? <Text style={styles.errorText}>{error}</Text> : null}
              <TouchableOpacity style={styles.submitButton} onPress={handleSendQuestion}>
                <Text style={styles.submitButtonText}>Enviar pergunta</Text>
              </TouchableOpacity>
            </Fragment>
          )}
          {step === 'loading' && (
            <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
          )}
          {step === 'success' && (
            <View style={styles.successContainer}>
              <MaterialIcons name="check-circle" size={48} color="green" />
              <Text style={styles.successText}>Enviada com sucesso</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: 300, // Constant height
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  submitButton: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
});