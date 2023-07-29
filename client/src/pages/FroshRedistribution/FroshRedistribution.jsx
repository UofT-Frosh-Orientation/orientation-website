import React, { useState, useEffect, useContext } from 'react';
import './FroshRedistribution.scss';
import { useDispatch, useSelector } from 'react-redux';
import { redistributeFrosh } from '../../state/frosh/saga';
import { Button } from '../../components/button/Button/Button';





const PageFroshRedistribution = () => {
     const dispatch = useDispatch();

    const submitForm = () => {
        dispatch(redistributeFrosh({}));
    };

    return(
         <Button
             label="Redistribute Frosh"
             onClick={async () => {
                 submitForm();
             }}
         />
    );
};
  
export { PageFroshRedistribution };