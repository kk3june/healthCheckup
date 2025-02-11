import Link from 'next/link';

function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col items-center gap-3 sm:gap-2 mt-32 sm:mt-32">
        <span className="font-bold text-2xl sm:text-2xl">
          당신의 검진결과를 알려드려요
        </span>
        <span className="font-bold text-5xl sm:text-6xl">
          AI 검진결과 도우미
        </span>
      </div>
      <Link
        href="/result"
        className="w-fit sm:w-3/4 min-w-fit m-auto p-6 sm:p-5 rounded-2xl text-center text-3xl sm:text-4xl text-white font-semibold bg-blue-700 hover:bg-blue-600"
      >
        내 검진결과 확인하러 가기
      </Link>
      <div className="flex flex-col px-5 my-8 sm:my-6">
        <div className="flex justify-center gap-1.5 p-2 text-xl sm:text-base">
          <span>의료진이신가요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
