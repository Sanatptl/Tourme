import FormInput from "./FormInputs";

const Login = (props) => {
  return (
    <>
      <div className="relative inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 "></div>
      <div className="shadow-lg">
        <main className="main">
          <div className="login-form">
            <h2 className="heading-secondary ma-bt-lg">
              Log into your account
            </h2>
            <form
              action=""
              className="form form--login"
              onSubmit={props.handleSubmit}
            >
              <FormInput
                label="Email address"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <FormInput
                label="Password"
                id="password"
                name="password"
                type="password"
                value={props.values.password}
                placeholder="********"
                onChange={props.handleChange}
              />

              <div className="form__group">
                <button type="submit" className="btn btn--green mr-16">
                  Login
                </button>
                <button
                  className="btn bg-gray-200 ml-16"
                  onClick={props.goBackPage}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
