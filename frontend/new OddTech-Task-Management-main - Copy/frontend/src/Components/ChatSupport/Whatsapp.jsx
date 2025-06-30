// import React from 'react';

// const Whatsapp = () => {

//   return (
//     <>
//       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
//       <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
//       <a
//         href="https://wa.me/+919021775696"
//         className="whatsapp_float"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <i class="fa fa-whatsapp whatsapp-icon"></i>
//       </a>
//     </>
//   );
// };

// export default Whatsapp;




import React from 'react';

const Whatsapp = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
      <a
        href="https://wa.me/919370209446"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-25 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
      >
        <i className="fa fa-whatsapp"></i>
      </a>
    </>
  );
};

export default Whatsapp;

