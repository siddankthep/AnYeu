import Image from "next/image";
import s1 from "@/stickers/5.png";
import s4 from "@/stickers/4.png";
import s7 from "@/stickers/7.png";
import s10 from "@/stickers/10.png";
import s11 from "@/stickers/11.png";
import s14 from "@/stickers/14.png";

export default function CoverPage() {
  return (
    <div className="cover-container" aria-label="Notebook cover">
      <div className="cover-spine" />
      <div className="sticker sticker--near-modal-left">
        <Image
          src={s1}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="sticker sticker--near-modal-right">
        <Image
          src={s4}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="sticker sticker--near-modal-mid">
        <Image
          src={s7}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="sticker sticker--near-modal-mid-2">
        <Image
          src={s14}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Stickers at bottom corners */}
      <div className="sticker sticker--bottom-left">
        <Image
          src={s11}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="sticker sticker--bottom-right">
        <Image
          src={s10}
          alt="sticker"
          width={512}
          height={512}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="cover-modal">
        <h1>Composition</h1>

        <div className="cover-modal-body">
          <CoverBaselineAlign>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Your Mom</div>
          </CoverBaselineAlign>
        </div>
        <p>100 Sheets • 200 Pages • Wide Ruled</p>
      </div>
    </div>
  );
}

function CoverBaselineAlign({ children }) {
  if (typeof window !== "undefined") {
    const lh = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--line-height"
      )
    );
    const paddingTop = 12;
    const offset = paddingTop % lh ? lh - (paddingTop % lh) : 0;
    document.documentElement.style.setProperty(
      "--cover-baseline-offset",
      `${offset}px`
    );
  }
  return children;
}
