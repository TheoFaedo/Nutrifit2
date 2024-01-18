import { FunctionComponent } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { doughnutChartProportionsToProportions } from "../helpers/chartDataHelper";
import { Energy } from '../models/valueObjects/Energy';

type NutriData = {
    carbos: Energy;
    fats: Energy;
    proteins: Energy;
    energy_unit: string;
    energy: Energy;
}

type Props = {
    className?: string;
    nutriData: NutriData;
}

const MultipleDoughnutChart: FunctionComponent<Props> = (props) => {

    const { className, nutriData } = props;

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = doughnutChartProportionsToProportions({proteins: nutriData.proteins, fats: nutriData.fats, carbos: nutriData.carbos})

    console.log("update");
    console.log(data);

    const center = 
        (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className={'text-2xl font-bold text-white'}>{nutriData.energy.value}</span>
            <div className={'text-md text-white'}>{nutriData.energy.unitLabel}</div>
        </div>)
        
    return (
        <div className={'h-28 w-28 relative ' + className}>
            {center}
            <Doughnut
                data={
                    {
                        labels: ['Extra', 'Carbohydrates', 'Fats', 'Proteins', 'Empty'],
                        datasets: [
                            {
                                label: '%',
                                data: data,
                                backgroundColor: [
                                    '#F20000',
                                    '#38D386',
                                    '#CC57F5',
                                    '#EEBD30',
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

export default MultipleDoughnutChart;
