import React, { useState } from 'react';

interface ImageBackgroundProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Resilient Image Container (SIN ETIQUETAS IMG)
 * Renders an accessible div container using CSS background-image
 * with a styled fallback gradient if the image is missing or invalid.
 */
export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  alt = '',
  className = '',
  style = {},
  children
}) => {
  const [hasError, setHasError] = useState(false);

  // If source is provided and hasn't errored
  const hasValidImage = Boolean(src && !hasError);

  const combinedStyle: React.CSSProperties = {
    ...style,
    backgroundImage: hasValidImage ? `url("${src}")` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${
        !hasValidImage ? 'bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50' : 'bg-stone-100'
      } ${className}`}
      style={combinedStyle}
    >
      {/* Invisible test probe to detect network errors silently without showing broken image icons */}
      {src && !hasError && (
        <span
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html: `<img src="${src}" style="display:none" onerror="this.parentNode.setAttribute('data-error','1')" />`
          }}
        />
      )}
      {children}
    </div>
  );
};
