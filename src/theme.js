//Theme base -- Global Website
import { createTheme } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

const theme = createTheme({
    // Custom Css trong JS ✅
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '58px',
    },
    palette: {
        // mode: 'light',
        primary: {
            main: teal[400],
            light: teal[200], // (tuỳ chọn)
            dark: teal[700], // (tuỳ chọn)
            contrastText: '#fff', // (tuỳ chọn)
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
                        with: '8px',
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
        }
    }
}
);

export default theme;