const LoginForm = () => {
  return (
    <form action="#">
      <div className="row">
        <div className="col-12">
          <div className="single-input">
            <label htmlFor="logemail">Tu correo electrónico</label>
            <input
              type="text"
              id="logemail"
              placeholder="Introduce tu correo electrónico"
              required
            />
          </div>
          <div className="single-input">
            <label htmlFor="logpassword">Tu contraseña</label>
            <input
              type="text"
              id="logpassword"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <button type={"reset"} className="cmn-btn w-100">
            Iniciar sesión
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
