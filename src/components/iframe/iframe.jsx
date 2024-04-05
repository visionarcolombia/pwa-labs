import PropTypes from 'prop-types';

IframePlayer.propTypes = {
    html: PropTypes.string.isRequired,
  };


export default function IframePlayer({html}) {
    const htmlRaw = { __html: html }
    return (
        <div>
            <div style={{
            }} dangerouslySetInnerHTML={ htmlRaw } />
        </div>
    )
}