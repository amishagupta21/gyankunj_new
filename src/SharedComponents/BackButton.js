import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button className='d-flex gap-1 px-2' onClick={goBack} >
      <ArrowBackIcon />Back
    </Button>
  );
};

export default BackButton;