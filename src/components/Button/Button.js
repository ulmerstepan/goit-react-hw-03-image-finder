import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  obBtnClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <button onClick={this.obBtnClick} className="Button" type="button">
        Load more
      </button>
    );
  }
}

export default Button;
