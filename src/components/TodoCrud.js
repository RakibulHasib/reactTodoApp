import React, { useEffect, useState } from 'react'
import Button from './Button';
import {Dialog} from 'primereact/dialog';
import InsertUser from './InsertUser';
import UpdateUser from './UpdateUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsersData, resetFormData, setShowDeleteDialog, setShowInsertDialog, setShowUpdateDialog, updateFormData } from '../features/todoCrud/usersSlice';

const TodoCrud = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.userCrud.data);
  const usersStatus = useSelector((state) => state.userCrud.status);
  const showInsertDialog = useSelector((state) => state.userCrud.showInsertDialog);
  const showUpdateDialog = useSelector((state) => state.userCrud.showUpdateDialog);
  const showDeleteDialog = useSelector((state) => state.userCrud.showDeleteDialog);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsersData())
    }
  }, [dispatch]);

  // handle Update or Edit
  const handleEditClick = async (id) => {
    const selectedUser = usersData.find(user => user.id === id);
    dispatch(updateFormData(selectedUser));
    dispatch(setShowUpdateDialog(true));
  };

  // handle delete
  const confirmDelete = async () => {
    dispatch(deleteUser(showDeleteDialog.id))
    dispatch(setShowDeleteDialog({visible: false, id: 0}))
  }

  return (
    <>
      <div style={tableContainer}>
        <table style={tableContainer}>
          <thead>
            <tr>
              <th style={{ ...th, ...thTd }}>Id</th>
              <th style={{ ...th, ...thTd }}>Name</th>
              <th style={{ ...th, ...thTd }}>Email</th>
              <th style={{ ...th, ...thTd }}>Phone</th>
              <th style={{ ...th, ...thTd }}>User Name</th>
              <th style={{ ...th, ...thTd }}>Website</th>
              <th style={{ ...th, ...thTd }}>
                <div className='flex justify-end'>
                  <Button onClick={() => dispatch(setShowInsertDialog(true))} icon="pi pi-plus" iconPosition='right' style={{ marginLeft: '10px'}}>
                    Create
                  </Button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
          {usersData.map((users) => (
            <tr style={trEven}>
              <td style={thTd}>{users?.id}</td>
              <td style={thTd}>{users?.name}</td>
              <td style={thTd}>{users?.email}</td>
              <td style={thTd}>{users?.phone}</td>
              <td style={thTd}>{users?.username}</td>
              <td style={thTd}>{users?.website}</td>
              <td style={thTd}>
                <div className='flex gap-2 justify-end'>
                  <Button onClick={() => handleEditClick(users.id)} icon="pi pi-pen-to-square" iconPosition='right' style={{ backgroundColor: '#ef6c00'}}>
                    Update
                  </Button>
                  <Button onClick={() => dispatch(setShowDeleteDialog({visible: true, id: users.id}))} icon="pi pi-trash" iconPosition='right' style={{ backgroundColor: 'red'}}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div> 
      
      {/* {Start Insert Dialog} */}
      <Dialog
      className='custom-dialog'
      blockScroll
      header={"User Create"}
      visible={showInsertDialog}
      style={{width: "50vw"}}
      onHide={() => {
        dispatch(resetFormData());
        dispatch(setShowInsertDialog(false));
      }}>
        <InsertUser/>
      </Dialog>

       {/* {Start Update Dialog} */}
       <Dialog
      className='custom-dialog'
      blockScroll
      header={"User Update"}
      visible={showUpdateDialog}
      style={{width: "50vw"}}
      onHide={() => {
        dispatch(resetFormData());
        dispatch(setShowUpdateDialog(false));
      }}>
        <UpdateUser />
      </Dialog>

      {/* Start Delete Dialog  */}
      <Dialog
      visible={showDeleteDialog.visible}
      className='custom-dialog'
      onHide={() => dispatch(setShowDeleteDialog({visible: false, id: 0}))}
      style={{width: "25vw"}}
      header="Are you want to delete user?"
      footer={
        <div className='flex items-center justify-center gap-4'>
          <Button onClick={confirmDelete} icon="pi pi-check" iconPosition='right' style={{ backgroundColor: 'green'}}>
            Yes
          </Button>
          <Button onClick={() => dispatch(setShowDeleteDialog({visible: false, id: 0}))} icon="pi pi-times" iconPosition='right' style={{ backgroundColor: 'red'}}>
            No
          </Button>
        </div>
      }>
      </Dialog>
    </>
  )
}

const tableContainer = {
  height: '90vh',
  overflow: 'auto',
  padding: '20px',
  width: '100%',
};

const thTd = {
  border: '1px solid #ddd',
  padding: '14px',
};

const th = {
  paddingTop: '12px',
  paddingBottom: '12px',
  textAlign: 'left',
  backgroundColor: '#263238',
  color: 'white',
};

const trEven = {
  backgroundColor: '#f2f2f2',
};

export default TodoCrud