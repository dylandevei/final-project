import React from 'react';
import AppContext from '../lib/app-context';
import PetList from './pet-list';
import { formatPhoneNumber } from '../lib';

export default class SitterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetch(`/api/sitters/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    if (!this.state.user) return null;

    const {
      fullName, imageUrl, aboutMe, tagline, state, city, streetAddress, zipCode, service1, service2, service3,
      service4, service1Price, service2Price, service3Price, service4Price, phoneNumber
    } = this.state.user;
    const fullAddress = `${streetAddress}, ${zipCode}, ${state}`;
    const Map = () => {
      return (
        <div>
          <img className='img-fluid' src={`https://maps.googleapis.com/maps/api/staticmap?center=${fullAddress}&zoom=12&size=400x400&key=${process.env.REACT_APP_API_KEY}`} />
        </div>
      );
    };
    return (
      <div className="container d-flex">
        <div className="card mt-5 shadow-lg">
          <div className="card-body">
            <h2 className='raleway profile-header'>{fullName}</h2>
            <h5 className="text-secondary lato profile-tagline mb-5">{tagline}</h5>
            <div className="row mb-4">
              <div className="col-12 col-sm-6 col-md-5">
              <img className='img-fluid rounded mx-auto d-block mb-5' src={imageUrl} alt={fullName} />
                <PetList userId={this.props.userId} />
                <table className="table text-center mb-3 lato">
                  <thead className='raleway fs-4'>
                    <tr>
                      <th>Services</th>
                      <th>Daily Rates</th>
                    </tr>
                  </thead>
                  <tbody className='fs-5'>
                    <tr>
                      <td>{service1}</td>
                      <td>${service1Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service2}</td>
                      <td>${service2Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service3}</td>
                      <td>${service3Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service4}</td>
                      <td>${service4Price} per day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 col-sm-6 col-md-7 lato text-center">
                <h4 className='raleway text-center'>About {fullName}</h4>
                <p>{aboutMe}</p>
                <p className='lato text-center'><span className='fs-5'>Phone Number:</span> {formatPhoneNumber(phoneNumber)}</p>
                <p className='lato text-center'><span className='fs-5'>Location:</span> {city}, {state}</p>
                <Map/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SitterProfile.contextType = AppContext;
