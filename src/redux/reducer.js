const reducers = (
    state = {
        isFetching: true,
        allUsers: [],
        allBookSellers: [],
        userById: [],
        listCommentsByUser: [],
        listCommentsByBookId: [],
        oneBookComments: [],
        userListBooks: [],
        sellerBookList: [],
        allBooksInApp: [],
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
            return {
                ...state,
                listCommentsByUser: action.payload
            }
        }
        case 'GET_COMMENTS_BY_BOOK_ID': {
            const res = action.payload;
            const previous = [...state.listCommentsByBookId];
            var newArray = previous.concat(res);
            newArray = [...new Set([...previous, {...res}])];
            const filter = previous.filter(val => !newArray.includes(val));
            return {
                ...state,
                listCommentsByBookId: newArray,
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
        case 'GET_ALL_BOOKS_IN_APP': {
            return {
                ...state,
                allBooksInApp: action.payload,
            }
        }
        case 'GET_ONE_BOOK_COMMENTS': {
            return {
                ...state,
                oneBookComments: action.payload
            }
        }
    }
    return state;
};

export default reducers;