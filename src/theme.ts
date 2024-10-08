import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      error: 'red.500',
      alert: 'orange.600',
      btn_blue: '#3EA8FE',
      green_detail: '#6CE898',
      status: {
        sold: '#B8FCC9',
        available: '#FBF5A7',
        returned: '#E9E9E9',
      },
      menu: {
        text: {
          default: '#F3FAFF',
          _dark: '',
        },
      },
      table: {
        bg: {
          default: '#F1F1F1',
          _dark: '#354465',
        },
        text: {
          default: '#5f686e',
          _dark: '#',
        }
      },
      app_bg: {
        default: '#F3F5F9',
        _dark: '#394762'
      },
      header: {
        bg: {
          default: '#4588C6',
          _dark: '#0b233a',
        },
        text: {
          default: '#DAF1FF',
          _dark: '#',
        }
      },
      content: {
        header: {
          default: '#EBF5FF',
          _dark: '#354465',
        },
        text: {
          default: '#5f686e',
          _dark: '#',
        }
      },
      input: {
        bg: {
          default: '#F1F1F1',
          _dark: '#354465',
        },
        text: {
          default: '#5f686e',
          _dark: '#5f686e',
        }
      }
    },
  },
});

export default theme;
