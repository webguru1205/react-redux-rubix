/**
 * Created by jarosanger on 9/15/16.
 */
import { TRACKS_FAILURE, TRACKS_RESET, TRACKS_GET_REQUEST, TRACKS_GET_SUCCESS, TRACKS_SAVE_REQUEST, TRACKS_SAVE_SUCCESS,
    TRACKS_ADD_REQUEST, TRACKS_ADD_SUCCESS, TRACKS_DELETE_REQUEST, TRACKS_DELETE_SUCCESS, TRACKS_UPLOADING_SET } from '../../constants';
import { getArrayIndex } from '../../services/utils';

const initialState = {
    statusText: null,
    status: null,
    tracks: [],
    uploadings: [],
};

function tracks(state = initialState, action) {
    switch(action.type) {
        case TRACKS_FAILURE:
            return Object.assign({}, state, {
                'status': 'failed',
                'statusText': action.payload.statusText
            });
        case TRACKS_RESET:
            return Object.assign({}, initialState);
        case TRACKS_GET_REQUEST:
            return Object.assign({}, state, {
                'status': 'getting',
                'tracks': []
            });
        case TRACKS_GET_SUCCESS:
            return Object.assign({}, state, {
                'status': 'got',
                'tracks': action.payload.tracks
            });
        case TRACKS_ADD_REQUEST:
            return Object.assign({}, state, {
                'status': 'adding',
                'statusText': null,
            });
        case TRACKS_ADD_SUCCESS:
            var tracks = state.tracks.concat([]);
            var uploadings = state.uploadings.concat([]);
            const index = getArrayIndex(action.payload.fileId, uploadings);

            if(action.payload.track) {
                tracks.push(action.payload.track);
            }
            if(index !== -1) {
                uploadings.splice(index, 1);
            }
            return Object.assign({}, state, {
                'status': 'added',
                'statusText': action.payload.statusText,
                'fileId': action.payload.fileId,
                'tracks': tracks,
                'uploadings': uploadings
            });
        case TRACKS_SAVE_REQUEST:
            return Object.assign({}, state, {
                'status': 'saving',
                'statusText': null,
            });
        case TRACKS_SAVE_SUCCESS:
            var index = getArrayIndex(action.payload.track.id, state.tracks);
            var tracks = state.tracks.concat([]);
            if (index === -1)
                tracks.push(action.payload.track);
            else
                tracks[index] = action.payload.track;
            return Object.assign({}, state, {
                'status': 'saved',
                'statusText': action.payload.statusText,
                'tracks': tracks
            });
        case TRACKS_DELETE_REQUEST:
            return Object.assign({}, state, {
                'status': 'deleting',
                'statusText': null,
            });
        case TRACKS_DELETE_SUCCESS:
            var index = getArrayIndex(action.payload.trackId, state.tracks);
            if (index === -1)
                return Object.assign({}, state, {
                    'status': 'deleted',
                    'tracks': [...state.tracks],
                    'removedTrackId': action.payload.trackId
                });
            return Object.assign({}, state, {
                'status': 'deleted',
                'tracks': [...state.tracks.slice(0, index), ...state.tracks.slice(index + 1)],
                'removedTrackId': action.payload.trackId
            });
        case TRACKS_UPLOADING_SET:
            return Object.assign({}, state, {
                'status': 'setUploadings',
                'statusText': null,
                'uploadings': [...action.payload.uploadings],
            });

        default:
            return Object.assign({}, state);
    }
}

module.exports = {
    tracks,
};