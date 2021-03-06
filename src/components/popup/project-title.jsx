import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import actions from '../../redux/actions';

import {
    Modal,
    Form,
    FormGroup,
    FormControl,
    Button
} from '@sketchpixy/rubix';

class ProjectTitle extends React.Component {

  componentWillMount() {
    // let { dispatch } = this.props;
    // dispatch(actions.resetProject());
  }

  componentWillReceiveProps (nextProps) {
    const { router, dispatch } = this.props;
    const { status, project } = nextProps;
    if (status == "saved") {
      dispatch(actions.setProject(project));
      router.push(`/project/${project.id}`);
    }
  }

  submit(e) {
    e.preventDefault();

    let projectTitle = ReactDOM.findDOMNode(this.projectTitle).value;
    let { dispatch } = this.props;

    dispatch(actions.createProject(projectTitle));
  }

  skip() {
    let {dispatch} = this.props;

    dispatch(actions.createProject('Untitled'));
  }

  render() {
    const { status, statusText } = this.props;

    return (
      <div className="modal-wrapper">
        <div className="modal-content wide hollow">
          <Modal.Header className="text-center">
            <h1>Enter a title for your project.</h1>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>This can be changed later. 45 character limit.</p>
            <hr className="transparent" />

            <Form onSubmit={::this.submit}>
              <FormGroup>
                <FormControl type="text" placeholder="Project Title" ref={(projectTitle) => this.projectTitle = projectTitle} autoFocus />
              </FormGroup>
              <FormGroup>
                <Button lg type='submit' bsStyle='primary' disabled={status == "saving"} className="btn-block">Save</Button>
              </FormGroup>
              <FormGroup className="has-error">
                <span className="help-block" dangerouslySetInnerHTML={{__html: statusText}}></span>
              </FormGroup>
            </Form>

            <hr className="transparent" />
            <p>If this is not entered, it will be saved as ‘Untitled’. <a disabled={status == "saving"} href="javascript:;" onClick={::this.skip}>Skip</a></p>
          </Modal.Body>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statusText: state.project.statusText,
  status: state.project.status,
  project: state.project.project
});

export default connect(mapStateToProps)(ProjectTitle);
