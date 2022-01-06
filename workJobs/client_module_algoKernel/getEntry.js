const fs = require("fs");
const path = require("path");

const writeEntry = (dirPath) => {
  var entryFileContent = `
    exports.createWyModule = function(div_name, tokenID, global_sessionStorage) {
        const{createWyAlgoKernelModule}   = require('../../wy_modules/wy_module_algoKernel/algo-kernel.min.js')
        createWyAlgoKernelModule(div_name, tokenID, global_sessionStorage)
    }
`;
  fs.writeFileSync(path.resolve(dirPath, "./index.js"), entryFileContent);
};

writeEntry("./dist");
