const reducers = (
    state = {
        allUsers: [],
        userById: [],
    },
    action,
) => {
    switch (action.type) {
        case 'GET_ALL_USERS': {
            return {
                ...state,
                allUsers: action.payload,
            };
        }
        case 'GET_USER_BY_ID': {
            return {
                ...state,
                userById: action.payload,
            };
        }
    }
    return state;
};

export default reducers;