const openSpreadSheet = (id) => SpreadsheetApp.openById(id)

/**
 * 
 */
const convertFiles = (name, content) => {
    const fileDescription = {
      title: name,
      mimeType: 'application/vnd.google-apps.spreadsheet'
    }
    ss = Drive.Files.insert(fileDescription, content, {
      convert: true
    })
    return ss.getId()
}

/**
 * 
 */
const moveFiles = (ids, bucketId) => {
  const folder = DriveApp.getFolderById(bucketId)
  ids.forEach(id => {
    file = DriveApp.getFileById(id)
    file.moveTo(folder)
  })
}

const getDelta = () => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  delta = ss.getSheetByName('calculo-delta')
  delta.getRange('A1').setValue('=FILTER(1!A1:A800, ISNA(MATCH(1!A1:A800, 0!A1:A800,0)))')
  Utilities.sleep(300)
  updateDelta(delta)
}

const updateDelta = (data) => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheet = ss.getSheetByName('registro-delta')
  finalRow = data.getLastRow()
  deltaCurps = data.getRange(`A1:A${finalRow}`).getValues()
  deltaCurps.forEach(curp => sheet.appendRow(curp))
  //curps = deltaCurps.map(curp => curp[0])
  //sheet.appendRow(curps)
  Utilities.sleep(300)
  updteSheets()
}

const updteSheets = () =>{
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheetDelete = ss.getSheetByName('0')
  ss.deleteSheet(sheetDelete)
  ss.getSheetByName('1').setName('0')
  ss.insertSheet().setName('1')
}

const copySheet = (id) =>{
  const ssBase = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  const ss = SpreadsheetApp.openById(id)
  const nameSpreadSheet =  ss.getName()
  sheet = ss.getSheets()[0]
  lastRow = sheet.getLastRow()
  lastColumn = sheet.getLastColumn()
  section = new Section(nameSpreadSheet).getSection()
  sheet.getRange(1,lastColumn+1, lastRow).setValue(section)
  sheet.copyTo(ssBase)
}

const getSheetsBase = () => {
  const ssBase = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheets = ssBase.getSheets()
  sheetsName = []
  sheets.forEach(sheet => {
    if(sheet.getName().includes('Directorio de Alumnos')){
      sheetsName.push(sheet.getName())
    }
  })
  copyDataSheets(ssBase, sheetsName)
}

const copyDataSheets = (ssBase, sheetsName) => {
  sheetBase = ssBase.getSheetByName('1')
  count = 1
  sheetsName.forEach(name =>{
    sheet = ssBase.getSheetByName(name)
    lastRow = sheet.getLastRow()
    lastColumn = sheet.getLastColumn()
    data = sheet.getRange(3, 1, lastRow, lastColumn)
    rangeA1Notation = data.getA1Notation()
    lastValue = parseInt(rangeA1Notation.slice(5))
    data.moveTo(sheetBase.getRange(`A${count}`))
    count += lastValue
    ssBase.deleteSheet(sheet)
  })
  sheetBase.moveColumns(sheetBase.getRange('B:B'), 1)
  Utilities.sleep(100)
}

const moveColumn = () => {
  const ssBase = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheetBase = ssBase.getSheetByName('0')
  sheetBase.moveColumns(sheetBase.getRange('B:B'), 1)
}

const deleteFiles = (documentsId) =>{
  /**
   * Opcional function for delete files after use in load data
   */
}

/**
 * 
 */
const getFilesNames = () => {
  const bucketId = DriveApp.getFoldersByName('archivos-excel').next().getId()
  const documents = DriveApp.getFolderById(bucketId).getFiles()
  const documentsId = []
  while (documents.hasNext()){
    file = documents.next()
    if(file.getName().includes('.xls')){
      name = file.getName()
      content = file.getBlob()
      newId = convertFiles(name, content)
      documentsId.push(newId)
    }
  }
  moveFiles(documentsId, bucketId)
  documentsId.forEach(id => copySheet(id))
  getSheetsBase()
  getDelta()
}



