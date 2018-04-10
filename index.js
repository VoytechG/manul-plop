const defaultConfig = {
  basePath: './src',
  modulesPath: 'ui',
  reduxRootPath: 'redux',
  templatePath: 'plopTemplates',
  componentStorybook: true,
  componentTests: true,
  containerStorybook: true,
  containerTests: true,
}

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig,
  }

  require('./generators')(plop, config)

  return plop
}
