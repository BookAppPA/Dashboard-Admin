const reducers = (
    state = {
        isFetching: true,
        allUsers: [],
        allBookSellers: [],
        userById: [],
        listCommentsByUser: [],
        listCommentsByBookId: [],
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
        case 'RESET_COMMENTS_LIST': {
            return {
                ...state,
                listCommentsByBookId: [],
            }
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
            console.log('action.payload', action.payload)
            return {
                ...state,
                listCommentsByUser: action.payload
            }
        }
        case 'GET_COMMENTS_BY_BOOK_ID': {
            const array = action.payload;
            const previous = [...state.listCommentsByBookId];
            var newArray = previous.concat(array);
            var unique = [...new Set(newArray)];
            var filter = unique.filter(value => Object.keys(value).length !== 0);

            return {
                ...state,
                listCommentsByBookId: filter,
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