/** Name of the target sheet tab */
const SHEET_NAME = 'Hoja 1';

function doGet() {
  return ContentService.createTextOutput('Web App ready 🍁')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({ 'Access-Control-Allow-Origin': '*' });
}

// Handle CORS preflight if needed
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['timestamp','nombre','contacto','preferencia_otono','alergias','no_me_gusta','manias']);
    }

    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    sheet.appendRow([
      data.timestamp || new Date(),
      data.nombre || '',
      data.contacto || '',
      data.preferencia_otono || '',
      data.alergias || '',
      data.no_me_gusta || '',
      data.manias || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ 'Access-Control-Allow-Origin': '*' });

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ 'Access-Control-Allow-Origin': '*' });
  }
}
