import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { id: 1, manager: 'John Doe', lat: 40.7128, lon: -74.0060 }, // New York
  { id: 2, manager: 'Jane Smith', lat: 34.0522, lon: -118.2437 }, // Los Angeles
  { id: 3, manager: 'Michael Johnson', lat: 41.8781, lon: -87.6298 }, // Chicago
];

const GeographyChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="lon" name="Longitude" unit="°" />
        <YAxis type="number" dataKey="lat" name="Latitude" unit="°" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Locations" data={data} fill="#8884d8">
          {
            data.map((entry, index) => (
              <text key={`label-${index}`} x={entry.lon} y={entry.lat} dy={-4} textAnchor="middle" fill="#8884d8">
                {entry.manager}
              </text>
            ))
          }
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default GeographyChart;
