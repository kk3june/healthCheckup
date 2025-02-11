import Input from '@/components/input';

function CreateAccount() {
  return (
    <div className="flex flex-col gap-5 px-6 py-8">
      <form className="flex flex-col gap-4">
        <Input name="userId" type="text" placeholder="아이디" required />
        <Input name="userName" type="text" placeholder="성명" required />
        <Input
          name="medicalCenter"
          type="text"
          placeholder="소속기관명"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <button className="primary-btn">회원가입</button>
      </form>
    </div>
  );
}

export default CreateAccount;
