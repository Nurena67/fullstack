import React from "react";
import "bulma/css/bulma.min.css";
import "./Login.css"; // Tambahkan file CSS custom jika diperlukan

const Login = () => {
  return (
    <div className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box">
                <h1 className="title has-text-centered">Login</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      className="input"
                      placeholder="Enter your email"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      placeholder="Enter your password"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" /> Remember me
                  </label>
                </div>

                <div className="field">
                  <button className="button is-primary is-fullwidth">Login</button>
                </div>

                <p className="has-text-centered">
                  <a href="#">Forgot password?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
