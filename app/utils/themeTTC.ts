import { MantineThemeOverride } from "@mantine/core";

const themeTTC: MantineThemeOverride = {
   colors: {
        brand: ['#FFE5E5', '#FFB8B8', '#FF8A8A', '#FF5C5C', '#FF2E2E', '#FF0000', '#CC0000', '#990000', '#660000','#330000' ],
    },
  colorScheme: "light",
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 7 } 
};

export default themeTTC;