export const getMockFileList = () => {
  const dt = new DataTransfer();
  dt.items.add(new File(['some photo'], 'photo.jpg', { type: 'image/jpeg' }));
  return dt.files;
};
