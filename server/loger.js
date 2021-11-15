const fs = require('fs');
const fileStats = './server/db/stats.json';

const loger = (act, prod) => {
  let dat = new Date();
    fs.readFile(fileStats, 'utf-8', (err, data) => {
      if (err) {
        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
        const logs = JSON.parse(data);
        let log ={
            action: act,
            product: {
              id_product: prod.id_product,
              product_name: prod.product_name,
              price:prod. price
            },
            date: dat.toString(),
        }
        logs.push(log);

        fs.writeFile(fileStats, JSON.stringify(logs), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        })
      }
    });
  };

module.exports = loger;
