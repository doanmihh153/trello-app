//Theme base -- Global Website
import { createTheme } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '58px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const theme = createTheme({
    // Custom Css trong JS ✅
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
    },
    palette: {
        // mode: 'light',
        primary: {
            main: teal[400],
            light: teal[200], // (tuỳ chọn)
            dark: teal[700], // (tuỳ chọn)
            contrastText: '#fff', // (tuỳ chọn)
            textBlack: '#000'
        },
        secondary: {
            main: red[500],
        },
        error: {
            main: red.A400,
        },
        // Custom qua @MUI
        // text: {
        //     primary: red[500],
        // }
    },
    // Custom UI --->
    components: {
        // Custom Scroll bên Windows
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdc3c7',
                        borderRadius: '10px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#95a5a6',
                        borderRadius: '10px'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: '600',
                    textTransform: 'none', // custom button Components
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                })
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.textBlack,
                    '& .MuiTypography-body1': {
                        fontSize: '0.875rem',
                    }
                })
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                    },
                    '& fieldSet' : {
                        borderWidth: '1px !important'
                    }
                }),
            }
        },
    }
}
);

export default theme;