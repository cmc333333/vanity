import glamorous from 'glamorous';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function setPageTitle(text) {
  return [
    <Helmet key="helmet"><title>{`${text} | C.M. Lubinski`}</title></Helmet>,
    <glamorous.H1
      background="#5A79A5"
      borderBottomLeftRadius="20px"
      borderBottomRightRadius="20px"
      color="#FFF"
      key="h1"
      paddingBottom=".5rem"
      paddingTop=".5rem"
      margin="0 20% .5em 20%"
      textAlign="center"
    >
      {text}
    </glamorous.H1>,
  ];
}
