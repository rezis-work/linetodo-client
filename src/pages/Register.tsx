import Auth from "../features/Auth/Auth";


export default function Login() {
  return(
    <div className="flex center justify-center gap-[175px] w-full h-[calc(100vh-45px)] bg-[#F6F6F7] min-[1440px]:bg-[#FFFFFF]">
      <img
        className="hidden min-[1440px]:inline min-[1440px]:h-screen"
        src="/assets/group-6.png" 
        alt="group of tasks" 
      />
      <Auth type='register' />
    </div>
  );
}
