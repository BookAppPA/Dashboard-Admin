import { useContext, useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context/Auth';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Column, Row } from 'simple-flexbox';
import GeoIcon from '@material-ui/icons/Room';
import {
  TextareaAutosize,
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import Imagenotfound from '../../../assets/png/imagenotfound.png';
import InfosDetails from '../../../components/infosDetails';
import BookComponent from '../../../components/bookComponent';

const useStyles = createUseStyles((theme) => ({
  mapContainer: {
    width: window.innerWidth * 0.4,
    height: window.innerWidth * 0.3,
    borderRadius: 30,
    marginRight: 20,
    marginBottom: 15,
  },
  bookSeller_infos: {
    width: window.innerWidth - (window.innerWidth * 0.6),
    backgroundColor: '#ECECE5'
  },
  description: {
    width: window.innerWidth * 0.4
  },
  openHours: {
    width: window.innerWidth * 0.23,
    height: window.innerWidth * 0.22,
    backgroundColor: '#ECECE5',
  },
  bookContainer: {
    width: window.innerWidth * 0.15,
    height: window.innerWidth * 0.22,
    marginLeft: window.innerWidth * 0.05
  }
}));

const BookSellerDetails = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { push } = useHistory();
  const location = useLocation();
  const { token } = useContext(AuthContext)
  const dispatch = useDispatch();

  const bookSeller = useSelector((state) => state.userById)
  const sellerList = useSelector((state) => state.sellerBookList)

  const [viewport, setViewport] = useState({
    latitude: bookSeller.coord.lat,
    longitude: bookSeller.coord.lon,
    zoom: 15
  });
  const [showPopup, togglePopup] = useState(false);

  return (
    <div>
      <Column>
        <Row>
          {bookSeller.coord != undefined && (
            <Card className={classes.mapContainer}>
              <ReactMapGL
                {...viewport}
                center={[viewport.latitude, viewport.longitude]}
                width="100%"
                height="100%"
                mapStyle={"mapbox://styles/mapbox/streets-v11"}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPGL_TOKEN}
              >
                <Marker
                  longitude={bookSeller.coord.lon}
                  latitude={bookSeller.coord.lat}
                >
                  <div onClick={() => { togglePopup(!showPopup) }}>
                    <GeoIcon color={'secondary'} />
                  </div>
                </Marker>
                {showPopup &&
                  <Popup
                    latitude={bookSeller.coord.lat}
                    longitude={bookSeller.coord.lon}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => togglePopup(false)}
                  >
                    <div>{bookSeller.address}</div>
                  </Popup>
                }
              </ReactMapGL>
            </Card>
          )}
          <Column>
            <Row>
              <InfosDetails name={'Nom'} value={bookSeller.name != undefined ? bookSeller.name : ''} />
              <InfosDetails name={'Téléphone'} value={bookSeller.phone != undefined ? bookSeller.phone : ''} />
              <InfosDetails name={'Mail'} value={bookSeller.email != undefined ? bookSeller.email : ''} />
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Column style={{ marginRight: 10 }}>
                <h2>Bio</h2>
                <TextareaAutosize
                  disabled={true}
                  rowsMin={10}
                  className={classes.description}
                  aria-label="minimum height"
                  placeholder="Bio"
                  value={bookSeller.bio != undefined ? bookSeller.bio : ''}
                />
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          {bookSeller.open_hour != undefined && (
            <Card className={classes.openHours}>
              <h2 style={{ marginLeft: 15, marginBottom: 15 }}>Horaires d'ouverture</h2>
              {Object.entries(bookSeller.open_hour).map((day) => {
                return (
                  <div style={{ marginLeft: 20 }}>
                    <h4>{day[0]} : {day[1]}</h4>
                  </div>
                )
              })}
            </Card>
          )}
          {
            sellerList.map((book) => {
              return (
                <BookComponent img={book.picture} title={book.title} />
              )
            })
          }
        </Row>
      </Column>
    </div>
  );
};

export default BookSellerDetails;
