import * as XLSX from 'xlsx';

export const downloadAsExcel = ({
  data,
  headers,
  filename = 'download.xlsx',
  sheetName = 'Sheet1'
}) => {
  // Transform data to match header keys if headers are provided
  const formattedData = data.map(item => {
    if (!headers) return item;
    
    return headers.reduce((acc, header) => {
      acc[header.label] = item[header.key];
      return acc;
    }, {});
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(formattedData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // Generate and download file
  XLSX.writeFile(wb, filename);
}; 