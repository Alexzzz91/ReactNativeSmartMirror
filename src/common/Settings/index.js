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

  return () => {
    newComponents.asyncComponents = {};
    newComponents.replaceComponents = replaceComponents;

    return newComponents;
  };
};

const injectComponent = (injComponents = {}, { key, component }) => {
  // if (Object.hasOwnProperty.call(components.asyncComponents, key)) return;

  // eslint-disable-next-line no-param-reassign
  injComponents.asyncComponents[key] = component;
  return injComponents.replaceComponents(createComponents(injComponents.asyncComponents));
};

const SettingsComponents = getComponents()();

export {
  SettingsComponents,
  injectComponent,
};
