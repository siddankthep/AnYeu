import Head from "next/head";
import { useMemo } from "react";
import Notebook from "@/components/Notebook";
import CoverPage from "@/components/CoverPage";
import s3 from "@/stickers/5.png";
import s15 from "@/stickers/15.png";
import s16 from "@/stickers/14.png";
import Image from "next/image";

export default function Home() {
  const pages = useMemo(
    () => [
      { id: "cover", variant: "cover", content: <CoverPage /> },
      {
        id: "p1",
        content: (
          <>
            <h1 style={{ fontSize: 24, marginBottom: 0 }}>Hello Gâu,</h1>
            <br></br>
            <p>
              Write something here
            </p>
            <br></br>
            <p>
              Write something here
            </p>
            <p>
              Write something here
            </p>
            <div className="note-sticker note-sticker--tr">
              <Image
                src={s3}
                alt="sticker"
                width={512}
                height={512}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </>
        ),
      },
      {
        id: "p2",
        content: (
          <>
            <h1 style={{ fontSize: 24, marginBottom: 0 }}>Về đồ ăn</h1>
            <br></br>
            <br></br>
            <p>
             page 2
            </p>
            <br></br>
            <div className="sticker sticker--bottom-left">
              <Image
                src={s15}
                alt="sticker"
                width={512}
                height={512}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="sticker sticker--near-modal-mid-2">
              <Image
                src={s16}
                alt="sticker"
                width={512}
                height={512}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Notebook</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notebook pages={pages} />
    </>
  );
}
