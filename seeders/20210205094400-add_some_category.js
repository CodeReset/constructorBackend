'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'categories',
      [
        {
          id: '1266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          name: 'Роллы',
          status:'active',
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
        {
          id: '2266cf59-dd35-4be3-a25a-0b1ddf5365f2',
          appId: '14cd0829-3d9b-4934-a1f9-0980d11bf09f',
          name: 'Супы',
          status:'active',
          img: 'https://img.delo-vcusa.ru/2016/02/Rolly-s-semgoy-Syake-maki.jpg',
          createdAt: '2016-04-25 14:35:06.269-10',
          updatedAt: '2016-04-25 14:35:06.269-10'
        },
      ],
      {}
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', [
      { name: 'Супы' },
      { name: 'Роллы' },
    ]);
  }
};