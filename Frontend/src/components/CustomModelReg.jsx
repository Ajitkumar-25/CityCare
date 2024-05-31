import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlertModal = ({ isVisible, onDismiss, onOkPress }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onDismiss} style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Successfully registered! Please login now.</Text>
        <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentText: {
    fontSize: 16,
    marginBottom: 12,
  },
  okButton: {
    backgroundColor: '#7d5fff',
    padding: 10,
    borderRadius: 4,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomAlertModal;
