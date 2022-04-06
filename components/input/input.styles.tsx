import React from "react";
import { IconButton, IconButtonProps, InputLabel, styled } from "@mui/material";
import { css } from "styled-components";

import OutlinedInput from "@mui/material/OutlinedInput";
import colors from "config/theme";

export const StyledInput = styled(OutlinedInput)`
  padding-left: 24px;
  padding-right: 10px;
  background-color: #fff;
  border-radius: 0;
  
  label + & {
    margin-top: ${(props) => props.theme.spacing(2)};
  }
  label & {
    font-size: 17px;
  }
  
  & .MuiInputBase-input {
    font-weight: 400;
    padding: 13px 8px;
    padding-left: 0;
    position: relative;
    background-color: #fff;
    font-size: 16px;
    transition: ${(props) =>
      props.theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ])};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #fff inset;
    }

    &::placeholder {
      color: ${(props) => props.theme.palette.grey[700]};
      letter-spacing: 0.5px;
      font-weight: 400;
    }

    &[type="password"] {
      color: ${(props) => props.theme.palette.grey[700]};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #808080;
    transition: border-color 0.2s linear;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-width: 1px;
  }
`;

export const StyledLabel = styled(InputLabel)`
  font-weight: 500;
  color: ${colors.black};
  font-size: 16px;

  &.Mui-focused {
    color: ${colors.black};
  }

  &.Mui-error {
    color: ${(props) => props.theme.palette.error.main};
  }
`;
