import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DateInput } from "@mantine/dates";

import {
  Title,
  Text,
  TextInput,
  Button,
  FileInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import UploadFileIcon from "@/assets/artist/UploadFileIcon.svg";

import styles from "./UploadModalComp.module.css";
import Image from "next/image";

import transactionService from "@/services/transaction.service";

function UploadModalComp() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      song: null,
      cover: null,
      isExclusive: false,
      exclusiveUntil: new Date(),
    },

    validate: {
      name: (value) => value.trim().length >= 3,
      song: (value: File | null) => value !== null,
      cover: (value: File | null) => value !== null,
      exclusiveUntil: (value) => value !== null,
    },
  });

  const uploadSong = async () => {
    const { name, song, cover } = form.values;

    const uploadSong = {
      name: name,
      song: song,
      cover: cover,
    };

    const songName = name;
    const songCoverUrl = "0x11";
    const songUrl = "0x22";

    try {
      await transactionService.uploadSong({
        songName,
        songCoverUrl,
        songUrl,
      });
    } catch (error) {
      console.log(error);
    }

    console.log("Song Uploaded");
  };

  return (
    <div className={styles.container}>
      <Title order={4} weight={"700"}>
        Upload Song
      </Title>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <div className={styles.methodSelections}>
          <div className={styles.methodContainer}>
            <Text color="primary.3" weight={"500"}>
              Add all the Information required for the song to be published on
              the platform and click on Publish to Get Started.
            </Text>
            <div className={styles.inputs}>
              <TextInput
                placeholder="Song Name"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                {...form.getInputProps("name")}
              />
              <FileInput
                placeholder="Song File"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                accept="audio/*"
                icon={
                  <Image
                    src={UploadFileIcon}
                    height={18}
                    width={18}
                    alt="Upload File Icon"
                  />
                }
                {...form.getInputProps("song")}
              />
              <FileInput
                placeholder="Cover Image"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                accept="image/*"
                icon={
                  <Image
                    src={UploadFileIcon}
                    height={18}
                    width={18}
                    alt="Upload File Icon"
                  />
                }
                {...form.getInputProps("cover")}
              />
              <Checkbox
                label="Mark as Exclusive"
                size={"md"}
                {...form.getInputProps("isExclusive", { type: "checkbox" })}
              />
              {form.values.isExclusive && (
                <DateInput
                  placeholder="Exclusive Until"
                  size="md"
                  {...form.getInputProps("exclusiveUntil")}
                />
              )}
            </div>
            <Button
              fullWidth
              size="md"
              classNames={{
                root: styles.defaultRadius,
              }}
              onClick={uploadSong}
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadModalComp;
