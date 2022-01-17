exports.createWyModule = function(div_name, tokenID, global_sessionStorage) {
  const {
    createWyAlgoKernelModule,
  } = require("../../wy_modules/wy_module_ngtsConfig/ngts-config.min.js");
  createWyNGTSConfigModule(div_name, tokenID, global_sessionStorage);
};
