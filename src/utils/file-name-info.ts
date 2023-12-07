export type FilenameWithExtension = `${string}.${string}`;

export const isFilenameWithExtension = (
  filename: string,
): filename is FilenameWithExtension => {
  return filename.includes(".");
};
export const getFileNameWithExtensionInfo = (
  filename: string,
) => {
  if(!isFilenameWithExtension(filename)){
  return { name:filename, extension: '' } as const;

  }
  const filenamePartsByDot = filename.split(".");
  const name = filenamePartsByDot.slice(0, -1).join(".");
  const extension = filenamePartsByDot.slice(-1)[0] ?? "";
  return { name, extension } as const;
};

export const updateFileName = ({ from, to }: { from: string; to: string }) => {
  if (!isFilenameWithExtension(from)) {
    return from;
  }
  const updatedNameWithoutExtension = isFilenameWithExtension(to)
    ? getFileNameWithExtensionInfo(to).name
    : to;

  return `${updatedNameWithoutExtension}.${
    getFileNameWithExtensionInfo(from).extension
  }` ;
};
