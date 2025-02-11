'use client';

import Input from '@/components/input';

function Result() {
  return (
    <div className="flex flex-col gap-5 px-6 py-8">
      <div className="flex flex-col font-semibold text-2xl">
        <span>안녕하세요.</span>
        <span className="text-3xl">검진 결과를 확인하기 위해</span>
        <span className="text-3xl">본인 확인을 진행해주세요</span>
      </div>
      <form className="flex flex-col gap-4">
        <Input
          name="medicalCenter"
          type="text"
          placeholder="검진기관명"
          required
        />
        <Input name="name" type="text" placeholder="성명" required />
        <Input
          name="birth"
          type="number"
          placeholder="생년월일 앞자리(YYMMDD)"
          required
        />
        <button className="primary-btn">검진결과 확인하기</button>
      </form>
    </div>
  );
}

export default Result;
