const components = {};

const replaceComponents = newComponents => ({
  ...components,
  ...newComponents,
});

const createComponents = (asyncComponents = {}) => ({
  ...components,
  ...asyncComponents,
});

const getComponents = () => {
  const newComponents = createComponents(components);

  newComponents.asyncComponents = {};
  newComponents.replaceComponents = replaceComponents;

  return newComponents;
};

const injectComponent = (injComponents = {}, { key, component }) => {
  if (!injComponents.asyncComponents || injComponents.asyncComponents[key]) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  injComponents.asyncComponents[key] = component;
  // eslint-disable-next-line consistent-return
  return injComponents.replaceComponents(createComponents(injComponents.asyncComponents));
};

const SettingsComponents = getComponents();

export {
  SettingsComponents,
  injectComponent,
};
