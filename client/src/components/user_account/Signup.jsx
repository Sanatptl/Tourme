import FormInput from "./FormInputs";

const Signup = (props) => {
  return (
    <>
      <div className="container"></div>
      <div className="shadow-lg">
        <main className="main">
          <div className="flex flex-col items-center">
            <h2 className="heading-secondary ma-bt-lg md:text-4xl sm:text-base">
              Create Your New Account
            </h2>
            <form
              className="form flex flex-row flex-wrap gap-x-16"
              action=""
              onSubmit={props.handleSubmit}
            >
              <FormInput
                label="Name"
                id="name"
                name="name"
                type="text"
                classDiv="min-w-[35vw]"
                value={props.values.name}
                placeholder="Enter your name"
                onChange={props.handleChange}
              />
              <FormInput
                label="Email Address"
                id="email"
                name="email"
                type="email"
                classDiv="min-w-[35vw]"
                value={props.values.email}
                placeholder="you@example.com"
                onChange={props.handleChange}
              />
              <FormInput
                label="Password"
                id="password"
                name="password"
                type="password"
                classDiv="min-w-[35vw]"
                value={props.values.password}
                placeholder="*********"
                onChange={props.handleChange}
              />
              <FormInput
                label="Confirm Password"
                id="passConfirm"
                type="password"
                name="passwordConfirm"
                classDiv="min-w-[35vw]"
                value={props.values.passwordConfirm}
                placeholder="you@example.com"
                onChange={props.handleChange}
              />

              <div className="form__group form__photo-upload min-w-[35vw]">
                <img
                  className="form__user-photo"
                  src={`/img/users/default.jpg`}
                  alt="User photo"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={(e) => props.setFile(e.target.files[0])}
                />
                <label className="btn-text" htmlFor="photo">
                  Profile Photo
                </label>
              </div>
              <div className="form__group mt-8">
                <button type="submit" className="btn btn--green mr-16">
                  Submit
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

export default Signup;
