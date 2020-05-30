const CracoLessPlugin = require('craco-less');

// lessLoaderOptions in the following config will work only with less-loader v 5.0.0 package
// less-loader v6.0+ needs different config. replace lessLoaderOptions with lessOptions 
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { '@primary-color': '#1DA57A' },
          javascriptEnabled: true,
        },
      },
    },
  ],
};