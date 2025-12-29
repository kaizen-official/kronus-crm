"use client";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler,
    RadialLinearScale,
} from 'chart.js';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler,
    RadialLinearScale
);

const COLORS = [
    'rgba(99, 102, 241, 0.8)',   // Indigo
    'rgba(16, 185, 129, 0.8)',   // Emerald 
    'rgba(245, 158, 11, 0.8)',   // Amber
    'rgba(239, 68, 68, 0.8)',    // Red
    'rgba(139, 92, 246, 0.8)',   // Violet
    'rgba(14, 165, 233, 0.8)',   // Sky
];

export function StatusChart({ data }) {
    const labels = Object.keys(data || {}).map(key => key.replace(/_/g, ' '));
    const values = Object.values(data || {});

    if (labels.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 text-sm italic">No data available</div>;
    }

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: COLORS,
                borderColor: 'white',
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: { size: 11, weight: 'bold' }
                },
            }
        },
        cutout: '70%',
    };

    return (
        <div className="h-72 w-full pt-4">
            <Doughnut data={chartData} options={options} />
        </div>
    );
}

export function SourceChart({ data }) {
    const labels = Object.keys(data || {}).map(key => key.replace(/_/g, ' '));
    const values = Object.values(data || {});

    if (labels.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 text-sm italic">No data available</div>;
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Leads',
                data: values,
                backgroundColor: [
                    'rgb(99, 102, 241)',
                    'rgb(34, 197, 94)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(168, 85, 247)',
                    'rgb(236, 72, 153)',
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(34, 197, 94)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(168, 85, 247)',
                    'rgb(236, 72, 153)',
                ],
                borderWidth: 2,
                borderRadius: 2,
                barThickness: 20,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
            y: { grid: { display: false }, ticks: { font: { weight: 'bold' } } }
        }
    };

    return (
        <div className="h-72 w-full pt-4">
            <Bar data={chartData} options={options} />
        </div>
    );
}

export function TrendLineChart({ data }) {
    if (!data || data.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 text-sm italic">No trend data</div>;
    }

    const chartData = {
        labels: data.map(d => d.month),
        datasets: [
            {
                label: 'New Leads',
                data: data.map(d => d.count),
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: 'rgb(99, 102, 241)',
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: 'white',
                pointBorderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="h-72 w-full pt-4">
            <Line data={chartData} options={options} />
        </div>
    );
}

export function PerformanceRadar({ performanceData }) {
    if (!performanceData || performanceData.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 text-sm italic">No performance data</div>;
    }

    // Slice to top 3-4 performers for clarity
    const topPerformers = performanceData.slice(0, 3);

    const chartData = {
        labels: ['Close Rate', 'Efficiency', 'Pipeline Value', 'Total Leads', 'Won Leads'],
        datasets: topPerformers.map((user, idx) => ({
            label: user.name,
            data: [
                parseFloat(user.closeRate),
                100 - parseFloat(user.loseRate), // High efficiency if lose rate is low
                (user.pipelineValue / 1000000) * 10, // Normalized for radar
                (user.totalLeads / 50) * 100, // Normalized
                (user.wonLeads / 20) * 100, // Normalized
            ],
            backgroundColor: COLORS[idx].replace('0.8', '0.2'),
            borderColor: COLORS[idx],
            borderWidth: 2,
            pointBackgroundColor: COLORS[idx],
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { display: true, color: 'rgba(0,0,0,0.05)' },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { display: false },
                pointLabels: { font: { weight: 'bold', size: 10 } }
            }
        },
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
        }
    };

    return (
        <div className="h-80 w-full pt-4">
            <Radar data={chartData} options={options} />
        </div>
    );
}
