const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        // какие версии браузеров поддерживать
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
        esmodules: true,
      },
      // использование полифилов
      useBuiltIns: "entry",
    },
  ],
];

module.exports = { presets };
