module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // env: {
    //   development: {
    //     plugins: ["transform-react-jsx-source"],
    //   },
    // },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            assets: "./assets",
            app: "./src",
          },
        },
      ],
    ],
  };
};
