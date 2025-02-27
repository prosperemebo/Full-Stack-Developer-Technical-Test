import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  userInfoSchema,
  userContactSchema,
  userAddressSchema,
  userAcademicsSchema,
} from '../validation/userSchema';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { UserFormData } from '../types';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [schools, setSchools] = useState<string[]>(['']);

  const navigate = useNavigate();

  const schemas = [
    userInfoSchema,
    userContactSchema,
    userAddressSchema,
    userAcademicsSchema,
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schemas[step - 1]),
    mode: 'onTouched',
  });

  useEffect(() => {
    reset(getValues());
  }, [step]);

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: UserFormData) => {
    const isValid = await trigger();

    if (!isValid) return;

    const payload = {
      ...data,
      contact: {
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
      address: {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
      academics: schools
        .filter((school) => Boolean(school))
        .map((school) => ({ school })),
    };

    await dispatch(addUser(payload)).unwrap();
    navigate('/');
  };

  const addSchool = () => setSchools([...schools, '']);

  const removeSchool = (index: number) => {
    setSchools(schools.filter((_, i) => i !== index));
  };

  const handleSchoolChange = (index: number, value: string) => {
    const updatedSchools = [...schools];
    updatedSchools[index] = value;
    setSchools(updatedSchools);
  };

  const userState = useSelector((state: RootState) => state.user);
  const { loading, error } = userState;

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg'>
      {loading && (
        <p className='text-blue-500 mb-4 text-center'>Submitting...</p>
      )}
      {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {step === 1 && (
          <>
            <h2 className='text-xl font-bold mb-4'>User Info</h2>

            <div className='flex flex-col gap-2'>
              <label>Profile Photo</label>
              <InputText
                {...register('profilePhoto')}
                placeholder='Profile Photo URL'
                invalid={Boolean(errors.profilePhoto?.message)}
              />
              <small className='text-red-500'>
                {errors.profilePhoto?.message}
              </small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>First Name</label>
              <InputText
                {...register('firstName')}
                placeholder='First Name'
                invalid={Boolean(errors.firstName?.message)}
              />
              <small className='text-red-500'>
                {errors.firstName?.message}
              </small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Last Name</label>
              <InputText
                {...register('lastName')}
                placeholder='Last Name'
                invalid={Boolean(errors.lastName?.message)}
              />
              <small className='text-red-500'>{errors.lastName?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Date of Birth</label>
              <Controller
                name='dob'
                control={control}
                render={({ field }) => <Calendar {...field} showIcon />}
              />
              <small className='text-red-500'>{errors.dob?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Occupation</label>
              <InputText
                {...register('occupation')}
                placeholder='Occupation'
                invalid={Boolean(errors.occupation?.message)}
              />
              <small className='text-red-500'>
                {errors.occupation?.message}
              </small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Gender</label>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={['Male', 'Female', 'Other']}
                    placeholder='Select Gender'
                  />
                )}
              />
              <small className='text-red-500'>{errors.gender?.message}</small>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className='text-xl font-bold mb-4'>User Contact</h2>

            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <InputText
                {...register('email')}
                placeholder='Email'
                invalid={Boolean(errors.email?.message)}
              />
              <small className='text-red-500'>{errors.email?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Phone Number</label>
              <InputText
                {...register('phoneNumber')}
                placeholder='Phone Number'
                invalid={Boolean(errors.phoneNumber?.message)}
              />
              <small className='text-red-500'>
                {errors.phoneNumber?.message}
              </small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Fax</label>
              <InputText {...register('fax')} placeholder='Fax' />
              <small className='text-red-500'></small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>LinkedIn URL</label>
              <InputText
                {...register('linkedInUrl')}
                placeholder='LinkedIn URL'
                invalid={Boolean(errors.linkedInUrl?.message)}
              />
              <small className='text-red-500'>
                {errors.linkedInUrl?.message}
              </small>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className='text-xl font-bold mb-4'>User Address</h2>

            <div className='flex flex-col gap-2'>
              <label>Address</label>
              <InputText
                {...register('address')}
                placeholder='Address'
                invalid={Boolean(errors.address?.message)}
              />
              <small className='text-red-500'>{errors.address?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>City</label>
              <InputText
                {...register('city')}
                placeholder='City'
                invalid={Boolean(errors.city?.message)}
              />
              <small className='text-red-500'>{errors.city?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>State</label>
              <InputText
                {...register('state')}
                placeholder='State'
                invalid={Boolean(errors.state?.message)}
              />
              <small className='text-red-500'>{errors.state?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Country</label>
              <InputText
                {...register('country')}
                placeholder='Country'
                invalid={Boolean(errors.country?.message)}
              />
              <small className='text-red-500'>{errors.country?.message}</small>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Zip Code</label>
              <InputText
                {...register('zipCode')}
                placeholder='Zip Code'
                invalid={Boolean(errors.zipCode?.message)}
              />
              <small className='text-red-500'>{errors.zipCode?.message}</small>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className='text-xl font-bold mb-4'>User Academics</h2>

            {schools.map((school, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <label>School {index + 1}</label>
                <InputText
                  value={school}
                  onChange={(e) => handleSchoolChange(index, e.target.value)}
                  placeholder='School'
                />
                <Button
                  label='Remove'
                  type='button'
                  onClick={() => removeSchool(index)}
                  size='small'
                  severity='danger'
                />
              </div>
            ))}

            <Button
              label='Add School'
              type='button'
              onClick={addSchool}
              size='small'
            />
            <small className='text-red-500'>{errors.schools?.message}</small>
          </>
        )}

        <div className='flex justify-between mt-4'>
          {step > 1 && (
            <Button
              label='Back'
              type='button'
              onClick={prevStep}
              severity='secondary'
            />
          )}
          {step < 4 ? (
            <Button
              label='Next'
              type='button'
              onClick={nextStep}
              severity='info'
            />
          ) : null}
        </div>
        {step === 4 ? (
          <div className='flex justify-between mt-4'>
            <Button
              label='Submit'
              type='submit'
              severity='success'
              loading={loading}
              disabled={loading}
              className='w-full'
            />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default UserForm;
