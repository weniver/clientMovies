import React from "react";
import styles from "./TextInput.module.scss";
import InputLabel from "./InputLabel.js";
import InputError from "./InputError.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fbc02d",
    },
    secondary: {
      light: "#fbc02d",
      main: "#fbc02d",
      contrastText: "#fbc02d",
    },
  },
});


const useStyles = makeStyles({
  root: {
    "*:focus": {
      outline: "none",
    },
    "& .MuiInputBase-input": {
      color: "#0F0F0F",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "solid 2px #fbc02d",
    },
    "& .MuiInput-underline:before:focus": {
      borderBottom: "solid 4px #fbc02d",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "solid 2px #fbc02d", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottom: "solid 4px #fbc02d",
    },
  },
});

const DatePicker = ({
  label,
  id,
  name,
  formik,
  onBlurHandler,
  onChangeHandler,
  value,
  touched,
  errors,
  onKeyDownHandler,
}) => {
  const classes = useStyles();
  return (
    <>
      {label && <InputLabel label={label} />}
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <KeyboardDatePicker
              id={id}
              autoOk
              error={false}
              disableFuture
              className={classes.root}
              disableToolbar
              helperText={null}
              format="d•M•yyyy"
              value={value}
              onChange={(value) => onChangeHandler(value)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
      <InputError touched={touched} errors={errors} />
    </>
  );
};
export default DatePicker;
