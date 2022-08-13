import React, { Component } from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { getDetails } from '../../redux/actions';

class Card extends Component {
  // handleClick = id => {
  //   this.props.getDetails(id);
  // };

  render() {
    return (
      <div className={s.container}>
        <div className={s.devider}>
          <h3>{this.props.title}</h3>
          <Link to={`/browse/recipe/${this.props.id}`}>
            <img
              // onClick={() => this.handleClick(this.props.id)}
              src={this.props.image}
              alt="recipe"
              width="195"
              height="200"
            />
          </Link>
        </div>
        <div className={s.devider}>
          <ul>
            {this.props.id.toString().split('-').length > 1
              ? this.props.diets.map(diet => (
                  <li key={diet.name}>{diet.name}</li>
                ))
              : this.props.diets.map(diet => <li key={diet}>{diet}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

// export const mapDispatchToProps = {
//   getDetails,
// };

export default Card;
