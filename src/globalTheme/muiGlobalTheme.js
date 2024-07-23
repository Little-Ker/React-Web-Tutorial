import { createTheme } from '@mui/material/styles'
import vars from './variables.module.sass'

const globalTheme = createTheme({
  typography: {
    fontFamily: [
      '微軟正黑體',
      'Tahoma',
      'Arial',
    ].join(','),
    fontSize: 14,
    h1: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      margin: '2rem 0 3rem 0',
      color: vars.cContrastText,
    },
  },
  palette: {
    primary: {
      main: vars.cPrimary,
    },
    secondary: {
      main: vars.cSecondary,
    },
    error: {
      main: vars.cError,
    },
    warning: {
      main: vars.cWarning,
    },
    info: {
      main: vars.cInfo,
    },
    success: {
      main: vars.cSuccess,
    },
    disabled: {
      main: vars.cDisabled,
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          background: vars.cCardBackground,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px',
          borderRadius: '.75rem',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '1rem 1rem 0.5rem 1rem',
          alignItems: 'flex-start',
        },
        title: {
          fontSize: '1rem',
          fontWeight: 'bold',
          color: vars.cPrimary,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem 1rem 1rem',
          justifyContent: 'flex-end',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: vars.cContrastText,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          background: '#FFF',
        },
      },
    },
    MenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: `rgba(${vars.$cSecondary}, 0.2)`,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '0rem',
          marginBottom: '.5rem',
          '&.Mui-expanded': {
            margin: '0rem !important',
            marginBottom: '.5rem !important',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          background: vars.cSecondary,
          borderRadius: '4px 4px 0 0',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderRadius: '0 0 4px 4px',
        },
      },
    },
  },
})

export default globalTheme
