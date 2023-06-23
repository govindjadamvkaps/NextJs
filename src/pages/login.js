import axios from "axios";
import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusCodes } from 'http-status-codes'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } , reset } = useForm()

  const loginUser = async(data)=>{
    try {
      console.log("login data", data)
      const resp = await axios.post('/api/login',data)
      console.log(resp.data)

      if(resp.status===StatusCodes.OK){
        toast.success("Login successful",{
          position:"top-center"
        })
        reset()
        router.push('/')
      }
    } catch (error) {
      console.log("login ", error)
      toast.error("Error in Login user",{
        position:"top-center"
      })
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="container mt-5 text-center">
              <img
                src="https://images.unsplash.com/photo-1621256326941-98d9e045e2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                height="300px"
                width="400px"
              />
            </div>
          </div>
          <div className="col-xl-6 ">
            <div className="container">
              <div
                className="alert alert-primary mt-5 text-center"
                role="alert"
              >
                Login !
              </div>
            </div>
            <form onSubmit={handleSubmit(loginUser)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  aria-describedby="emailHelp"
                  {...register('email',{required:true})}
                  />
                  {errors.email && <p style={{ color: "red" }}>email is required</p>}
              </div>

              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  {...register('password',{required:true})}
                  />
                  {errors.password && <p style={{ color: "red" }}>Password is required</p>}
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;