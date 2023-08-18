import React, { useEffect } from 'react';
import './FroshRedistribution.scss';
import { useDispatch, useSelector } from 'react-redux';
import { redistributeFrosh } from '../../state/frosh/saga';
import { Button } from '../../components/button/Button/Button';
import { froshSelector } from '../../state/frosh/froshSlice';
const PageFroshRedistribution = () => {
  const dispatch = useDispatch();
  const { frosh, error } = useSelector(froshSelector);
  const submitForm = () => {
    dispatch(redistributeFrosh());
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
    console.error(error);
  }, [error]);

  return (
    <>
      <Button label="Redistribute Frosh" onClick={submitForm} />
      {frosh?.map((frosh, index) => (
        <div key={index} style={frosh?.to ? { color: 'var(--text-dynamic)' } : { display: 'none' }}>
          <h2>{`Frosh: ${frosh?.firstName} ${frosh?.lastName} (${frosh?.email})`}</h2>
          <h2>Reassigned to: {frosh?.to}</h2>
          <br />
        </div>
      ))}
    </>
  );
};

export { PageFroshRedistribution };
