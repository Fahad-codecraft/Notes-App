import { Box, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");
  return (
    <Box className="relative">
      <Box 
      className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-[#ab2bcb] via-[#e974bb] to-[#ffbd9a] xl:-top-24 xl:left-72 lg:left-52 lg:-top-24 md:-top-24 md:left-40 sm:-top-14 sm:-left-14 -left-14 -top-14" 
      />
      <Box className="absolute w-28 h-28 rounded-full  bg-gradient-to-tr from-[#121218] from-30% via-[#22222d] to-[#313142] to-90%  xl:top-1 xl:right-72 lg:top-1 lg:right-48  md:top-1 md:right-40 sm:top-1 sm:right-10 right-10" />
      <Box
        className="relative"
        width={isNonMobileScreens ? "30rem" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <div className="flex justify-center items-center">
        <img src="/logo.png" alt="" className="w-10 h-10 mr-2"/>
          <p className="text-[40px] font-semibold">
            NoteNexus
          </p>
        </div>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
