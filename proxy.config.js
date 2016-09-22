// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/docs/data.json': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: 'Learn antd',
            isComplete: true,
          },
          {
            id: 2,
            text: 'Learn ant-tool',
          },
          {
            id: 3,
            text: 'Learn dora',
          },
        ],
      });
    }, 500);
  },


  '/docs/spring/**': function (req, res) {
    console.log(res);
    setTimeout(function () {
      res.type("text");
      res.end("#ddddd22");
    }, 500);
  },
  '/docs/list.json': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: [
          {
            url: 'Controller.md',
            name: "@Controller"
          },
          {
            url: 'RestController.md',
            name: "@RestController"
          },
          {
            url: 'Autoire',
            name: "@Autoire"
          }

        ],
      });
    }, 500);
  },
};
