export interface PacienteType {
  id?: number;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

export interface FormularioProps {
  modalVisible: boolean;
  setPacientes: (pacientes: PacienteType[]) => void;
  pacientes: PacienteType[];
  paciente: PacienteType | null;
  setPaciente: (paciente: PacienteType | null) => void;
  cerrarModal: () => void;
}

export interface PacienteProps {
  pacienteEditar: (id: number) => void;
  pacienteEliminar: (id: number) => void;
  item: PacienteType;
  setModalVisible: (visible: boolean) => void;
  setModalPaciente: (visible: boolean) => void;
  setPaciente: (paciente: PacienteType | null) => void;
}

export interface InformacionPacienteProps {
  paciente: PacienteType | null;
  setModalPaciente: (visible: boolean) => void;
  setPaciente: (paciente: PacienteType | null) => void;
}
