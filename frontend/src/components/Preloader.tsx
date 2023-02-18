const Preloader = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-primary-color flex justify-center items-center">
      <div className="relative h-16 w-16 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border-solid border-[5px] border-r-transparent border-accent-color h-16 w-16 transform-gpu rotate-[75deg]"></div>
        <div className="absolute inset-0 rounded-full border-solid border-[5px] border-r-transparent h-16 w-16 transform-gpu rotate-[45deg]"></div>
      </div>
    </div>
  );
}

export default Preloader;
