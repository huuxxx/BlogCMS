import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Cookies from 'universal-cookie';
import { CircularProgress } from '@material-ui/core';
import { useGlobalContext } from '../../Store';

const cookies = new Cookies();
const axios = require('axios').default;

const LOGIN_ENDPOINT = process.env.REACT_APP_ENDPOINT_LOGIN;

interface LoginRequest {
  UserName: string;
  Password: string;
}

const Login = () => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useGlobalContext();
  const { setUserName: setLoggedInUserName } = useGlobalContext();
  const [helperText, setHelperText] = useState('');
  const [isError, setIsError] = useState(false);

  const loginRequest: LoginRequest = {
    UserName: userName,
    Password: password,
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(LOGIN_ENDPOINT, {
        loginRequest,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setLoggedInUserName(userName);
          const obj = JSON.parse(JSON.stringify(response.data));
          cookies.set('token', obj.token);
          history.push('/app/dashboard');
        }
      })
      .catch(() => {
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
