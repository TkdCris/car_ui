import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { Button } from "../ui/button";
import { useColorMode } from "../ui/color-mode";

export function SwitchTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      bg="inherit"
      _hover={{
        transform: "scale(1.4)",
        transition: "transform 0.2s",
      }}
      _active={{
        transform: "rotate(180deg)",
      }}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? (
        <MdSunny color="#C2C7C9" />
      ) : (
        <IoMdMoon color="#C2C7C9" />
      )}
    </Button>
  );
}
