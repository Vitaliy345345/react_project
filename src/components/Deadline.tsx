import { AccessAlarm } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { calculateTimeDifference} from '../utils/calculateTimeDifference';
import {isTimeLeft} from '../utils/isTimeLeft'

interface DeadlinePropsType {
    time: Date | null
}

const Deadline = ({ time }: DeadlinePropsType) => {

    const isTimeLeftColor = (targetDate: Date, currentDate: Date): string => {
        if(!targetDate){
            return ''
        }else if (isTimeLeft(targetDate, currentDate) === true){
            return '#F15A59'
        }else return '#BED754'
    }

    return (
        time
            ?
            <div>
                <Typography
                    color={isTimeLeftColor(time, new Date())}
                    className='paper__header--time'
                >
                    <AccessAlarm />
                    {`${time ? new Date(time).toLocaleString() : ''}`}
                </Typography>
                <Typography
                    color={isTimeLeftColor(time, new Date())}
                    className='paper__header--time'
                >
                    {`${time ? calculateTimeDifference(new Date(time)) : ''}`}
                </Typography>
            </div>
            :
            <Typography color={'yellow'} fontWeight={'bold'} >
                UNLIMITED TIME
            </Typography>
    );
};

export default Deadline;

