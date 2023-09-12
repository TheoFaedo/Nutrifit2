import { FunctionComponent } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

type Props = {
    className?: string;
    label: string;
    color: string;
    value: number;
    goal: number;
}

const DoughnutChart: FunctionComponent<Props> = (props) => {

    const { className, label, color, value, goal } = props;

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = goal < value ?
    [0, value, 0]
    :
    [0, value, goal-value];

    const center = 
        (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className={'text-2xl font-bold ' + (goal < value ? "text-red-500" : "text-white")}>{value}</div>
            <div className={'text-md ' + (goal < value ? "text-red-600" : "text-neutral-400")}>/{goal}g</div>
        </div>) ;

    return (
        <div className={'relative ' + className}>
            {center}
            <Doughnut
                data={
                    {
                        labels: ['Over', label, 'Empty'],
                        datasets: [
                            {
                                label: 'g',
                                data: data,
                                backgroundColor: [
                                    '#F20000',
                                    color,
                                    '#111111'
                                ],
                                borderWidth: 0
                            }
                        ]
                    }
                }
                options={{
                    cutout: '85%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
        
    );

};

export default DoughnutChart;