import axios from 'axios';
import React from 'react'
import { showToast } from './Toaster';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormData, updateFormData, updateUser } from '../features/todoCrud/usersSlice';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.userCrud.formData);
  const usersStatus = useSelector((state) => state.userCrud.status);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(updateUser(formData.id)).then((response) => {
        if (usersStatus === 'succeeded') {
          dispatch(resetFormData());
        }
      })
    };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <form onSubmit={handleSubmit}>
    <div className="w-full mb-2">
      <label className="block text-black dark:text-white">
        Name <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
    <div className="w-full mb-2">
      <label className="block text-black dark:text-white">
        User Name <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        name="username"
        placeholder="Enter User Name"
        value={formData.username}
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
    <div className="w-full mb-2">
      <label className="block text-black dark:text-white">
        Email <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
    <div className="w-full mb-2">
      <label className="block text-black dark:text-white">
        Phone <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        name="phone"
        placeholder="Enter Phone No"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
    <div className="w-full mb-4">
      <label className="block text-black dark:text-white">
        Website <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        name="website"
        placeholder="Enter Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
    <div className='w-full flex justify-end'>
      <button type="submit"
      className="flex justify-center rounded bg-green-600 text-white p-1 px-2 font-medium text-gray"
      >
        Submit
      </button>
    </div>
    </form>
  </div>
  )
}

export default UpdateUser