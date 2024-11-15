// import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// import { createSystem, defineConfig } from "@chakra-ui/react"

// const config = defineConfig({
//   theme: {
//     breakpoints: {
//       sm: "320px",
//       md: "768px",
//       lg: "960px",
//       xl: "1200px",
//     },
//     tokens: {
//       colors: {
//         error: {value: 'red.500'},
//         alert: {value: 'orange.600'},
//         btn_blue: {value: '#3EA8FE'},
//         status: {
//           sold: { value: '#B8FCC9'},
//           available: { value: '#FBF5A7'},
//           returned: { value: '#E9E9E9'},
//         },
//         login: {
//           bg: { value: "#13121B"},
//           content: { value: "#1F1B2C"},
//           text: { value: "#9B98CA"},
//           input_text: { value: "#c0f1f2"}
//         },
//         teste: { value: "#1A1A1E"},
//       }
//     },
//     semanticTokens: {
//       colors: {
//         app_bg: {
//           default: { value: '#F3F5F9' },
//           _dark: { value: '#394762' }
//         },
//         text: {
//           default: { value: '#F3FAFF'},
//           _dark: { value: '#C2C7C9'},
//         },
//         menu_detail: {
//           default: { value: '#6CE898'},
//           _dark: { value: '#389AE8'},
//         },
//         header: {
//           bg: {
//             default: { value: '#4588C6'},
//             _dark: { value: '#0b233a'},
//           },
//           text: {
//             default: { value: '#DAF1FF'},
//             _dark: { value: '#'},
//           }
//         },
//         content: {
//           header: {
//             default: { value: '#EBF3FF'},
//             _dark: { value: '#354465'},
//           },
//           text: {
//             default: { value: '#5f686e'},
//             _dark: { value: '#'},
//           }
//         },
//         input: {
//           bg: {
//             default: { value: '#F1F1F1'},
//             _dark: { value: '#354465'},
//           },
//           text: {
//             default: { value: '#5f686e'},
//             _dark: { value: '#5f686e'},
//           }
//         },
//         table: {
//           header: {
//             default: { value: '#F1F1F1'},
//             _dark: { value: '#354470'}
//           },
//           body: {
//             default: { value: '#F3F5F9'},
//             _dark: { value: '#394762'}
//           },
//         },
//         drawer: {
//           bg: {
//             default: { value: "#f2f2f2"},
//             _dark: { value: "#111111"}
//           },
//           content: {
//             default: { value: "white"},
//             _dark: { value: "#131415"}
//           },
//           text: {
//             default: { value: "input.text"},
//             _dark: { value: "input.text"}
//           }
//         },
//       },
//     },
//     keyframes: {
//       spin: {
//         from: { transform: "rotate(0deg)" },
//         to: { transform: "rotate(360deg)" },
//       },
//     },
//   }
// })

// const system = createSystem(config);

// export default system;

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
