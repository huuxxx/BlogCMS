import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Cookies from 'universal-cookie';
import { useGlobalContext } from '../../Store';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from '@mui/material';

const cookies = new Cookies();
const axios = require('axios').default;

const LOGIN_ENDPOINT = process.env.REACT_APP_ENDPOINT_LOGIN;

const Login = () => {
  const [passwordForm, setPassword] = useState('');
  const [userNameForm, setUserName] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useGlobalContext();
  const { setUserName: setLoggedInUserName } = useGlobalContext();
  const [helperText, setHelperText] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(LOGIN_ENDPOINT, {
        userName: userNameForm,
        password: passwordForm,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setLoggedInUserName(userNameForm);
          const obj = response.data;
          cookies.set('token', obj.token);
          history.push('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        setHelperText('Login error');
        setIsError(true);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form className="container" noValidate autoComplete="off">
        <Card className="card">
          <CardHeader className="header" title="Blog CMS Login" />
          <CardContent>
            <div>
              <TextField
                spellCheck={false}
                error={isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleUsernameChange}
                onKeyUp={handleKeyPress}
              />
              <TextField
                spellCheck={false}
                error={isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={handlePasswordChange}
                onKeyUp={handleKeyPress}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className="loginBtn"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
          <div className="loadingSpinner">
            {loading ? <CircularProgress /> : ''}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default Login;
