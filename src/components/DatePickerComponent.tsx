import * as React from 'react';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DatePickerComponentPropType {
    setTodoDate: React.Dispatch<React.SetStateAction<Date | null>>
    todoDate: Date | null
}

function DatePickerComponent({todoDate, setTodoDate }: DatePickerComponentPropType) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
            <Stack spacing={2} sx={{ minWidth: 305 }}>
                <DateTimePicker
                    value={todoDate}
                    onChange={setTodoDate}
                    disablePast 
                    closeOnSelect
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default DatePickerComponent