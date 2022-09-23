import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure()
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PersonList = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setphone] = useState("");
  const [saddress, setSaddress] = useState("");
  const [address, setAddress] = useState("");
  const [addzcode, setAddzcode] = useState("");
  // const [show, setShow] = useState(true);
  const [id1, setid] = useState("");
  const [count, setCount] = useState("");
  const [personId, setPersonId] = useState("");


  // const notify = () => toast("Wow so easy!");
  useEffect(() => {
    fetch(`https://6311970a19eb631f9d7512db.mockapi.io/api/h1/mock`)
      .then((res) => res.json())
      .then((res) => setPersons(res))

  }, [])


  const submite = (id) => {
    setCount(true)
    setid(id)
    let person = persons[id - 1];
    // console.log(this.state.sub)

    setName(person.name)
    setEmail(person.email)
    // setPhone(person.phone)
    setSaddress(person.address.street)
    setAddress(person.address.city)
    setAddzcode(person.address.zipcode)
    setPersonId(person.id)
    // console.log(sub)
  }


  const deletee = (id) => {
    setCount(false)
    setid(id)

  }


  const deleteUser = (id) => {
    fetch(`https://6311970a19eb631f9d7512db.mockapi.io/api/h1/mock/${id1}`, {
      method: 'DELETE'
    })
      // window.location.reload(false);
      .then((res) => {
        res.json().then((res) => {
          console.warn(res)
        
          toast("data is deleted!");
          setTimeout(()=>{
            window.location.reload(true);},3000)
        })
      })
  }


  const edit = (e) => {
    e.preventDefault()
    fetch(`https://6311970a19eb631f9d7512db.mockapi.io/api/h1/mock/${personId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          name: name,
          email: email,
          // phone:phone,
          address: { street: saddress, city: address, zipcode: addzcode }
        })
    })
      .then((res) => {
        res.json()
          .then((res) => {
            console.warn(res)
            toast("data is edited!");
          setTimeout(()=>{
            window.location.reload(true);},3000)
            // window.location.reload(true);
          })
      })
  }

  // const add = () => {
  //   fetch(`https://6311970a19eb631f9d7512db.mockapi.io/api/h1/mock`, {
  //     method: "post",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(
  //       {
  //         name: name,
  //         email: email,
  //         // phone:phone,
  //         address: { street: saddress, city: address, zipcode: addzcode }
  //       })
  //   })
  //     .then(res => res.json)
  //     .then(() =>

  //       window.location.reload(true)
  //     )
  // }

  // --------------------
  const onSubmit = (value) => {


    fetch(`https://6311970a19eb631f9d7512db.mockapi.io/api/h1/mock`, {
      method: "post",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          name: value.name,
          email: value.email,
          address: { street: value.street, city: value.city, zipcode:value.zcode }
        }
      )
    })
      .then(res => res.json)
      .then(() =>{
          toast("added successfully!",{position: toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
          window.location.reload(true);},3000)
        // window.location.reload(true)
      })
  }
  // .then((res) => {
  //   console.warn(res)
  //   toast("data is edited!");
  // setTimeout(()=>{
  //   window.location.reload(true);},3000)
  //   // window.location.reload(true);
  // })

  //  --------------------------------------------
  const validate = (values) => {
    var errors = {};
    if (!values.name) {
      errors.name = "required"
    }
    else if (values.name.length < 5) {
      errors.name = 'please enter more than 5 character'
    }


    if (!values.email) {
      errors.email = "required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'please enter valid email'
    }

    if (!values.street) {
      errors.street = "required"
    }
    else if (values.street.length < 5) {
      errors.street = 'please enter valid street'
    }

    if (!values.city) {
      errors.city = "required"
    }
    else if (values.city.length < 5) {
      errors.city = 'please enter valid city'
    }
    if (!values.zcode) {
      errors.zcode = "required"
    }
    else if (values.zcode.length < 6) {
      errors.zcode = 'please enter valid street'
    }
    
    return errors;
  }
  const formik = useFormik({

    initialValues: {

      name: "",
      email: '',
      city: '',
      street: "",
      zcode:""

    },

    validate,
    onSubmit
  })

  return (

    // <div className='container-fluid'>

    <div className='container'>
      <center><h1>EMPLOYEE DETAILS</h1></center>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" style={{ backgroundColor: "rgb(55, 197, 166)", marginTop: "20px", marginBottom: "20px", marginLeft: "93%", height: '50px', width: '90px' }}><i class="fa fa-plus"></i> Add</button><br></br>
      <div class="table table-bordered">

        <table class="table table-hover" style={{ color: "black", backgroundColor: "white" }}>
          <thead class="thead-dark">
            <tr>
              <th >ID</th>
              <th>NAME</th>
              <th >EMAIL</th>
              {/* <th >PHONENO</th> */}
              <th >ADDRESS</th>
              {/* <th>City</th>
                <th>Street</th> */}
              <th>DELETE<br></br>
                EDIT</th>
            </tr>
          </thead>
          {
            persons.map((person, i) =>
              <tbody>
                <tr key={i}>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  {/* <td>{person.address.city}</td>
                      <td>{person.address.street}</td>  */}
                  {/* <td>{person.phone}</td> */}
                  <td>
                    {person.address.street},<br></br>
                    {person.address.city},<br></br>
                    {person.address.zipcode}
                  </td>
                  {/* <td><button onClick={() => this.submit(person.id)} style={{padding:"10px"}} > */}
                  <td>
                    <button onClick={() => deletee(person.id)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg></button>
                    <button onClick={() => submite(person.id)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      {/* <button onClick={() => this.selectUser(person.id)} style={{padding:"10px"}}> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg></button>
                  </td>
                </tr>
              </tbody>
            )
          }
        </table>
      </div>
      {/* ---------------------------Edit- */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">EDIT DATA</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id='visibility' className='login-form' style={{ backgroundColor: "pink", marginTop: "40px" }}>
                <center style={{ marginTop: "40px" }}>
                  <form>
                    <table>
                      <tr><td><label>Name</label></td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td></tr><br /><br />
                      <tr><td><label>Email</label></td>
                        <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td> </tr><br /><br />
                      {/* <label>Phoneno</label>
      <input type="text" value={this.state.phone}  onChange={(e)=>{this.setState({phone:e.target.value})}} /> <br/><br/> */}
                      <tr><td><label>Address(Street)</label></td>
                        <td><input type="text" value={saddress} onChange={(e) => setSaddress(e.target.value)} /></td> </tr><br /><br />
                      <tr><td><label>Address(City)</label></td>
                        <td><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> </td></tr><br /><br />
                      <tr><td><label>Address(zcode)</label></td>
                        <td><input type="text" value={addzcode} onChange={(e) => setAddzcode(e.target.value)} /> </td></tr><br /><br />
                    </table>
                  </form>
                </center>
              </div>
            </div>
            <div class="modal-footer">
              <button style={{ width: "350px" }} onClick={edit} type="button" data-dismiss="modal" class="btn btn-dark">Edit</button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------delete------- */}
      <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">DELETE DATA</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Do you want to delete the data?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
              <button type="button" onClick={deleteUser} class="btn btn-primary">Yes</button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------add-------------- */}
      <form onSubmit={formik.handleSubmit}>
        <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="modal-body">
                  <div id='visibility' className='login-form' style={{ backgroundColor: "powderblue", marginTop: "40px" }}>
                    <center style={{ marginTop: "40px" }}>
                      <form>
                        <table>
                          <tr><td><label>Name</label></td>
                            <td><input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                              {formik.touched.name && formik.errors.name ?
                                <div className='text-danger'>{formik.errors.name}</div>
                                : null}
                            </td></tr><br /><br />
                            <tr><td><label>Email</label></td>
                            <td><input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                              {formik.touched.email && formik.errors.email ?
                                <div className='text-danger'>{formik.errors.email}</div>
                                : null}
                            </td> </tr><br /><br />
                          {/* <label>Phoneno</label>
      <input type="text" value={this.state.phone}  onChange={(e)=>{this.setState({phone:e.target.value})}} /> <br/><br/> */}
                          <tr><td><label>Address(Street)</label></td>
                            <td><input type="text" name="street" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.street && formik.errors.street ?
                                <div className='text-danger'>{formik.errors.street}</div>
                                : null}
                            </td> </tr><br /><br />
                          <tr><td><label>Address(City)</label></td>
                            <td><input type="text" name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                            {formik.touched.city && formik.errors.city ?
                                <div className='text-danger'>{formik.errors.city}</div>
                                : null}
                            </td></tr><br /><br />
                          <tr><td><label>Address(zcode)</label></td>
                            <td><input type="text" name="zcode" onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                            {formik.touched.zcode && formik.errors.zcode ?
                                <div className='text-danger'>{formik.errors.zcode}</div>
                                : null}
                          </td></tr><br /><br />
                        </table>
                      </form>
                    </center>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button  type="submit" class="btn btn-primary">Add</button>
                {/* <input type="submit"/> */}
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>


  )
}

export default PersonList;





