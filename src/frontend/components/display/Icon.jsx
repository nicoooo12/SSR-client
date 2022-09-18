import React from 'react';
const App = ({ type, width = 24, height = 24, strokeWidth = '1.5', stroke = '#FCFCFC' })=> {

  switch (type) {
    case 'close':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
          </svg>
        </>
      );
    case 'list':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-list' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'/>
          </svg>
        </>
      );
    case 'trolley':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 2H3.39566C4.33305 2 5.14468 2.65106 5.34803 3.56614L6 6.5M6 6.5L7.10424 12.5733C7.62296 15.4263 10.1077 17.5 13.0075 17.5H15.7106C18.512 17.5 20.9406 15.5615 21.5614 12.8297L22.5835 8.33243C22.7969 7.39379 22.0834 6.5 21.1208 6.5H6Z' stroke='#4700AB' strokeWidth='2' strokeLinecap='round'/>
            <circle cx='8.5' cy='21' r='1' stroke='#4700AB' strokeWidth='2'/>
            <circle cx='20.5' cy='21' r='1' stroke='#4700AB' strokeWidth='2'/>
          </svg>
        </>
      );
    case 'upLoad':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-upload' viewBox='0 0 16 16'>
            <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/>
            <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/>
          </svg>
        </>
      );
    case 'forward':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-chevron-left' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/>
          </svg>
        </>
      );
    case 'row':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z'/>
          </svg>
        </>
      );
    case 'plass':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-plus-lg' viewBox='0 0 16 16'>
            <path d='M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z'/>
          </svg>
        </>
      );
    case 'help':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-question' viewBox='0 0 16 16'>
            <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z'/>
          </svg>
        </>
      );
    case 'eye':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.33497 13.2561C0.888345 12.4782 0.888342 11.522 1.33497 10.7441C3.68496 6.65097 7.44378 4 11.6798 4C15.9158 4 19.6746 6.65094 22.0246 10.744C22.4712 11.5219 22.4712 12.4781 22.0246 13.256C19.6746 17.3491 15.9158 20 11.6798 20C7.44377 20 3.68497 17.3491 1.33497 13.2561Z' stroke={stroke} strokeWidth={strokeWidth}/>
            <circle cx='11.6797' cy='12' r='3' stroke={stroke} strokeWidth={strokeWidth}/>
          </svg>
        </>
      );
    case 'arrow':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4.25 12.2743L19.25 12.2743' stroke={stroke} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969' stroke={stroke} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </>
      );
    case 'bell':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 26 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M20.3333 9.01449C20.3333 7.15413 19.5607 5.36997 18.1855 4.0545C16.8102 2.73902 14.9449 2 13 2C11.0551 2 9.18982 2.73902 7.81455 4.0545C6.43928 5.36997 5.66667 7.15413 5.66667 9.01449C5.66667 14.9484 3.21304 17.809 1.86406 18.9333C1.6615 19.1021 1.79337 19.5362 2.05706 19.5362H8.52214C8.6391 19.5362 8.74073 19.6154 8.77521 19.7271C8.99911 20.4529 9.99866 23 13 23C16.0013 23 17.0009 20.4529 17.2248 19.7271C17.2593 19.6154 17.3609 19.5362 17.4779 19.5362H23.9429C24.2066 19.5362 24.3385 19.1021 24.1359 18.9333C22.787 17.809 20.3333 14.9484 20.3333 9.01449Z' stroke='#FCFCFC' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
          </svg>

        </>
      );
    case 'trash':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M19.3248 9.46875C19.3248 9.46875 18.7818 16.2037 18.4668 19.0407C18.3168 20.3957 17.4798 21.1898 16.1088 21.2148C13.4998 21.2618 10.8878 21.2648 8.27979 21.2098C6.96079 21.1828 6.13779 20.3788 5.99079 19.0478C5.67379 16.1858 5.13379 9.46875 5.13379 9.46875' stroke='#200E32' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M20.708 6.24023H3.75' stroke='#200E32' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M17.4406 6.23998C16.6556 6.23998 15.9796 5.68498 15.8256 4.91598L15.5826 3.69998C15.4326 3.13898 14.9246 2.75098 14.3456 2.75098H10.1126C9.53358 2.75098 9.02558 3.13898 8.87558 3.69998L8.63258 4.91598C8.47858 5.68498 7.80258 6.23998 7.01758 6.23998' stroke='#200E32' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </>
      );
    case 'info':
      return (
        <>
          <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11.9897 15.796V11.377' stroke='#FCFCFC' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M11.9896 8.2041H11.9996' stroke='#FCFCFC' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
            <path fillRule='evenodd' clipRule='evenodd' d='M16.3345 2.75H7.66549C4.64449 2.75 2.75049 4.889 2.75049 7.916V16.084C2.75049 19.111 4.63549 21.25 7.66549 21.25H16.3335C19.3645 21.25 21.2505 19.111 21.2505 16.084V7.916C21.2505 4.889 19.3645 2.75 16.3345 2.75Z' stroke='#FCFCFC' strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </>
      );
    case 'help2':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-question-circle' viewBox='0 0 16 16'>
            <path strokeWidth={strokeWidth} d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
            <path strokeWidth={strokeWidth} d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z'/>
          </svg>
        </>
      );
    default:
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
          </svg>
        </>
      );
  }

};

export default App;
