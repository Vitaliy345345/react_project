import React, { useEffect, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Box, Pagination } from '@mui/material';
import { btnDisplayType, TodoListType } from '../components/Content';
import { service } from '../service/paginationService';

interface PaginationComponentPropsType {
    todoLists: TodoListType[],
    setTLists: (tl: SetStateAction<TodoListType[]>) => void,
    setBtnDisplay: Dispatch<SetStateAction<btnDisplayType | null>>
}

export interface paginationTypes {
    count?: number,
    from: number,
    to: number
}

const pageSize: number = 6

const PaginationComponent = ({
    todoLists,
    setTLists,
    setBtnDisplay
}: PaginationComponentPropsType) => {
    const [pagination, setPagination] = useState<paginationTypes>({
        count: 0,
        from: 0,
        to: pageSize
    })

    useEffect(() => {
        service.getData(todoLists, { from: pagination.from, to: pagination.to })
            .then((response: any) => {
                console.log(response)
                setPagination({ ...pagination, count: response.count })
                setTLists(response.data)
                response.data.length >= 6 ? setBtnDisplay('none') : setBtnDisplay('block')
                if(response.data.length === 0) {
                    
                }
            }) 

    }, [pagination.from, pagination.to, todoLists])

    const handleOnChange = (event: ChangeEvent<unknown>, page: number) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination({ ...pagination, from: from, to: to })
    }

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}
            sx={{ padding: '25px 25px' }}
        >
            <Pagination
                count={Math.ceil(pagination.count ? pagination.count / pageSize : 0)}
                size='large'
                onChange={handleOnChange}
            />
        </Box>
    );
};

export default PaginationComponent;