// src/components/Formulario.tsx
import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {FormularioProps, PacienteType} from '../types';

const Formulario: React.FC<FormularioProps> = ({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState<string | null>(null);
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (pacienteObj) {
      setPaciente(pacienteObj.paciente);
      setId(pacienteObj.id ? pacienteObj.id.toString() : null);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    if ([paciente, propietario, email, telefono, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Define a new type that extends PacienteType with an optional id field
    const nuevoPaciente: PacienteType = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      nuevoPaciente.id = Number(id);
    } else {
      nuevoPaciente.id = Date.now();
    }

    if (id) {
      // Update existing paciente
      const pacientesActualizados = pacientes.map(p =>
        p.id === nuevoPaciente.id ? nuevoPaciente : p,
      );
      setPacientes(pacientesActualizados);
      setPacienteApp(null);
    } else {
      // Add new paciente
      setPacientes([...pacientes, nuevoPaciente]);
    }
    cerrarModal();
    setId('');
    setPaciente('');
    setEmail('');
    setPropietario('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <StatusBar backgroundColor="#6D28D9" />
        <ScrollView>
          <Text style={styles.titulo}>
            {id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              cerrarModal();
              setPacienteApp(null);
              setId('');
              setPaciente('');
              setEmail('');
              setPropietario('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>X cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="xxx@xxx.com"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="(xxx)-xxx-xxxx"
              placeholderTextColor={'#666'}
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                onDateChange={date => setFecha(date)}
                locale="es"
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              keyboardType="default"
              placeholder="Síntomas"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {id ? 'Editar' : 'Agregar'} Paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827A4',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Formulario;
