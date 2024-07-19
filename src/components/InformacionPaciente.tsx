import React from 'react';
import {
  Text,
  SafeAreaView,
  Pressable,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {InformacionPacienteProps} from '../types';
import {formatearFecha} from '../helpers';

const InformacionPaciente: React.FC<InformacionPacienteProps> = ({
  paciente,
  setPaciente,
  setModalPaciente,
}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar backgroundColor="#F59E0B" />

      <Text style={styles.titulo}>
        Informacion {''}
        <Text style={styles.tituloBold}>Paciente</Text>
      </Text>

      <View>
        <Pressable
          style={styles.btnCerrar}
          onLongPress={() => {
            setModalPaciente(false);
            setPaciente(null);
          }}>
          <Text style={styles.btnCerrarTexto}>x Cerrar</Text>
        </Pressable>
      </View>

      <View style={styles.contenido}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{paciente?.paciente}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Propietario:</Text>
          <Text style={styles.valor}>{paciente?.propietario}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.valor}>{paciente?.email}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Telefono:</Text>
          <Text style={styles.valor}>{paciente?.telefono}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Fecha Alta:</Text>
          <Text style={styles.valor}>
            {paciente ? formatearFecha(paciente.fecha) : ''}
          </Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Sintomas:</Text>
          <Text style={styles.valor}>{paciente?.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
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
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  campo: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 12,
  },
  valor: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default InformacionPaciente;
