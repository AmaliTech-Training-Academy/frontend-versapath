import Image from "next/image";
import ReactPlayer from "react-player";

export function renderLink(url: string) {
  const youtubeLinkRegex = /youtube\.com|youtu\.be/;
  const pdfLinkRegex = /\.pdf$/i;
  const imageLinkRegex =
    /\.(jpeg|jpg|gif|png|webp)|\b(photo|image|picture|pic|images?)\b/gi;
  if (youtubeLinkRegex.test(url)) {
    return (
      <ReactPlayer
        src={url}
        controls
        width="100%"
        style={{ aspectRatio: "16/9", minHeight: "300px", height: "100%" }}
      />
    );
  }

  if (imageLinkRegex.test(url)) {
    return (
      <div className="w-full aspect-video max-h-[500px] relative top-0 left-0">
        <Image
          src={url}
          alt="embedded content"
          fill
          priority={false}
          className="object-cover"
        />
      </div>
    );
  }
  if (pdfLinkRegex.test(url)) {
    return (
      <embed src={url} type="application/pdf" width="100%" height="500px" />
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {url}
    </a>
  );
}
