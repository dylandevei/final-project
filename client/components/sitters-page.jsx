import React from 'react';

export default class SittersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/sitters')
      .then(res => res.json())
      .then(users => this.setState(prevState => ({
        users: users
      })));
  }

  render() {
    return (
      <div className='container'>
        <h1 className='sitters-header raleway'>Sitters Near You</h1>
        <div className='row'>
          {
            this.state.users.map(user => (
              <div key={user.userId}>
                <User user={user} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function User(props) {
  const {
    userId, fullName, imageUrl, aboutMe, tagline, state, city, streetAddress, zipCode, service1, service2, service3,
    service4, service1Price, service2Price, service3Price, service4Price
  } = props.user;

  const cityState = `${city}, ${state}`
  const services = `Offers the following services: ${service1}, ${service2}, ${service3}, ${service4}`
  return (
    <div className="container-md">
      <div className='sitter-profile'>
        <div className="row">
          <div className="col">
            <a href={`#users?userId=${userId}`}>
              <img className='img-fluid rounded mx-auto d-block' src={imageUrl} alt={fullName} />
            </a>
          </div>
          <div className="col">
            <h2 className='fs-3 text-center raleway'>{fullName}</h2>
            <h3 className='fs-6 text-center lato'>{tagline}</h3>
            <p className='fs-6 text-center lato'>Location: {city}</p>
            <p className='profile-text text-center lato'>{services}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
