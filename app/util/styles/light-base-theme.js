import colorPallete from './color-pallete';

export default {
    palette: {
        primary1Color: colorPallete.primaryColor,
        accent1Color: colorPallete.accentColor,
        textColor: colorPallete.primaryTextColor,
        alternateTextColor: colorPallete.alternateTextColor
    },
    fontFamily: 'Roboto, sans-serif',
    datePicker: {
        selectColor: colorPallete.primaryColor
    },
    timePicker: {
        selectColor: colorPallete.primaryColor,
        headerColor: colorPallete.primaryColor
    },
    spacing : {
        desktopDropDownMenuFontSize: 14,
        desktopDropDownMenuItemHeight: 25,
        desktopGutter : 10
    }
};


