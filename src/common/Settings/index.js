const components = {};

const replaceComponents = (newComponents) => {
  return{
    ...components,
    ...newComponents
  }
};

const createComponents = (asyncComponents = {}) => ({
  ...components,
  ...asyncComponents
});

const getComponents = () => {
  const components = createComponents(components);
  console.log('components123123', components);

  return (asyncComponents = {}) => {
    components.asyncComponents = {};
    components.replaceComponents = replaceComponents;

    console.log('components 123123', components);
    return components;
  }
};

const injectComponent = (components, { key, component }) => {
  console.log('components', components);
  // if (Object.hasOwnProperty.call(components.asyncComponents, key)) return;

  components.asyncComponents[key] = component;
  return components.replaceComponents(createComponents(components.asyncComponents));
};

const SettingsComponents = getComponents()();

export {
  SettingsComponents,
  injectComponent,
};
