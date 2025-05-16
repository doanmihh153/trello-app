//Theme base -- Global Website
import { createTheme } from "@mui/material/styles";
import { red, teal } from "@mui/material/colors";

const theme = createTheme({
    // Custom Css trong JS ✅
    trello: {
        appBarHeight: '48px',
        boardBarHeight: '58px',
    },
    palette: {
        mode: 'light',
        primary: {
            main: teal[400],
            light: teal[200],    // (tuỳ chọn)
            dark: teal[700],     // (tuỳ chọn)
            contrastText: '#fff', // (tuỳ chọn)
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        // Custom qua @MUI
        text: {
            primary: red[500],
        }
    }
})

export default theme;