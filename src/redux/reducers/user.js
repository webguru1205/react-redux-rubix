/**
 * Created by jarosanger on 8/15/16.
 */
import { USER_FAIL, GET_USER } from '../../constants';

const initialState = {
    userId: null,
    email: null,
};

function user(state = initialState, action) {
    switch(action.type) {
        case USER_FAIL:
            return Object.assign({}, initialState);
        case GET_USER:
            return Object.assign({}, state, {
                'userId': action.payload.data.id,
                'email': action.payload.data.email,
            });
        default:
            return Object.assign({}, state);
    }
}

module.exports = {
    user,
};