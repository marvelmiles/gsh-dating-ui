export const isVideo = ({ mimetype = "" }) =>
  mimetype.toLowerCase().indexOf("video") > -1;

export const isImage = ({ mimetype }) =>
  mimetype.toLowerCase().indexOf("image") > -1;

export const isValidMedia = (media) => isVideo(media) || isImage(media);

export const getMediaMainCover = (medias = []) => {
  console.log(medias, [medias.slice(0, 4).find((m) => !!m.url)]);

  return [medias.slice(0, 4).find((m) => !!m.url)];
};
