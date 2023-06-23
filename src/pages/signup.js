import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm()

    const postData = async (data) => {
        try {
            // console.log("data", data)
            const formData = new FormData()

            formData.append('name', data.name)
            formData.append('email',data.email)
            formData.append('phone',data.phone)
            formData.append('age',data.age)
            formData.append('gender',data.gender)
            formData.append('image', data.image[0])
            formData.append('password',data.password)

            const resp = await axios.post(`http://localhost:3000/api/hello`,formData)
            // console.log("post response=>>",resp.data)
            // console.log("data", data)

            if(resp.status===StatusCodes.CREATED)
            {
                toast.success('registration successful',{
                    position:"top-center"
                })
                reset()
            }
        } catch (error) {
            console.log("error in post data", error)
            toast.error('error in registration',{
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
                            <img src="https://images.unsplash.com/photo-1627061801305-c0c5b688b420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" height="300px" width="400px" />
                        </div>
                    </div>
                    <div className="col-xl-6 ">
                        <div className="container">
                            <div
                                className="alert alert-primary mt-5 text-center"
                                role="alert"
                            >
                                Registration !
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(postData)}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">
                                    Enter Your  Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    name="name"
                                    aria-describedby="emailHelp"
                                    {...register('name', { required: true })}
                                />
                                {errors.name && <p style={{ color: "red" }}>First name is required</p>}
                            </div>


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
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <p style={{ color: "red" }}>email is required</p>}
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="phone"
                                    {...register('phone', { required: true })}
                                />
                                {errors.phone && <p style={{ color: "red" }}> phone is required</p>}
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="age"
                                    {...register('age', { required: true })}
                                />
                                {errors.age && <p style={{ color: "red" }}>age is required</p>}
                            </div>
                          <div>                            <label>
                                <input type="radio"  value="male" name='gender' {...register('gender')} />
                                Male
                            </label>
                            <label>
                                <input type="radio" value="female" name='gender' {...register('gender')} />
                                Female
                            </label>
                            <label>
                                <input type="radio" value="other" name='gender' {...register('gender')} />
                                Other
                            </label>
                            </div>

                            <div className="mb-3 mt-3">
                                <label for="exampleInputPassword1" className="form-label">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="image"
                                    {...register('image', { required: true })}
                                />
                                {errors.image && <p style={{ color: "red" }}>image is required</p>}
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
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <p style={{ color: "red" }}>password is required</p>}
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    required
                                />
                                <label className="form-check-label" for="exampleCheck1">
                                    Check me out
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;