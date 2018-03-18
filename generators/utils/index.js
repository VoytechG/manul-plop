const fs = require('fs');
const nodePath = require('path');

module.exports = plop => {
  const relative = (baseFile, file) => {
    const baseDir = nodePath.dirname(baseFile);
    const fileDir = nodePath.dirname(file);
    // nodePath.relative does not append "./" if its in same directory
    if (baseDir === fileDir) {
      return `./${nodePath.basename(file)}`;
    }
    return nodePath.relative(baseDir, file);
  };

  const insertIf = (condition, ...elements) => (condition ? elements : []);

  const makeDestPath = p => nodePath.resolve(plop.getDestBasePath(), p);
  const exists = (data, pathTemlate) => {
    const fileDestPath = makeDestPath(
      plop.renderString(pathTemlate || '', data)
    );
    return fs.existsSync(fileDestPath);
  };

  const makeAppendImportsAction = ({ nameKey, path, fileToImport, data }) => ({
    type: 'append',
    data,
    path,
    pattern: /\/\* 📌 IMPORTS \*\//gi,
    template: `import {{camelCase ${nameKey}}} from '${relative(
      path,
      fileToImport
    )}'`
  });

  const makeAppendSymbolsAction = ({ nameKey, path, data }) => ({
    type: 'append',
    data,
    path,
    pattern: /\/\* 📌 SYMBOLS \*\//g,
    template: `  {{camelCase ${nameKey}}},`
  });

  return {
    makeAppendImportsAction,
    makeAppendSymbolsAction,
    insertIf,
    exists,
    relative
  };
};
