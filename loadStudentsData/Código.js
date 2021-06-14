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

/**
 * 
 */
const getData = (documentsId) => {
  documentsId.forEach(id => {
    const ss = SpreadsheetApp.openById(id)
    const data = ss.getRange(`A3:AJ${ss.getLastRow()}`).getValues()
    writeData(data)
  })
}


const writeData = (data) => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  const sheet = ss.getSheetByName('1')
  data.forEach(row => sheet.appendRow(row))
}

const getDelta = () => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  delta = ss.getSheetByName('calculo-delta')
  delta.getRange('A1').setValue('=FILTER(1!B1:B800, ISNA(MATCH(1!B1:B800, 0!B1:B800,0)))')
  Utilities.sleep(300)
  updateDelta(delta)
}

const updateDelta = (data) => {
  const ss = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  sheet = ss.getSheetByName('registro-delta')
  finalRow = data.getLastRow()
  deltaCurps = data.getRange(`A1:A${finalRow}`).getValues()
  curps = deltaCurps.map(curp => curp[0])
  sheet.appendRow(curps)
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

const copyData = () =>{
  const ss = SpreadsheetApp.openById('11Nu6nSvTEeoKVKunlC56bMRNRa3taDYXvEYRcZZLyCg')
  const ssBase = SpreadsheetApp.openById('1g1MMx5iIdUnUipWLif1Y9w0n35xAAIT_xZUshtO888A')
  cellInsert = ssBase.getSheetByName('base').getRange('A1')
  sheet = ss.getSheets()[0]
  lastRow = sheet.getLastRow()
  lastColumn = sheet.getLastColumn()
  data = sheet.getRange(3, 1, lastRow, lastColumn)
  sheet.copyTo(ssBase)

  
  
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
  getData(documentsId)
  getDelta()

}



