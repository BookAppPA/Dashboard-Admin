import { useContext } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../context/Auth';

const useStyles = createUseStyles((theme) => ({

}));

const UsersDetails = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { push } = useHistory();
  const location = useLocation();
  const { token } = useContext(AuthContext)

  const dispatch = useDispatch();

  return (
    <div>
    </div>
  );
};

export default UsersDetails;
