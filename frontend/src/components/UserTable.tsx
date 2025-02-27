import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store'; // Ensure your store is correctly typed
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { User } from '../types';
import { fetchUsers } from '../features/user/userSlice';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const nameTemplate = (rowData: User) => (
    <div className='flex align-items-center gap-2'>
      <img
        src={rowData.profilePhoto}
        alt={rowData.firstName}
        width={40}
        className='rounded-circle'
      />
      <span>
        {rowData.firstName} {rowData.lastName}
      </span>
    </div>
  );

  const academicsTemplate = (rowData: User) => (
    <ul>
      {rowData.academics.map((acad) => (
        <li key={acad.id}>{acad.school}</li>
      ))}
    </ul>
  );

  const addressTemplate = (rowData: User) => (
    <span>
      {rowData.address.address}, {rowData.address.city}, {rowData.address.state}
      , {rowData.address.country}
    </span>
  );

  const contactTemplate = (rowData: User) => (
    <div>
      <div>Email: {rowData.contact.email}</div>
      <div>Phone: {rowData.contact.phoneNumber}</div>
    </div>
  );

  const actionTemplate = (rowData: User) => (
    <Link to={`user/${rowData.id}`}>
      <Button label='View' size='small' severity='secondary' />
    </Link>
  );

  return (
    <div className='card'>
      {loading && <ProgressSpinner />}
      {error && <Message severity='error' text={error} />}

      {!loading && !error && (
        <DataTable paginator value={users} rows={20} dataKey='id'>
          <Column headerStyle={{ width: '3rem' }} />
          <Column field='profilePhoto' header='Profile' body={nameTemplate} />
          <Column field='occupation' header='Occupation' />
          <Column field='gender' header='Gender' />
          <Column
            field='academics'
            header='Academics'
            body={academicsTemplate}
          />
          <Column field='address' header='Address' body={addressTemplate} />
          <Column field='contact' header='Contact' body={contactTemplate} />
          <Column field='' header='' body={actionTemplate} />
        </DataTable>
      )}
    </div>
  );
}
