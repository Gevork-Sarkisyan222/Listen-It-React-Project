import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={260}
    height={360}
    viewBox="0 0 260 360"
    backgroundColor="#c7c7c7"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="3" y="23" rx="5" ry="5" width="246" height="335" />
  </ContentLoader>
);

export default MyLoader;
