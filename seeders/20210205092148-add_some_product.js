'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: '7266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          categoryId: '1266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          name: 'Sake-make',
          description: 'Sake-make',
          price: 1000,
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
        {
          id: '7266cf59-dd35-4be3-a25a-0b1ddf5365f3',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          categoryId: '1266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          name: 'Киото маки',
          description: 'Киото маки',
          price: 1000,
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
        {
          id: '2266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          categoryId: '6266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          name: 'Тайский суп том-ям',
          description: 'Тайский суп том-ям',
          price: 1000,
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
        {
          id: '7266cf59-dd35-4be3-a25a-0b1ddf5365f5',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          categoryId: '1266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          name: 'Экзотик маки',
          description: 'Экзотик маки',
          price: 1000,
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
        {
          id: '7266cf59-dd35-4be3-a25a-0b1ddf5365f6',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          categoryId: '1266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          name: 'Ролл с острым лососем',
          description: 'Sake-make',
          price: 1000,
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        }
      ],
      {}
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', [
      { name: 'Sake-make' },
      { name: 'Киото маки' },
      { name: 'Тайский суп том-ям' },
      { name: 'Экзотик маки' },
      { name: 'Ролл с острым лососем' },
    ]);
  }
};
