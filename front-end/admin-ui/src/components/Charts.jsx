// File: Charts.js
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function LineChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                borderColor: '#3f51b5',
                tension: 0.3,
            },
        ],
    };

    return <Line data={data} />;
}
