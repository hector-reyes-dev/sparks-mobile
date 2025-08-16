export default {
  expo: {
    name: "sparks-mobile",
    slug: "sparks-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "sparksmobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    initialRouteName: "splash", // Configurar splash como pantalla inicial
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/figma/spark-icon.svg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#495BD9",
        },
      ],
    ],
  },
};
