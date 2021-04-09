'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'templates',
      [
        {
          id: '15cd0829-3d9b-4934-a1f9-0980d11bf09f',
          name: 'Test template',
          images: ['/static/temlates/123.png'],
          type: 'Доставки',
          pages: cleanArray([
            {
              name: 'Main',
              id: 'main',
              icon: 'main.png',
              components: [
                {
                  name: 'head',
                  entity: 'component',
                  text: 'Headline',
                  type: 'default',
                  props: { text: 'Деликиос фуд' }
                },
                {
                  name: 'search',
                  entity: 'component',
                  text: 'Search',
                  type: 'default'
                },
                {
                  name: 'loaderLogic',
                  entity: 'fragment',
                  type: 'start'
                },
                {
                  name: 'loader',
                  entity: 'component',
                  text: 'Loader',
                  type: 'default'
                },
                {
                  name: 'view',
                  entity: 'fragment',
                  type: 'start'
                },
                {
                  name: 'categoryList',
                  entity: 'component',
                  text: 'Category List',
                  type: 'vertical'
                },
                {
                  name: 'productList',
                  entity: 'component',
                  text: 'Product List',
                  type: 'horizontal'
                },
                {
                  name: 'view',
                  entity: 'fragment',
                  type: 'end'
                },
                {
                  name: 'loaderLogic',
                  entity: 'fragment',
                  type: 'end'
                }
              ]
            }
          ]),
          components: cleanArray([
            {
              page: 'main',
              name: 'head',
              text: 'Headline',
              types: [
                {
                  id: 'oneline',
                  name: 'oneline',
                  componentScreen: `/static/components/oneline.PNG`,
                  pageScreen: `/static/pages/onelinepage.PNG`
                },
                {
                  id: 'multiline',
                  name: 'multiline',
                  componentScreen: `/static/components/multiline.PNG`,
                  pageScreen: `/static/pages/multiplelinepage.PNG`
                }
              ],
              props: [{ name: 'text', type: 'text' }]
            },
            {
              page: 'main',
              name: 'categoryList',
              text: 'Category list',
              types: [
                {
                  id: 'vertical',
                  name: 'Vartical',
                  componentScreen: `/static/components/horizontal.png`,
                  pageScreen: `/static/pages/main.png`
                },
                {
                  id: 'horizontal',
                  name: 'Horizontal',
                  componentScreen: `/static/components/horizontal.png`,
                  pageScreen: `/static/components/horizontal.png`
                }
              ],
              props: []
            }
          ]),
          createdAt: '2021-04-09 12:35:06.269-10',
          updatedAt: '2021-04-09 12:35:06.269-10'
        }
      ],
      {}
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('templates', [{ id: '15cd0829-3d9b-4934-a1f9-0980d11bf09f' }]);
  }
};
function cleanArray (arr) {
  return '{"' + arr.map(e => cleanEntry(e)).join('", "') + '"}'
}
function cleanEntry (obj) {
  return JSON.stringify(obj).replace(/"/g, '\\"')
}