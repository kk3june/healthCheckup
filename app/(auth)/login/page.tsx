'use client';

import { logIn } from '@/app/(auth)/login/action';
import Input from '@/components/input';
import Link from 'next/link';
import { ChangeEvent, useActionState, useState } from 'react';

function Login() {
  const [initialState, setInitialState] = useState({
    admin_id: '',
    password: '',
  });
  const [state, dispatch, error] = useActionState(logIn, null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInitialState({
      ...initialState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-8">
      <form className="flex flex-col gap-4" action={dispatch}>
        <Input
          name="admin_id"
          type="text"
          placeholder="아이디"
          value={initialState.admin_id}
          onChange={onChangeInput}
          errors={state?.fieldErrors.admin_id}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={initialState.password}
          onChange={onChangeInput}
          errors={state?.fieldErrors.password}
        />
        <button className="primary-btn">로그인</button>
        <div className="w-full text-center">
          <Link href={'/create-account'}>회원가입</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
