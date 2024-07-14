import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

// Dependencias

// Comoponentes internos
import Formulario from './src/components/Formulario';

function App(): React.JSX.Element {
  // Los hoos se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false);

  const nuevaCitaHandler = () => {
    console.log('diste click');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F3F4F5" />
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      <Formulario
        modalVisible={modalVisible}
        nuevaCitaHandler={nuevaCitaHandler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F5',
    flex: 1,
  },

  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: 'bold',
  },

  tituloBold: {
    fontWeight: '900',
    color: '#5D29D9',
  },

  btnNuevaCita: {
    backgroundColor: '#6D26D9',
    padding: 15,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default App;
