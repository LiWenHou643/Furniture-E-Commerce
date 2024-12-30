import { useState } from 'react';

const ImageMagnifier = ({
    src,
    width,
    height,
    alt,
    magnifierHeight = 200,
    magnifierWidth = 200,
    zoomLevel = 1.5,
}) => {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [[x, y], setXY] = useState([0, 0]);

    const mouseEnter = (e) => {
        const el = e.currentTarget;

        const { width, height } = el.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
    };

    const mouseLeave = (e) => {
        e.preventDefault();
        setShowMagnifier(false);
    };

    const mouseMove = (e) => {
        const el = e.currentTarget;
        const { top, left } = el.getBoundingClientRect();

        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;

        setXY([x, y]);
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                width: width || '100%', // Default to 100% width
                height: height || 'auto', // Maintain aspect ratio if height is not set
                overflow: 'hidden', // Ensure no overflow from parent container
            }}
        >
            <img
                src={src}
                style={{
                    width: '100%', // Stretch to fit the parent container's width
                    height: '100%', // Stretch to fit the parent container's height
                    objectFit: 'fill', // Fit within the container while preserving aspect ratio
                }}
                width={width ? width : '100%'}
                height={height ? height : 'auto'}
                alt={alt}
                onMouseEnter={(e) => mouseEnter(e)}
                onMouseLeave={(e) => mouseLeave(e)}
                onMouseMove={(e) => mouseMove(e)}
            />
            <div
                style={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',
                    zIndex: '999',
                    pointerEvents: 'none',
                    height: `${magnifierHeight}px`,
                    width: `${magnifierWidth}px`,
                    opacity: '1',
                    border: '1px solid lightgrey',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: 'no-repeat',
                    top: `${y / 2}px`,
                    left: `${x / 2}px`,
                    backgroundSize: `${imgWidth * zoomLevel}px ${
                        imgHeight * zoomLevel
                    }px`,
                    backgroundPositionX: `${
                        -x * zoomLevel + magnifierWidth / 2
                    }px`,
                    backgroundPositionY: `${
                        -y * zoomLevel + magnifierHeight / 2
                    }px`,
                }}
            />
        </div>
    );
};

export default ImageMagnifier;
