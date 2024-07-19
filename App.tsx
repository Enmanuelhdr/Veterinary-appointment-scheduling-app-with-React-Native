import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';

// Componentes internos
import Formulario from './src/components/Formulario';
import InformacionPaciente from './src/components/InformacionPaciente';
import Paciente from './src/components/Paciente';
import {PacienteType} from './src/types';

function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pacientes, setPacientes] = useState<PacienteType[]>([]);
  const [paciente, setPaciente] = useState<PacienteType | null>(null);
  const [modalPaciente, setModalPaciente] = useState<boolean>(false);

  const pacienteEditar = (id: number) => {
    const pacienteSeleccionadoEditar = pacientes.filter(p => p.id === id);
    setPaciente(pacienteSeleccionadoEditar[0] || null);
  };

  const pacienteEliminar = (id: number) => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id,
            );
            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F3F4F5" />
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aun</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => Number(item.id).toString()}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Formulario
          modalVisible={modalVisible}
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          setPacientes={setPacientes}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
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
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
