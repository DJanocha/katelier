"use client";
export const ComingSoon = () => {
  console.log({ window, document })
  return (

    <div className="flex rounded-xl bg-gradient-to-b from-pink-800/10 to-pink-800/20 h-full border-2 border-pink-400 justify-self-center drop-shadow-lg flex-col items-center justify-center p-4 text-center ">
      <h1 className="mb-8 animate-bounce text-5xl font-bold text-white">
        Coming Soon
      </h1>
      <p className="mb-8 text-lg text-white">
        We&apos;re working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  )
};
