/**
 * Created by jarosanger on 8/15/16.
 */
import { SETTINGS_FAILURE, SET_AVATAR, SETTINGS_GET_REQUEST, SETTINGS_GET_SUCCESS, SETTINGS_SAVE_REQUEST, SETTINGS_SAVE_SUCCESS } from '../../constants';

const initialState = {
    isSaved: false,
    isSaving: false,
    cmdType: null,
    status: null,
    statusText: null,
    fullName: null,
    language: null,
    email: null,
    mugshot: null,
};

function profile(state = initialState, action) {
    switch(action.type) {
        case SETTINGS_FAILURE:
            return Object.assign({}, state, {
                'status': 'failed',
                'cmdType': action.payload.cmdType,
                'statusText': action.payload.statusText
            });

        case SETTINGS_GET_REQUEST:
            return Object.assign({}, state, {
                'status': 'getting',
                'statusText': null
            });

        case SETTINGS_GET_SUCCESS:
            let returnState = Object.assign({}, state, {
                'status': 'got',
                'cmdType': action.payload.cmdType,
                'statusText': action.payload.data.statusText
            });

            if(action.payload.data.full_name)
                returnState.fullName = action.payload.data.full_name;
            if(action.payload.data.language)
                returnState.language = action.payload.data.language;
            if(action.payload.data.email)
                returnState.email = action.payload.data.email;
            if(action.payload.data.mugshot)
                returnState.mugshot = action.payload.data.mugshot;

            return returnState;

        case SETTINGS_SAVE_REQUEST:
            return Object.assign({}, state, {
                'status': 'saving',
                'statusText': null
            });

        case SETTINGS_SAVE_SUCCESS:
            let returnState2 = Object.assign({}, state, {
                'status': 'saved',
                'cmdType': action.payload.cmdType,
                'statusText': action.payload.data.statusText
            });

            if(action.payload.data.full_name)
                returnState2.fullName = action.payload.data.full_name;
            if(action.payload.data.language)
                returnState2.language = action.payload.data.language;
            if(action.payload.data.email)
                returnState2.email = action.payload.data.email;

            return returnState2;

        case SET_AVATAR:
            return Object.assign({}, state, {
                mugshot: action.payload.mugshot
            });

        default:
            return Object.assign({}, state);
    }
}

module.exports = {
    profile,
};