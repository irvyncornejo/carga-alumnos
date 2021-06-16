const getDataDelta = () => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheet = ss.getSheetByName('registro-delta')
  curpsRaw = sheet.getRange(`A1:A${sheet.getLastRow()}`).getValues()
  curps = curpsRaw.map(curp => curp[0].trim())
  Logger.log(curps)
}

const createStudent = (curp) => {
  const ssBase = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheetBase = ssBase.getSheetByName('query')
  valueCurp = sheetBase.getRange('A2').setValue(curp)
  Utilities.sleep(100)
  data = sheetBase.getRange('A1:AK1').getValues()[0]
  const student = new Student(data).create()
  conexionFirestore().createDocument(`administrativos/${student['datosAlumno']['nombreNormalizado']}`, student)
}