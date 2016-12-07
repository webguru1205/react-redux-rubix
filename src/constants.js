/**
 * Created by jarosanger on 8/15/16.
 */
import { createConstants } from './services/utils';

const constants = createConstants(
    'RESET_USER_AUTH',
    'LOGOUT_USER',
    'SET_USER_AUTH',
    'GET_USER',
    'USER_FAIL',
    'SET_AVATAR',

    'START_LOADING',
    'END_LOADING',

    'LOGIN_USER_REQUEST',
    'LOGIN_USER_FAILURE',
    'LOGIN_USER_SUCCESS',

    'SIGNUP_USER_REQUEST',
    'SIGNUP_USER_FAILURE',
    'SIGNUP_USER_SUCCESS',

    'FORGOT_PASSWORD_SENT',
    'FORGOT_PASSWORD_REQUEST',
    'FORGOT_PASSWORD_FAILURE',

    'RESET_PASSWORD_REQUEST',
    'RESET_PASSWORD_FAILURE',
    'RESET_PASSWORD_SUCCESS',

    'SETTINGS_FAILURE',
    'SETTINGS_GET_REQUEST',
    'SETTINGS_GET_SUCCESS',
    'SETTINGS_SAVE_REQUEST',
    'SETTINGS_SAVE_SUCCESS',

    'PROVIDERS_FAILURE',
    'PROVIDERS_GET_REQUEST',
    'PROVIDERS_GET_SUCCESS',
    'PROVIDERS_CONNECT_REQUEST',
    'PROVIDERS_CONNECT_SUCCESS',
    'CONNECTS_ADD_REQUEST',
    'CONNECTS_ADD_SUCCESS',
    'CONNECTS_GET_REQUEST',
    'CONNECTS_GET_SUCCESS',
    'CONNECTS_SAVE_REQUEST',
    'CONNECTS_SAVE_SUCCESS',
    'CONNECTS_DELETE_REQUEST',
    'CONNECTS_DELETE_SUCCESS',

    'VIDEOS_FAILURE',
    'GET_VIDEOS_REQUEST',
    'ALL_VIDEOS',
    'VIDEOS_REMOVE',

    'PROJECT_FAILURE',
    'PROJECT_RESET',
    'PROJECT_SAVE_REQUEST',
    'PROJECT_SAVE_SUCCESS',
    'PROJECT_GET_REQUEST',
    'PROJECT_GET_SUCCESS',
    'PROJECT_DELETE_REQUEST',
    'PROJECT_DELETE_SUCCESS',
    'PROJECT_SET_SUCCESS',

    'ARTWORK_FAILURE',
    'ARTWORK_RESET',
    'ARTWORK_RESET_SETTING',
    'ARTWORK_SAVE_REQUEST',
    'ARTWORK_SAVE_SUCCESS',
    'ARTWORK_DELETE_REQUEST',
    'ARTWORK_DELETE_SUCCESS',
    'ARTWORK_GET_REQUEST',
    'ARTWORK_GET_SUCCESS',
    'ARTWORK_SET_SUCCESS',
    'ARTWORK_TEMPLATE_GET_REQUEST',
    'ARTWORK_TEMPLATE_GET_SUCCESS',

    'TRACKS_FAILURE',
    'TRACKS_RESET',
    'TRACKS_GET_REQUEST',
    'TRACKS_GET_SUCCESS',
    'TRACKS_SAVE_REQUEST',
    'TRACKS_SAVE_SUCCESS',
    'TRACKS_ADD_REQUEST',
    'TRACKS_ADD_SUCCESS',
    'TRACKS_DELETE_REQUEST',
    'TRACKS_DELETE_SUCCESS',
    'TRACKS_UPLOADING_SET',

    'BUILD_FAILURE',
    'BUILD_RESET',
    'BUILD_CHECK_REQUEST',
    'BUILD_CHECK_SUCCESS',
    'BUILD_PROJECT_REQUEST',
    'BUILD_TRACK_REQUEST',
    'BUILD_TRACK_SUCCESS',
    'BUILD_GET_REQUEST',
    'BUILD_GET_SUCCESS',
    'BUILD_TRACK_REMOVE',
    'BUILD_DELETE_REQUEST',
    'BUILD_DELETE_SUCCESS',

    'NOTIFICATIONS_FAILURE',
    'NOTIFICATIONS_GET_REQUEST',
    'NOTIFICATIONS_GET_SUCCESS',
    'NOTIFICATIONS_SAVE_REQUEST',
    'NOTIFICATIONS_SAVE_SUCCESS',
    'NOTIFICATIONS_DELETE_REQUEST',
    'NOTIFICATIONS_DELETE_SUCCESS',
);

const configs = {
    SERVER_URL: 'http://localhost:8080/',
    BASE_API_URL: 'http://localhost:8000/api/v1/',
    VIDEO_PAGE_LIMIT: 8,

    // AWS_BUCKET: "mp3-video",
    // FILEPICKER_KEY: "8RUKJhe0FwIGfzA3wr3EiC",

    // SC_CLIENT_ID: '00000000XXXXXXXX0000000',
    // SC_CLIENT_SECRET: '00000000XXXXXXXX0000000',
    // SC_REDIRECT_URI: 'http://ec2-54-205-101-21.compute-1.amazonaws.com/soundcloud/login',

    // FACEBOOK_APPID: "100000044977653",
    // FACEBOOK_API_SECRET: '5d78b4850c75d78b4850c75d78b4850c7',
    
    // TWITTER_CONSUMER_KEY: 'w43xofHCr0pQuXgw43xofHCr0pQuXg',
    // TWITTER_CONSUMER_SECRET: '6kQix87AMF285t2ztFerp77ukQix87AMF285t2ztFer',

    // YOUTUBE_APP_ID: '338633863386-3386c412a5vjn705thp7v55p6pj8gtt1.apps.googleusercontent.com',
    // YOUTUBE_APP_SECRET: 'KDVS3333Tm4KY4-FonJHF5J-',
};

module.exports = Object.assign({}, constants, configs);