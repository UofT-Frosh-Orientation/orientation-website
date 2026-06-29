import { resources } from '../../../util/resources';
import { ButtonBubble } from '../../button/ButtonBubble/ButtonBubble';
import { ButtonRound } from '../../button/ButtonRound/ButtonRound';
import { AppleWallet } from '../../walletpass/AppleWallet';
import './ProfilePageResources.scss';
import PropTypes from 'prop-types';

export const ProfilePageResources = ({ froshObject }) => {
  return (
    <div className="profile-page-resources profile-page-side-section">
      {froshObject ? (
        <>
          {/* <AppleWallet /> */}
          <ButtonBubble
            label={'Download Information PDF'}
            onClick={async () => {
              const { MakeReceipt } = await import('../../MakeReceipt/MakeReceipt');
              const ReactPDF = await import('@react-pdf/renderer');
              const blob = await ReactPDF.pdf(MakeReceipt(froshObject)).toBlob();
              const fileURL = URL.createObjectURL(blob);
              const pdfWindow = window.open(fileURL, '_blank');
              pdfWindow && pdfWindow.focus();
            }}
            isSecondary
            style={{ margin: 0, marginTop: '10px' }}
          />
          {/* Schedule PDF download hidden per request */}
          {/* <ButtonBubble
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
            style={{ margin: 0, marginTop: '30px' }}
          /> */}
        </>
      ) : null}
      <h2 className="desktop-only">RESOURCES</h2>
      <div className="resource-link-group">
        {resources.map((resource, index) => {
          return (
            <a
              key={index + resource.name}
              href={resource.link}
              target="_blank"
              rel="noreferrer"
              className="resource-links desktop-only"
            >
              {resource.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

ProfilePageResources.propTypes = {
  froshObject: PropTypes.object,
};
