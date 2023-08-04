import { FunctionComponent } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { doughnutChartPercentToProportions, doughnutChartProportionsToProportions } from "../helpers/chartDataHelper";

type NutriData = {
    carbos_percents: number;
    fats_percents: number;
    proteins_percents: number;
    energy_goal: number;
    energy_unit: string;
    energy: number;
}

type Props = {
    className?: string;
    nutriData: NutriData;
    type: "goal" | "proportions";
}

const DoughnutChart: FunctionComponent<Props> = (props) => {

    const { className, nutriData, type } = props;

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = type === "proportions" ? 
    doughnutChartProportionsToProportions({proteins: nutriData.proteins_percents, fats: nutriData.fats_percents, carbos: nutriData.carbos_percents})
    : 
    doughnutChartPercentToProportions({proteins: nutriData.proteins_percents, fats: nutriData.fats_percents, carbos: nutriData.carbos_percents});

    const center = type === "proportions" ? 
        (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className={'text-2xl font-bold text-white'}>{nutriData.energy}</div>
            <div className={'text-md text-white'}>{nutriData.energy_unit}</div>
        </div>) 
        : 
        (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className={'text-2xl font-bold ' + (nutriData.energy_goal < nutriData.energy ? "text-red-500" : "text-white")}>{nutriData.energy}</div>
            <div className={'text-md ' + (nutriData.energy_goal < nutriData.energy ? "text-red-600" : "text-neutral-400")}>/{nutriData.energy_goal}{nutriData.energy_unit}</div>
        </div>) ;

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

export default DoughnutChart;
