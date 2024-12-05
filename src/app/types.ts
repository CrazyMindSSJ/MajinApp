export interface Taller {
    id_taller: number;
    instructor: string;
    rut_instructor: string;
    capa_disp: number;
    nombre_taller: string;
    fecha_inicio: string;
    fecha_fin: string;
    usuarios: string[];
    usuariosNombres: string[];
    materiales:string[];
}

export interface Usuario {
    rut: string;
    nombre: string;
    apellido: string;
    direccion: string;
    fecha_nacimiento: string;
    genero: string;
    telefono: number;
    correo: string;
    contra: string;
    contraVali: string;
    tipo_usuario: string;
    comuna: string;
    region: string;
}

export interface Sala{
    id_sala: number;
    nom_sala: string;
    id_taller: number;
}

export interface Region {
    id_region: number;
    nombre: string;
}

export interface Comuna {
    id_comuna: number;
    nombre: string;
}

export interface Municipalidad {
    id_muni: number;
    nom_muni: string;
    id_comuna: string;
    id_region: string;
}

export interface Material {
    id_material: number;
    nom_material: string;
}

export interface Perfil {
    id_perfil: string;
    descripcion: string;
}

export interface Pago {
    nro_boleta:number;
    monto: number;
    bono: number;
    fecha_boleta: string;
    rut_usuario: string;
}

export interface Solicitud {
    id_solicitud: number;
    descripcion: string;
}