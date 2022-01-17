import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { defaultCredentail, userAuth } from '../Action/UserActionCreator';

const Login = () => {
  const defaultUserName = useSelector( state => state.defaultCred.name );
  const defaultPass = useSelector( state => state.defaultCred.password );
  const userData = useSelector( state => state.user);

  const [ , setName ] = useState();
  const [ , setPassword ] = useState();
  const [ error , setError ] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const passRef = useRef(null);
 
  useEffect(() => {
    dispatch(defaultCredentail());
    nameRef.current.focus();
  },[]);

  useEffect(() => {
    if(userData && userData.sucess){
      setError('');
      navigate('/product-list');
    }
    else{
      setError(userData.data);
    }

  }, [ userData.sucess ]);

  const onLoginHandler = e => {
    e.preventDefault();
    dispatch(userAuth(nameRef.current.value, passRef.current.value));
  }

  return (
    <div>
        <section className="vh-100" style={{backgroundColor: '#508bfc'}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                  <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Sign in</h3>
                    <div className="form-outline mb-4">
                      <input 
                      type="text" 
                      ref={nameRef}
                      defaultValue={defaultUserName}
                      onChange={(event) => setName(event.target.value)}
                      placeholder='UserName'
                      className="form-control form-control-lg" />
                    </div>

                    <div className={`form-outline ${error ? 'mb-2' : 'mb-4'}`}>
                      <input 
                      type="password" 
                      ref={passRef}
                      defaultValue={defaultPass}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder='Password'
                      className="form-control form-control-lg" />
                    </div>
                   
                   { error && <div className='text-danger mb-2' style={{fontSize: 14}}>{ error }</div>}
                   <div className="form-outline mb-4"/>
                    <button 
                    className="btn btn-primary btn-lg btn-block" 
                    type="submit"
                    onClick={onLoginHandler}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default Login;
