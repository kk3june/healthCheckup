'use client';

import { createAccount } from '@/app/(auth)/create-account/action';
import Input from '@/components/input';
import { ChangeEvent, useActionState, useState } from 'react';

function CreateAccount() {
  const [initialState, setInitialState] = useState({
    admin_id: '',
    admin_name: '',
    medicalcenter_name: '',
    medicalcenter_number: '',
    password: '',
    confirm_password: '',
  });
  const [state, dispatch] = useActionState(createAccount, null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInitialState({
      ...initialState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-8">
      <form action={dispatch} className="flex flex-col gap-4">
        <Input
          name="admin_id"
          type="text"
          placeholder="아이디"
          value={initialState.admin_id}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.admin_id}
        />
        <Input
          name="admin_name"
          type="text"
          placeholder="성명"
          value={initialState.admin_name}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.admin_name}
        />
        <Input
          name="medicalcenter_name"
          type="text"
          placeholder="소속기관명"
          value={initialState.medicalcenter_name}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.medicalcenter_name}
        />
        <Input
          name="medicalcenter_number"
          type="number"
          placeholder="요양기관번호"
          value={initialState.medicalcenter_number}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.medicalcenter_number}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={initialState.password}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          value={initialState.confirm_password}
          onChange={onChangeInput}
          errors={state?.error?.fieldErrors.confirm_password}
        />
        <button className="primary-btn">회원가입</button>
      </form>
    </div>
  );
}

export default CreateAccount;
