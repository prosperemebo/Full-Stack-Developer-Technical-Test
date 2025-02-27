import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { fetchUser, removeUser } from '../features/user/userSlice';
import { RootState } from '../store';
import { Button } from 'primereact/button';

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { user, loading } = userState;

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  const deleteUser = async () => {
    await dispatch(removeUser(id));
    navigate('/');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-4'>
      <header className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>User</h1>
        <Link to='/'>
          <Button label='Go Home' />
        </Link>
      </header>
      <Card title={`${user.firstName} ${user.lastName}`} className='mb-3'>
        <div className='flex align-items-center gap-3'>
          <Avatar image={user.profilePhoto} size='xlarge' shape='circle' />
          <div>
            <p>
              <strong>Occupation:</strong> {user.occupation}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>DOB:</strong> {new Date(user.dob).toDateString()}
            </p>
          </div>
        </div>
      </Card>

      <Panel header='Address'>
        <p>
          <strong>Street:</strong> {user.address.address}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>State:</strong> {user.address.state}
        </p>
        <p>
          <strong>Country:</strong> {user.address.country}
        </p>
        <p>
          <strong>Zip Code:</strong> {user.address.zipCode}
        </p>
      </Panel>

      <Panel header='Contact' className='mt-3'>
        <p>
          <strong>Email:</strong> {user.contact.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.contact.phoneNumber}
        </p>
      </Panel>

      <Panel header='Education' className='mt-3'>
        <DataTable value={user.academics} stripedRows responsiveLayout='scroll'>
          <Column field='school' header='School'></Column>
        </DataTable>
      </Panel>

      <div className='mt-10'>
        <Button
          label='Delete User'
          severity='danger'
          onClick={deleteUser}
          loading={loading}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default UserProfile;
