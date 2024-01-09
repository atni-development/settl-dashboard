const SignUpForm = () => {
  return (
    <form action="#">
      <div className="row">
        <div className="col-12">
          <div className="single-input">
            <label htmlFor="logemail">Tu Correo electrónico</label>
            <input
              type="text"
              id="logemail"
              placeholder="Introduce tu correo electrónico"
              required
            />
          </div>
          <div className="single-input">
            <label htmlFor="logpassword"></label>
            <input
              type="text"
              id="logpassword"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <button className="cmn-btn w-100">Enviar</button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
