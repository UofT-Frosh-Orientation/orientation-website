import { resources } from '../../../util/resources';
import { ButtonBubble } from '../../button/ButtonBubble/ButtonBubble';
import './ProfilePageResources.scss';
import PropTypes from 'prop-types';

export const ProfilePageResources = ({ froshObject }) => {

  return (
    <div className="profile-page-resources profile-page-side-section">
      <h2>Resources</h2>
      {resources.map((resource, index) => {
        return (
          <a
            key={index + resource.name}
            href={resource.link}
            target="_blank"
            className="no-link-style"
            rel="noreferrer"
          >
            <ButtonBubble
              label={resource.name}
              isSecondary
              style={{ margin: 0, marginTop: '10px' }}
            />
          </a>
        );
      })}
      {froshObject ? ( 
      <>
        <a key={'5Download'} className="no-link-style">
          <ButtonBubble
            label={'Download Information PDF'}
            onClick={async () => {
              const MakeReceipt = (await import('../../MakeReceipt/MakeReceipt')).MakeReceipt;
              const ReactPDF = await import('@react-pdf/renderer');
              const blob = await ReactPDF.pdf(MakeReceipt(froshObject)).toBlob();
              const fileURL = URL.createObjectURL(blob);
              const pdfWindow = window.open(fileURL, '_blank');
              pdfWindow && pdfWindow.focus();
            }}
            isSecondary
            style={{ margin: 0, marginTop: '10px' }}
          />
        </a>
      </>
      ) : (
        <></>
      )}
      <ButtonBubble
        label={'Download Schedule PDF'}
        onClick={async () => {
          const ReactPDF = await import('@react-pdf/renderer');
          const { MakeSchedulePDF } = await import('../../MakeSchedulePDF/MakeSchedulePDF');
          const blob = await ReactPDF.pdf(MakeSchedulePDF(froshObject)).toBlob();
          const fileURL = URL.createObjectURL(blob);
          const pdfWindow = window.open(fileURL, '_blank');
          pdfWindow && pdfWindow.focus();
        }}
        isSecondary
        style={{ margin: 0, marginTop: '10px' }}
      />
    </div>
  );
};

ProfilePageResources.propTypes = {
  froshObject: PropTypes.object,
};
