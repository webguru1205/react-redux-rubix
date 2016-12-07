import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import IconSVG from './icons.jsx';
import { parseNotificationMessageHtml } from '../../services/utils';
import actions from '../../redux/actions';

import {
    Dropdown,
    MenuItem,
} from '@sketchpixy/rubix';

class Notification extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = parseNotificationMessageHtml(this.props.notification.html);
    }

    viewNotification() {
        const { dispatch, notification } = this.props;

        if(notification.viewed) {
            return false;
        }
        else {
            dispatch(actions.updateNotification('global', notification, {viewed: true}));
        }
    }

    removeNotification() {
        const { dispatch, notification } = this.props;

        dispatch(actions.removeNotification('global', notification.id));
    }

    detailObject() {
        const { dispatch, router } = this.props;
        const { obj, id } = this.state;

        if(obj == "project") {
            dispatch(actions.resetProject());

            router.push(`/${obj}/${id}`);
        }
    }

    render() {
        const { notification } = this.props;
        const viewedClassName = notification.viewed ? null: "unread";
        const viewed = notification.viewed ?
            <span className="rubix-icon icon-fontello-circle-empty"></span> :
            <span className="rubix-icon icon-fontello-circle"></span>;
        let message = <p>{notification.message}</p>;
        if(this.state.html) {
            message = <p>{this.state.before}<a href="javascript:;" onClick={::this.detailObject}>{this.state.text}</a>{this.state.after}</p>;
        }
        return (
            <MenuItem className={ viewedClassName }>
                <a href="javascript:;" className="btn-close" onClick={::this.removeNotification}><span>×</span></a>
                { message }
                <span className="times">{ moment(notification.modified_date).startOf('minute').fromNow() }</span>
                <a href="javascript:;" className="view-mark" onClick={::this.viewNotification}>{ viewed }</a>
            </MenuItem>
        );
    }
}

class HeaderNotifications extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(actions.getNotifications('global'));
    }

    render() {
        const { notifications } = this.props;
        let unreadCount = 0;

        notifications.forEach(notification => {
            if(!notification.viewed)
                unreadCount++;
        });

        return (
            <Dropdown id="notification-dropdown" pullRight>
                <Dropdown.Toggle>
                    { unreadCount>0 ? <span className="notification-counter">{unreadCount}</span>: null }
                    <IconSVG icon="bell" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    { notifications.map(notification => <Notification key={notification.id} notification={notification} {...this.props} />) }
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
});

export default connect(mapStateToProps)(HeaderNotifications);