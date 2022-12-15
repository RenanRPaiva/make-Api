export const generateResource = (
  model: object,
  hideElements: object | null = null,
  actions: object | null = null
) => {
  return {
    resource: model,
    options: {
      properties: {
        ...hideElements,
        createdAt: {
          isVisible: {
            list: true,
            edit: false,
            create: false,
            show: true,
          },
        },
        updatedAt: {
          isVisible: {
            list: true,
            edit: false,
            create: false,
            show: true,
          },
        },
      },
      actions: actions
    },
  };
};


