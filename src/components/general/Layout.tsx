import {useContext} from "react";

import Sidebar from "@/components/general/Sidebar";
import Header from "@/components/general/Header";
import BottomBar from "@/components/general/BottomBar";
import { MusicContext } from "@/context/MusicContext";

import styles from "@/components/general/Layout.module.css";

function Layout({ childern }: { childern: React.ReactNode }) {
  const { audioURL, setAudioUrl } = useContext(MusicContext);
  if(audioURL !== "https://melomint.centralindia.cloudapp.azure.com/api/get-file/QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r"){
    setAudioUrl("https://melomint.centralindia.cloudapp.azure.com/api/get-file/QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r");
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Sidebar />
        <div className={styles.rightContainer}>
          <Header />
          {childern}
        </div>
      </div>
      {/* <BottomBar /> */}
    </div>
  );
}

export default Layout;
