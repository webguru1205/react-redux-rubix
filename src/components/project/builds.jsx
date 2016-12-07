import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogLifecycle from 'react-log-lifecycle'

import actions from '../../redux/actions';

import {
  Row,
  Button,
  Col,
  Alert,
  DropdownButton,
  MenuItem,
} from '@sketchpixy/rubix';

import ProjectHeader from './project-header.jsx';
import ProjectAlert from './project-alert.jsx';

const flags = {
  // If logType is set to keys then the props of the object being logged
  // will be written out instead of the whole object. Remove logType or
  // set it to anything except keys to have the full object logged.
  logType: 'keys',
  // A list of the param "types" to be logged.
  // The example below has all the types.
  names: ['props', 'nextProps', 'nextState', 'prevProps', 'prevState']
};

class BuildOrder extends React.Component {

  removeBuild() {
    if(confirm("Are you sure you want to delete this video build job?")) {
      const { build, projectId, dispatch } = this.props;
      dispatch(actions.removeBuild(projectId, build.id));
    }
  }

  render() {
    const { build, track, artwork, status, dispatch } = this.props;
    const thumbnail = artwork && artwork.thumbnail? <img src={artwork.thumbnail} /> : <img src="/imgs/blank.gif" />;

    let title = '---- ----';
    let artist = '----';
    let duration = '00:00';

    if(track) {
      const metadata = JSON.parse(track.metadata).length ? JSON.parse(track.metadata)[0]: {};
      duration = metadata.duration? metadata.duration: '00:00';
      title = metadata.title? metadata.title: '---- ----';
      artist = metadata.artist? metadata.artist: '----';
    }

    return (
      <Row>
        <Col sm={12}><hr className="mt3 mb3 separator" /></Col>
        <Col sm={6} className="artwork">
          <Row>
            <Col md={5}>
              <div className="preview">
                { thumbnail }
                <span className="duration">{duration}</span>
              </div>
            </Col>
            <Col md={7}>
              <span className="track-title">{title}</span>
              <span className="artist">{artist}</span>
              <span className="property"><b>Resolution: </b>{build.size}</span>
              <span className="property"><b>File Size: </b>{build.file_size}</span>
            </Col>
          </Row>
        </Col>
        <Col sm={2} className="text-capitalize text-center"><span>{ build.status }</span></Col>
        <Col sm={4} className="actions text-center">
          {build.status == 'complete'? <a href="javascript:;" >Play</a>: <span>Play</span>}&nbsp;&nbsp;&nbsp;
          {build.status == 'complete'? <a href="javascript:;" >Download</a>: <span>Download</span>}&nbsp;&nbsp;&nbsp;
          {build.status == 'complete'? <a href="javascript:;" >Publish</a>: <span>Publish</span>}&nbsp;&nbsp;&nbsp;
          <a href="javascript:;" onClick={::this.removeBuild}>Delete</a>
        </Col>
      </Row>
    );
  }
}

class ProjectBuilds extends LogLifecycle {
  constructor(...args) {
    super(...args, flags);

    const projectId = this.props.params.projectId ? this.props.params.projectId : null;
    const filters = ['All', 'Pending', 'Queued', 'Processing', 'Building', 'Complete', 'Failed'];
    this.state = { projectId: projectId, selectedFilter: 'all', filters: filters, loading: true };
  }

  componentWillMount() {
    const { dispatch, project, status } = this.props;

    if(this.state.projectId && (!project || this.state.projectId != project.id)) {
      dispatch(actions.getProject(this.state.projectId));
    }

    if(this.state.projectId) {
      dispatch(actions.getBuilds(this.state.projectId));
      dispatch(actions.getArtworks(this.state.projectId));
      dispatch(actions.getTracks(this.state.projectId));
    }
  }

  componentWillReceiveProps (nextProps) {
    const { project, removedBuildId, status, loading } = nextProps;
    if (project) {
      this.setState({ projectId: project.id });
    }
  }

  getArtwork(id) {
    const { artworks } = this.props;
    let obj = null;

    artworks.forEach(function(artwork) {
      if(artwork.id == id)
        obj = artwork;
    });

    return obj;
  }

  getTrack(id) {
    console.log("getting the track");
    const { tracks } = this.props;
    let obj = null;

    tracks.forEach(function(track) {
      if(track.id == id)
        obj = track;
    });

    return obj;
  }

  changeFilter(e) {
    this.setState({ selectedFilter: e.target.value});
  }

  render() {
    const { status, statusText, builds, router, dispatch, loading } = this.props;
    const { selectedFilter, filters, projectId } = this.state;
    let alert = null;
    let isLoading = true;

    if(status == 'deleting') {
      alert = <Alert info>Deleting, please wait...</Alert>;
    } else if (status == 'getting') {
      isLoading = true;
    } else if (status == 'got') {
      isLoading = false;
    }

    return (
      <div id='body' className="project-body builds">
        <ProjectHeader router={ router } />

        <div className="body-sidebar__container">
          <div className="container__with-scroll">

            <Row>
              <Col sm={6}>
                <h3 className="mt0">Video Builds</h3>
              </Col>
              <Col sm={6} className="mt2 text-right">
                <span className="mr2">Show: </span>
                <select bsSize="sm" className="status-filter" onChange={::this.changeFilter}>
                  { filters.map((filter, i) => { return <option key={i} value={filter.toLowerCase()}>{filter}</option> }) }
                </select>
              </Col>
            </Row>

            <hr className="mt0 separator" />

            <div id="alert-box">
              { alert }
            </div>

            {(() => {
                if (isLoading) {
                  return <Row>
                    <Col sm={12} className="text-center"><div className="loading"></div></Col>
                  </Row>
                } else {
                  if (builds.length) {
                    return <Row>
                      <Col sm={6} className="cell-header">Job</Col>
                      <Col sm={2} className="cell-header text-center">Status</Col>
                      <Col sm={4} className="cell-header text-center">Actions</Col>
                    </Row>
                  } else {
                    return <Row>
                      <Col sm={12} className="text-center text-danger zero-res">No video builds were found.</Col>
                    </Row>
                  }
                }
              })(this)
            }

            {((thisInstance) => {
              if(!isLoading) {
                return builds.map((build, i) => {
                  if(selectedFilter == 'all' || selectedFilter == build.status) {
                    const artwork = thisInstance.getArtwork(build.artwork);
                    const track = thisInstance.getTrack(build.track);
                    return <BuildOrder key={build.id} build={build} projectId={projectId} artwork={artwork} track={track} dispatch={dispatch} />
                  }
                  else
                    return null;
                });
              }
            })(this)}
          </div>

          <div className="body-sidebar__element pr5-imp pl5-imp">
            <h4 className="header">Helpful Tips</h4>
            <p>Here are some helpful tips to help you after your videos are ready.</p>
            <ul className="list-unstyled">
              <li><span className="color-primary">Publishing to YouTube</span></li>
              <li><span className="color-primary">Posting to Facebook</span></li>
              <li><span className="color-primary">How to Release on Twitter</span></li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.build.status,
  statusText: state.build.statusText,
  project: state.project.project,
  builds: state.build.builds,
  loading: state.loading,
  tracks: state.tracks.tracks,
  artworks: state.artwork.artworks
});

export default connect(mapStateToProps)(ProjectBuilds);
