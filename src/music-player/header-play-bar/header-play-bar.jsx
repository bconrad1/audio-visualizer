import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Play from 'react-icons/lib/fa/play-circle';
import Pause from 'react-icons/lib/fa/pause-circle';
import Circle from 'react-icons/lib/fa/circle-thin';
import Bars from 'react-icons/lib/fa/bars';

class HeaderPlayBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsFormatted: this.formatSeconds(this.props.playedSeconds)
    };
  }

  componentWillReceiveProps() {
    this.setState({
      secondsFormatted: this.formatSeconds(this.props.playedSeconds)
    });
  }

  formatSeconds = (durationIn) => {
    if (durationIn) {
      let sec = Math.ceil(durationIn);
      let minutes = Math.floor(sec / 60);
      let seconds = sec - (minutes * 60);

      if (minutes < 10) { minutes = '0' + minutes; }
      if (seconds < 10) { seconds = '0' + seconds; }
      return minutes + ':' + seconds;
    }
    return '00:00';
  };

  render() {
    return (
        <div className={'header-container'}>
          <div className={'header-play-bar'}>
            {this.props.playing ? <Pause onClick={this.props.onPlayPause}
                                         className={'play-btn grow'}/> : <Play
                onClick={this.props.onPlayPause} className={'play-btn grow'}/>}
            <input
                className={'seek-input'}
                type='range' min={0} max={1} step='any'
                value={this.props.played}
                onChange={this.props.seek}
                onMouseDown={this.props.seekMouseDown}
                onMouseUp={this.props.seekMouseUp}
            />
            <div className={'seconds-container'}>
              <div
                  className={'seconds-text'}>{this.state.secondsFormatted}</div>
            </div>
            <div className={'vis-select-container'}>
              <Bars className={'vis-select vis-bars'}
                    onClick={this.props.onVisChange}/>
              <div className={'switch-container'}>
                <label className='switch'>
                  <input type='checkbox'/>
                  <span className='slider round'/>
                </label>
              </div>
              <Circle className={'vis-select vis-circle'}
                      onClick={this.props.onVisChange}/>
            </div>
          </div>
        </div>

    );
  }
}

HeaderPlayBar.propTypes = {
  currentVis: PropTypes.string,
  onPlayPause: PropTypes.func,
  onVisChange: PropTypes.func,
  played: PropTypes.number,
  playedSeconds: PropTypes.number,
  playing: PropTypes.bool,
  seek: PropTypes.func,
  seekMouseDown: PropTypes.func,
  seekMouseUp: PropTypes.func
};

export default HeaderPlayBar;