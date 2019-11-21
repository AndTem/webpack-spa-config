import { CreateMainConfig } from 'src/types/config';

import { connectConfigs } from 'src/utils/config';

import { createCommonConfig } from 'src/configs/common';

import { DEVELOPMENT_MODE } from 'src/constants/mode';

// const devPlugins = require('./plugins');

const createDevConfig: CreateMainConfig = (
  basicParams,
  { addToAllConfigs, addToDevConfig }
) => {
  const additionalConfig = connectConfigs(
    addToAllConfigs({ mode: DEVELOPMENT_MODE }),
    addToDevConfig({ mode: DEVELOPMENT_MODE })
  );

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode: DEVELOPMENT_MODE }),
    // { plugins: devPlugins() },
    additionalConfig
  );
};

module.exports = { createDevConfig };

// module.exports = (basicParams: BasicParams,  additionalOptions) => {
//   const { outputPath } = commonConfigParams;
//   const { plugins } = additionalOptions;
//
//   return merge.smart(
//     commonConfig({ ...commonConfigParams, mode: DEVELOPMENT_MODE }),
//     {
//       ...merge(
//         {
//           mode: DEVELOPMENT_MODE,
//           devtool: 'eval-source-map',
//           devServer: {
//             contentBase: outputPath,
//             open: true,
//             hot: true,
//             host: '0.0.0.0',
//             useLocalIp: true,
//             historyApiFallback: true
//           }
//         },
//         additionalOptions
//       ),
//       plugins: mergePlugins(devPlugins(commonConfigParams), plugins)
//     }
//   );
// };
