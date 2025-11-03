// karma.conf.js
module.exports = function (config) {
  config.set({
    // 🔹 Framework principal
    frameworks: ["jasmine"],

    // 🔹 Archivos de prueba
    files: ["src/**/*.spec.js"],

    // 🔹 Preprocesamiento
    preprocessors: {
      "src/**/*.spec.js": ["webpack", "sourcemap"],
      "src/**/*!(.spec).js": ["coverage"], // ✅ Instrumenta el código fuente (excepto los .spec)
    },

    // 🔹 Configuración de Webpack + Babel
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      resolve: { extensions: [".js", ".jsx"] },
      devtool: "inline-source-map",
    },

    // 🔹 Reportes de progreso + cobertura
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "." },
        { type: "text-summary" },
      ],
      includeAllSources: true,
    },

    // 🔹 Navegador
    browsers: ["ChromeHeadless"],

    // 🔹 Plugins
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-webpack",
      "karma-sourcemap-loader",
      "karma-coverage",
    ],

    singleRun: true,
    logLevel: config.LOG_INFO,
  });
};
