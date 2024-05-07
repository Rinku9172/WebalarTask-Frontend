import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const host = "https://webalar-task.vercel.app";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Create an Account</h3>
              <p className="row justify-content-center ">Get started with our task manager app</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name </label>
                  <input type="text" className="form-control" id="name" name="name" onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address </label>
                  <input type="email" className="form-control" id="email" name="email" onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password </label>
                  <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password </label>
                  <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-add-task">SignUp</button>
                </div>
                <div className='d-flex justify-content-center align-items-center mb-3'>
                  <span className='my-3'>Already have an account?</span>
                  <Link className="mx-1 signIn-link" to='/'>SignIn</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup


// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/nd5pQl8FyBt
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
//       <div className="flex items-center justify-center bg-gray-100 p-8 dark:bg-gray-800">
//         <div className="mx-auto w-full max-w-md space-y-6">
//           <div className="space-y-2 text-center">
//             <h1 className="text-3xl font-bold">Welcome back</h1>
//             <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
//           </div>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" placeholder="m@example.com" required type="email" />
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <Link className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-400" href="#">
//                   Forgot password?
//                 </Link>
//               </div>
//               <Input id="password" required type="password" />
//             </div>
//             <Button className="w-full" type="submit">
//               Sign in
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-center bg-white p-8 dark:bg-gray-950">
//         <div className="mx-auto w-full max-w-md space-y-6">
//           <div className="space-y-2 text-center">
//             <h1 className="text-3xl font-bold">Create an account</h1>
//             <p className="text-gray-500 dark:text-gray-400">Get started with our task manager app</p>
//           </div>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="John Doe" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" placeholder="m@example.com" required type="email" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" required type="password" />
//             </div>
//             <Button className="w-full" type="submit">
//               Sign up
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }