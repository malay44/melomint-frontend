import { use, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Title, Text, Skeleton } from "@mantine/core";
import { logo, home, heart, user, logout } from "@/assets/general";
import { flowicon } from "@/assets/player";
import styles from "./Sidebar.module.css";
import * as fcl from "@onflow/fcl";
import { shortenAddress } from "@/utils/shortenAddress";

import { useUser } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import { MusicContext } from "@/context/MusicContext";
import API_CONSTANTS from "@/utils/apiConstants";
import { mutate } from "swr";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications.helper";

const artistPhotoStyle = {
  borderRadius: "0.75rem",
};

const ArtistInfo = () => {
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();
  return (
    <div className={styles.artistInfo}>
      {!isUserDataLoading && !errorFetchingUserData ? (
        <Image
          src={userData?.img ? API_CONSTANTS.IPFS_BASE_URL + userData?.img : ""}
          alt=""
          width={40}
          height={40}
          style={artistPhotoStyle}
        />
      ) : (
        <Skeleton width={40} height={40} style={artistPhotoStyle} />
      )}
      <div className={styles.artistInfoText}>
        {!isUserDataLoading && !errorFetchingUserData ? (
          <Title order={4} weight={800} color="primary">
            {userData?.firstName + " " + userData?.lastName}
          </Title>
        ) : (
          <Skeleton width={200} height={30} />
        )}
        <div className={styles.info}>
          <Text color="primary.3" weight={500}>
            Login Method
          </Text>
          <Image src={flowicon} alt="" />
        </div>
        <div className={styles.info}>
          <Text color="primary.3" weight={500}>
            {"Wallet Address:"}
          </Text>
          {!isUserDataLoading && !errorFetchingUserData ? (
            <Text color="primary" weight={700}>
              {shortenAddress(userData.id)}
            </Text>
          ) : (
            <Skeleton width={80} height={20} />
          )}
        </div>
      </div>
    </div>
  );
};

function Sidebar() {
  const router = useRouter();

  const logOut = async () => {
    try {
      await fcl.unauthenticate();
      await mutate(SWR_CONSTANTS.GET_USER);
      showSuccessNotification("Logged out successfully");
      router.push("/");
    } catch (e) {
      showErrorNotification("Error logging out");
      console.log(e);
    }
  };

  const forArtist = router.pathname.startsWith("/artist");
  const { coverPhotoSrc } = useContext(MusicContext);

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logoText}>
        <Image src={logo} alt="" />
        <Text
          weight={500}
          size="sm"
          color="var(--ternary-color)"
          className={styles.gold}
        >
          Gold
        </Text>
      </Link>

      <div className={styles.menu}>
        <div className={styles.menuText}>
          <Text color="primary.2" weight={400}>
            Menu
          </Text>
        </div>
        <div className={styles.menuList}>
          {forArtist ? (
            <>
              <Link
                className={
                  styles.navLink +
                  " " +
                  (router.pathname === "/artist/dashboard"
                    ? styles.navLinkActive
                    : "")
                }
                href="/artist/dashboard"
              >
                <Image src={home} alt="" />
                <Text weight={600}>Dashboard</Text>
              </Link>
              <Link
                className={
                  styles.navLink +
                  " " +
                  (router.pathname === "/artist" ? styles.navLinkActive : "")
                }
                href="/artist"
              >
                <Image src={user} alt="" />
                <Text weight={600}>Profile</Text>
              </Link>
            </>
          ) : (
            <>
              <Link
                className={
                  styles.navLink +
                  " " +
                  (router.pathname === "/player" ||
                  router.pathname === "/player/a/[slug]"
                    ? styles.navLinkActive
                    : "")
                }
                href="/player"
              >
                <Image src={home} alt="" />
                <Text weight={600}>Home</Text>
              </Link>
              <Link
                className={
                  styles.navLink +
                  " " +
                  (router.pathname === "/player/favourites"
                    ? styles.navLinkActive
                    : "")
                }
                href="/player/favourites"
              >
                <Image src={heart} alt="" />
                <Text weight={600}>Favourites</Text>
              </Link>
              <Link
                className={
                  styles.navLink +
                  " " +
                  (router.pathname === "/player/profile"
                    ? styles.navLinkActive
                    : "")
                }
                href="/player/profile"
              >
                <Image src={user} alt="" />
                <Text weight={600}>Profile</Text>
              </Link>
            </>
          )}
          <div
            className={styles.navLink + " " + styles.navLinkWarn}
            onClick={logOut}
          >
            <Image src={logout} alt="" />
            <Text weight={600}>Log Out</Text>
          </div>
        </div>
      </div>

      {forArtist ? (
        <ArtistInfo />
      ) : (
        coverPhotoSrc !== "" && (
          <div className={styles.albumCover}>
            <Image
              src={API_CONSTANTS.IPFS_BASE_URL + coverPhotoSrc}
              alt=""
              fill
              className={styles.photo}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Sidebar;
