export const generateUserImages = (count: number) => {
  return Array.from({ length: count }, (_, index) => {
    const randomImageNumber = Math.floor(Math.random() * 100) + 1;
    return {
      id: index + 1,
      src: `https://randomuser.me/api/portraits/men/${randomImageNumber}.jpg`,
      alt: `User ${index + 1}`,
    };
  });
};
