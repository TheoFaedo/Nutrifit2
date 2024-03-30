import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import "./styles/RewardBar.css";
import { AuthStatus, useAuth } from '../hooks/useAuth';
import User from '../models/User';

const RewardBar: FunctionComponent = () => {

        const { account } = useAuth();

        const loaded: boolean = account != null;
        
        const getRewardColor = useCallback((level: number) => {
            if(level >= 100){
                return "darkmatter";
            }else if(level >= 75){
                return "gold";
            }else if(level >= 50){
                return "silver";
            }else if(level >= 30){
                return "bronze";
            }else if(level >= 24){
                return "black-rwrd";
            }else if(level >= 12){
                return "brown-rwrd";
            }else if(level >= 8){
                return "blue-rwrd";
            }else if(level >= 6){
                return "green-rwrd";
            }else if(level >= 4){
                return "bg-orange-500";
            }else if(level >= 3){
                return "bg-yellow-200";
            }else if(level >= 2){
                return "bg-white";
            }

            return "bg-none";
         }, []);


         const bgColor = loaded ? getRewardColor(Number(account?.level)) : "bg-none";
        
    

    return (
        <div className="reward-bar relative">
            <div className={'h-3/4 w-full absolute ' + bgColor}>
                
            </div>
            { ((account??{level: 0}).level >= 30) && <div className='h-3/4 z-10 w-full absolute mask'>
                 
            </div>}
        </div>
    );
}

export default RewardBar;
