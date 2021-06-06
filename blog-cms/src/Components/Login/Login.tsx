import React, { useReducer, useEffect, useState } from 'react';
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

const cookies = new Cookies();

const axios = require('axios').default;

// const LOGIN_ENDPOINT = 'https://blogapi.huxdev.com/api/Authenticate/login';
const LOGIN_ENDPOINT = 'https://localhost:44358/api/Authenticate/login';

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(LOGIN_ENDPOINT, {
        username: state.username,
        password: state.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const obj = JSON.parse(JSON.stringify(response.data));
          cookies.set('token', obj.token);
          history.push('/app/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch({
          type: 'loginFailed',
          payload: 'Login error',
        });
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };
  return (
    <div>
      <form className="container" noValidate autoComplete="off">
        <Card className="card">
          <CardHeader className="header" title="Blog CMS Login" />
          <CardContent>
            <div>
              <TextField
                error={state.isError}
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
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className="loginBtn"
              onClick={handleLogin}
              disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
          <div className="loadingSpinner">
            {loading ? (
              <CircularProgress style={{ position: 'relative', left: '45%' }} />
            ) : (
              ''
            )}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default Login;
