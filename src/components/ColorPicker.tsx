import { Button, Menu } from '@mui/material';
import React, {useContext} from 'react';
import { TwitterPicker } from 'react-color';

interface ColorPickerPropsType {
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    textColor: string
}

const ColorPicker: React.FC<ColorPickerPropsType> = ({ color, setColor, textColor }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const colors = [
        '#382933',
        '#3B5249',
        '#59405C',
        '#7D0633',
        '#87431D',
        '#900C3F',
        '#4E31AA',
        '#4C0033',
        '#064663'
    ]

    return (
        <div>
            <div className='color__content'>
                <h2 style={{ color: `${textColor}` }}>Chose color: </h2>
                <Button
                    variant='contained'
                    className='button__color'
                    style={{ backgroundColor: color }}
                    onClick={handleClick}></Button>
            </div>
            <Menu anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <TwitterPicker
                    color={color}
                    colors={colors}
                    onChangeComplete={(color) => { setColor(color.hex); }} />
            </Menu>
        </div>
    )
};

export default ColorPicker;