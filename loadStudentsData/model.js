class Student {
  constructor(alumno){
    this.alumno = alumno
  }
  normalize(string){
    return string.normalize('NFD')
                .replace(/[\u0300-\u036f]/g,"")
                .toUpperCase()
                .trim()
  }

  createFullName(){
    const nombre = this.normalize(this.alumno[2])
    const apellidoPaterno = this.normalize(this.alumno[3])
    const apellidoMaterno = this.normalize(this.alumno[4])
    return `${apellidoPaterno} ${apellidoMaterno} ${nombre}`
  }
  
  create(){
    return {
      'datosAlumno': {
      'nombre': this.normalize(this.alumno[2]),
      'apellidoPaterno': this.normalize(this.alumno[3]),
      'apellidoMaterno': this.normalize(this.alumno[4]),
      'familia': this.alumno[6],
      'calle': this.alumno[7],
      'colonia': this.alumno[8],
      'poblacion': this.alumno[9],
      'CP': this.alumno[10],
      'entreCalles': this.alumno[11],
      'viveCon': this.alumno[12],
      'telefono': this.alumno[13],
      'celular': this.alumno[14],
      'correoElectronico': this.alumno[15],
      'secciondeIngreso': this.alumno[16],
      'gradodeIngreso': this.alumno[17],
      'ciclodeIngresoInicial': this.alumno[18],
      'ciclodeIngresoFinal': this.alumno[19],
      'fechadelPrimerIngreso': this.alumno[20],
      'tutor': this.alumno[21],
      'fechadeNacimiento': this.alumno[22],
      'tipoSangre': this.alumno[23],
      'nombreEmergencia': this.alumno[24],
      'telefonoEmergencia': this.alumno[25],
      'telefonoCelularEmergencia': this.alumno[26],
      'observaciones': this.alumno[27],
      'lugardeNacimiento': this.alumno[29],
      'sexo': this.alumno[30],
      'status': this.alumno[31],
      'fechaReingreso': this.alumno[32],
      'hijodeProfesor': this.alumno[34],
      'inscripcionCondicionada': this.alumno[35],
      'nombreNormalizado': this.createFullName()
      },
    'claveAlumno': parseInt(this.alumno[1]),
    'curp': this.alumno[0],
    'nombreAbreviado': this.alumno[5].trim(),
    'grado': parseInt(this.alumno[28]),
    'grupodeEstudio': null,
    'seccion': this.alumno[36],
    'correoAlumno': null, 
    'nombreGsuite': null
    }
  }
}



