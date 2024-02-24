import { Divider, Menu, Typography as StyledTypography, Typography } from '@mui/material';
import { TaskType } from './TodoList'
import { isTimeLeft } from '../utils/isTimeLeft'
import styled from '@emotion/styled';
import { darkGray, lightGreen } from '../constants';

interface InfoMenuPropsType {
    open: boolean
    onClose: () => void
    anchorEl: HTMLElement | null
    title: string
    deadline: Date | null
    tasks: TaskType[]
    createTime: Date
}

const InfoMenu = ({ open, onClose, anchorEl, title, deadline, tasks, createTime }: InfoMenuPropsType) => {
    console.log(open)

    const tasksProgress = () => {
        const completedTasks = tasks.filter(t => t.isDone)
        return Math.round((completedTasks.length / tasks.length) * 100)
    }

    const StyledDivider = styled(Divider)`
        margin: 5px 0 5px 0;
        background-color: ${lightGreen};
        opacity: 0.5
    `;

    const StyledTypography = styled(Typography)`
        color: ${lightGreen}
    `;

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: `${darkGray}`
                },
            }}

        >
            <div style={{ margin: '11px' }}>
                <StyledTypography>
                    Title:  {title}
                </StyledTypography>

                <StyledDivider />
                
                <StyledTypography>
                    Created:  {createTime.toLocaleString()}
                </StyledTypography>
                
                <StyledDivider />

                <StyledTypography>
                    Deadline:
                    {
                        deadline
                            ? (
                                isTimeLeft(deadline, new Date())
                                    ?
                                    ' Time is left'
                                    :
                                    ` ${new Date(deadline).toLocaleString()}`
                            )
                            : ' Unlimited time'
                    }
                </StyledTypography>

                <StyledDivider />

                <StyledTypography>
                    Tasks count: {tasks.length > 0 ? tasks.length : 'no tasks'}
                </StyledTypography>

                <StyledDivider />

                <StyledTypography>
                    Progress: {tasks.length > 0 ? tasksProgress() : 0}%
                </StyledTypography>
            </div>
        </Menu>
    );
};

export default InfoMenu;