import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#e6f2ff" },
          200: { value: "#bfdeff" },
          300: { value: "#99caff" },
          // ...
          950: { value: "#001a33" },
        },
      },
    },
    semanticTokens: {
      colors: {
        app: {
          bg: {
            value: { _light: "#F3F5F9", _dark: "#394762" },
          },
        },
        header: {
          bg: {
            value: { _light: "#4588C6", _dark: "#0B233A" },
          },
          text: {
            value: { _light: "#F3FAFF", _dark: "#C2C7C9" },
          }
        },
        menu: {
          "border_detail": {
            value: { _light: "#6CE898", _dark: "#389AE8" },
          },
          bg: {
            value: { _light: "#4588C6", _dark: "#0B233A" },
          },
          text: {
            value: { _light: "#F3FAFF", _dark: "#C2C7C9" },
          }
        },
        drawer: {
          btn: {
            value: { _light: "#2B6CB0", _dark: "#63B3ED" },
          },
          text: {
            value: { _light: "#5F686E", _dark: "#5F686E" },
          }
        },
        table: {
          header: {
            value: { _light: "#2B6CB0", _dark: "#63B3ED" },
          }
        }
      },
    },
  },
})

export default createSystem(defaultConfig, customConfig)
