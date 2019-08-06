const createReducer = (initialState, transducer, namespace) => {
    const actions = {};
    const reducerMap = {};

    for (const key in transducer) {
        if (!transducer.hasOwnProperty(key)) {
            return;
        }

        const type = namespace + '/' + key;

        actions[key] = (payload) => {
            const action = {type};

            if (payload) {
                action.payload = payload;
            }

            return action;
        };

        actions[key].toString = () => type;

        reducerMap[type] = transducer[key];
    }

    const reducer = (state = initialState, action) => {
        if (typeof reducerMap[action.type] !== 'function') {
            return state;
        }
        return reducerMap[action.type](state, action.payload);
    };

    return {actions, reducer};
};

export { createReducer };
