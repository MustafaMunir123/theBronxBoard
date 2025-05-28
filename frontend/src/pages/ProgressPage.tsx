import React, { useEffect, useState } from "react";
import { progress } from "../services/axiosService";
import { getLocalStorage } from "../utils/localStorage";
import { useParams } from "react-router-dom";

interface ReportResult {
  attempt_number: number;
  obtained_marks: number;
  total_marks: number;
  status: string;
  percentage: number;
}

interface ReportItem {
  id: string;
  learning_path_title: string;
  content_title: string;
  results: ReportResult[];
}

const ProgressPage: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const { uid } = useParams();
  // console.log("uid", uid);
  // const uid = getLocalStorage("uid");
  useEffect(() => {
    const fetchData = async () => {
      const res = await progress.getReport(uid as string);
      setReportData(res.report);
    };
    fetchData();
  }, []);

  // const handleExport = () => {
  //   // In real app, export logic here
  //   alert("Export functionality would go here");
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Progress Report</h1>
        {/* <Button onClick={handleExport} icon={<Download className="h-5 w-5" />}>
          Export
        </Button> */}
      </div>

      {reportData.length === 0 ? (
        <p className="text-gray-500">No report data available.</p>
      ) : (
        <div className="space-y-6">
          {reportData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {item.learning_path_title}
              </h2>
              <p className="text-gray-600 mb-4">{item.content_title}</p>

              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-3">Attempt</th>
                    <th className="py-2 px-3">Obtained</th>
                    <th className="py-2 px-3">Total</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {item.results.map((result, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-3">{result.attempt_number}</td>
                      <td className="py-2 px-3">{result.obtained_marks}</td>
                      <td className="py-2 px-3">{result.total_marks}</td>
                      <td
                        className={`py-2 px-3 font-medium ${
                          result.status === "Pass"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {result.status}
                      </td>
                      <td className="py-2 px-3">
                        {result.percentage.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
