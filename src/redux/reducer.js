const reducers = (
    state = {
        isFetching: true,
        allUsers: [],
        allBookSellers: [],
        userById: [],
        listCommentsByUser: [],
        userListBooks: [],
        sellerBookList: [],
    },
    action,
) => {
    switch (action.type) {
        case 'SET_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.payload,
            };
        }
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
        case 'GET_COMMENTS_BY_USER': {
            return {
                ...state,
                listCommentsByUser: [...action.payload],
            }
        }
        case 'GET_USER_LIST_BOOKS': {
            return {
                ...state,
                userListBooks: action.payload,
            }
        }
        case 'GET_ALL_BOOKSELLERS': {
            return {
                ...state,
                allBookSellers: action.payload,
            }
        }
        case 'GET_SELLER_LIST': {
            return {
                ...state,
                sellerBookList: action.payload,
            }
        }
    }
    return state;
};

export default reducers;