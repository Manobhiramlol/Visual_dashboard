import React, { useState, useEffect } from "react";
import { fetchDashboardData } from "../api/api.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Fetching data from API...");
        const result = await fetchDashboardData();
        console.log("Fetched Data:", result); // 🔍 Debug log
        if (!Array.isArray(result) || result.length === 0) {
          throw new Error("No data available");
        }
        setData(result);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Loading Data...
        </Typography>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Blackcoffer Dashboard
      </Typography>

      {/* Line Chart */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Trends Over Years
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Typography variant="h6" style={{ padding: "10px" }}>
          Data Overview
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Topic</strong></TableCell>
              <TableCell><strong>Country</strong></TableCell>
              <TableCell><strong>Year</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.topic || "N/A"}</TableCell>
                <TableCell>{item.country || "N/A"}</TableCell>
                <TableCell>{item.year || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
