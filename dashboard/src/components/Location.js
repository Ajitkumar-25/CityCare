import React from 'react'
import Tabs from './tabs'
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

function Location() {
  return (
    <>
    <Tabs/>
    {/* <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map> */}
    </>
  )
}

// export default GoogleApiWrapper({
//   apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
// })(Location)

export default Location