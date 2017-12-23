import React from 'react';
import { Helmet } from 'react-helmet';

export default function setPageTitle(text) {
  return [
    <Helmet key="helmet"><title>{`${text} | C.M. Lubinski`}</title></Helmet>,
    <h1 key="h1">{text}</h1>,
  ];
}
