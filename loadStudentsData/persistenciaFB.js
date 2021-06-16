/**
 * Conexión con la base de Datos de firestore
 */
const conexionFirestore = () =>{
  const info = datosConexionFirestores
  const firestore = FirestoreApp.getFirestore(info.email, info.key, info.projectId, 'v1beta1')
  return firestore
}

/**
 * Función que recibe como parametro del grupo y obtiene a los alumnos
 * retorna en un array en orden alfabetico a todos los alumnos
 */
const getPath = (valor_buscado, atributo='curp', coleccion='alumnos') => {   
  const result = conexionFirestore().query(coleccion).Where(atributo, '==', valor_buscado).Execute()
  if(result.length > 0){
    return result[0].path
  }
  return null
}

const updateStudent = (field='cicloActual', value=true) =>{
  path = getPath()
  if(path != null){
    data = {}
    data[`${field}`] = value 
    result = conexionFirestore().updateDocument(path, data, true)
  }
  else{
    // function for create student
  }
}