exports.createWyModule = function(div_name, tokenID, global_sessionStorage) {
  const {
    createWyAlgoKernelModule,
  } = require("../../wy_modules/wy_module_algoKernel/algo-kernel.min.js");
  createWyAlgoKernelModule(div_name, tokenID, global_sessionStorage);
};
