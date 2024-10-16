import React from 'react';

const Awards = () => {
  const dataimg = [
    {
      id: 1,
      url: 'https://silverlandhotels.com/wp-content/uploads/2024/05/Silverland-May-Hotel_Agoda-Gold-Circle-Award-2023-1.png',
    },
    {
      id: 2,
      url: 'https://silverlandhotels.com/wp-content/uploads/2024/05/Silverland-May-Hotel_Agoda-Gold-Circle-Award-2023-1.png',
    },
    {
      id: 3,
      url: 'https://silverlandhotels.com/wp-content/uploads/2024/05/Silverland-May-Hotel_Agoda-Gold-Circle-Award-2023-1.png',
    },
    {
      id: 4,
      url: 'https://silverlandhotels.com/wp-content/uploads/2024/05/Silverland-May-Hotel_Agoda-Gold-Circle-Award-2023-1.png',
    }
  ];

  return (
    <div className="flex flex-end  justify-end items-center py-8">
      {dataimg.map((img, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
          <img src={img.url} alt={`Award ${index + 1}`} className="w-4/12 h-auto" />
        </div>
      ))}
    </div>
  );
};

export default Awards;
