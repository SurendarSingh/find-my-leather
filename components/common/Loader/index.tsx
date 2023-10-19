import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-findmyleather border-t-transparent"></div>
      <div className="w-24 h-24 mb-4">
        {/* <Image
          src="/images/findmyleather/Logo-Trans-bg.png"
          alt="logo"
          height={100}
          width={100}
        /> */}
      </div>
    </div>
  );
};

export default Loader;
