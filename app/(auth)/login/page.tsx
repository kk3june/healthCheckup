'use client';

import Input from '@/components/input';
import Link from 'next/link';

function Login() {
  return (
    <div className="flex flex-col gap-5 px-6 py-8">
      <form className="flex flex-col gap-4">
        <Input name="userId" type="text" placeholder="아이디" required />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
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
