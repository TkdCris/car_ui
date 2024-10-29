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
      app_bg: {
        default: '#F3F5F9',
        _dark: '#394762'
      },
      text: {
        default: '#F3FAFF',
        _dark: '#C2C7C9',
      },
      menu_detail: {
        default: '#6CE898',
        _dark: '#389AE8',
      },
      status: {
        sold: '#B8FCC9',
        available: '#FBF5A7',
        returned: '#E9E9E9',
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
          default: '#EBF3FF',
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
      },
      login: {
        bg: "#13121B",
        content: "#1F1B2C",
        text: "#9B98CA",
        input_text: "#c0f1f2"
      },
      table: {
        header: {
          default: '#F1F1F1',
          _dark: '#354470'
        },
        body: {
          default: '#F3F5F9',
          _dark: '#394762'
        },
      },
      teste: "#181818",
      drawer: {
        bg: {
          default: "#EBF3FF",
          _dark: ""
        }
      }
    },
  },
});

export default theme;
