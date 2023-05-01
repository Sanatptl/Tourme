// import { createPortal } from 'react-dom';
import { useErr } from "../../contexts/ErrContext";

const ErrorPage = () => {
  const { error } = useErr();

  return (
    <>
      {/* <div className="absolute top-0 left-0 w-full h-screen z-100 bg-gray-400 blur-sm"></div> */}
      {/* <main className="z-[200] absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4"> */}
      <main className="main">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--error">
              Uh oh! Something went wrong!
            </h2>
            <h2 className="error__emoji">😢 🤯</h2>
          </div>
          <div className="error__msg">{error}</div>
        </div>
      </main>
    </>
  );

  //

  //

  //

  //   return createPortal(
  //     <>
  //       <div className="absolute top-0 left-0 w-full h-screen z-10 bg-gray-400 blur-sm"></div>
  //       <main className="main z-50 absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
  //         <div className="error">
  //           <div className="error__title">
  //             <h2 className="heading-secondary heading-secondary--error">
  //               Uh oh! Something went wrong!
  //             </h2>
  //             <h2 className="error__emoji">😢 🤯</h2>
  //           </div>
  //           <div className="error__msg">{msg}</div>
  //         </div>
  //       </main>
  //     </>,
  //     document.getElementById('errPortal')
  //   );
};

export default ErrorPage;
