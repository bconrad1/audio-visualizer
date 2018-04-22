import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Play from 'react-icons/lib/fa/play-circle';
import Pause from 'react-icons/lib/fa/pause-circle';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

class HeaderPlayBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsFormatted: this.formatSeconds(this.props.played)
    };
  }

  componentWillReceiveProps() {
    this.setState({
      secondsFormatted: this.formatSeconds(this.props.played)
    });
  }

  formatSeconds = (durationIn) => {
    let sec = Math.ceil(durationIn);
    let minutes = Math.floor(sec / 60);
    let seconds = sec - (minutes * 60);

    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return minutes + ':' + seconds;
  };

  render() {
    return (
        <div className={'header-container'}>
          <div className={'header-play-bar'}>
            {this.props.playing ? <Pause onClick={this.props.onPlayPause}
                                         className={'play-btn'}/> : <Play
                onClick={this.props.onPlayPause} className={'play-btn'}/>}
            <div className={'seconds-container'}>
              <div
                  className={'seconds-text'}>{this.state.secondsFormatted}</div>
            </div>
          </div>
        </div>

    );
  }
}

HeaderPlayBar.propTypes = {
  onPlayPause: PropTypes.func,
  played: PropTypes.number,
  playing: PropTypes.bool

};

export default HeaderPlayBar;