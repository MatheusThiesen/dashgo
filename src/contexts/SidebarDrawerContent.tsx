import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerCotextData = UseDisclosureReturn;

const SidebarDrawerCotext = createContext({} as SidebarDrawerCotextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerCotext.Provider value={disclosure}>
      {children}
    </SidebarDrawerCotext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerCotext);
