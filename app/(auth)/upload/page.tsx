'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';

function Upload() {
  const [data, setData] = useState<any[]>([]);

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const workbook = XLSX.read(event.target?.result, {
          type: 'binary',
          cellDates: true,
          cellStyles: true,
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        });

        setData(jsonData);
      } catch (error) {
        console.error('파일 처리 중 오류 발생:', error);
        alert('파일을 처리하는 중 오류가 발생했습니다.');
      }
    };

    reader.onerror = error => {
      console.error('파일 읽기 오류:', error);
      alert('파일을 읽는 중 오류가 발생했습니다.');
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="w-full h-36 p-5 bg-white">
        <div className="flex flex-col gap-2">
          <span>
            "검진결과 올리기" 버튼을 클릭하셔서 검진결과 엑셀파일을 확인하세요.
          </span>
          <span>
            검진 결과가 정상적으로 보이신다면 "검진결과 발송하기" 버튼을
            클릭하세요.
          </span>
          <div className="flex gap-2 h-12">
            <form className="max-w-fit">
              <label htmlFor="upload_file">
                <div className="primary-btn p-3 text-sm cursor-pointer">
                  검진결과 올리기
                </div>
              </label>
              <input
                type="file"
                id="upload_file"
                name="upload_file"
                accept=".xls, .xlsx"
                onChange={onUploadFile}
                className="hidden"
              ></input>
            </form>
            <button className="primary-btn p-3 text-sm">
              검진결과 발송하기
            </button>
          </div>
        </div>
      </div>

      <div>
        {data.length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50"></tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {row.map((cell: string, index: number) => (
                      <td
                        key={index}
                        className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-b"
                      >
                        {cell.length > 30 ? cell.slice(0, 30) + '...' : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
