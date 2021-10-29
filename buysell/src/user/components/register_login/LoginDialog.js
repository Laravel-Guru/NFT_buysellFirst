import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import request from "../../../api/request";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errmessage, setErrmessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if(email && password){
      // console.log(email);
      // console.log(password);  

      var body = {
        email: email,
        password: password
      };

      request
        .post("/auth/login", body)
        .then((resp) => {
          if(resp.message === "You are logged in!") {
            // console.log(resp.token);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('user_name', resp.name);
            // console.log("--------", resp);
            if(resp.name === "admin") history.push("/admin");
            else history.go(0);
          }
          else{
            console.log(resp.message);
            setErrmessage(resp.message);
            setHasTermsOfServiceError(true);
          }
        })
        .catch((err) => {
          let message = err.message;
          console.log(message);
          setErrmessage(message);
          setHasTermsOfServiceError(true);
          // console.log(hasTermsOfServiceError);
        });
    }
  }

  const login = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setIsLoading(true);
    setStatus(null);
    // if (loginEmail.current.value !== "test@web.com") {
    //   setTimeout(() => {
    //     setStatus("invalidEmail");
    //     setIsLoading(false);
    //   }, 1500);
    // } else if (loginPassword.current.value !== "HaRzwc") {
    //   setTimeout(() => {
    //     setStatus("invalidPassword");
    //     setIsLoading(false);
    //   }, 1500);
    // } else {
    //   setTimeout(() => {
    //     history.push("/c/dashboard");
    //   }, 150);
    // }
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              value={email}
              onChange={(event) => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
                setEmail(event.target.value)
              }}
              helperText={
                status === "invalidEmail" &&
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              value={password}
              onChange={(event) => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
                setPassword(event.target.value)
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )}
          </Fragment>
        }
        actions={
          <Fragment>
            {hasTermsOfServiceError && (
              <FormHelperText
                error
                style={{
                  display: "block",
                  // marginTop: theme.spacing(-1),
                }}
              >
                {errmessage}  
              </FormHelperText>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
              onClick={() => handleClick()}
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography>

          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
