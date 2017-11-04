const Promise = require('bluebird');
const mysql = Promise.promisifyAll(require('mysql'));

const Data = function(config) {
    this.config = config;
};

Data.prototype.query = function(sql, parameters) {
    const connection = Promise.promisifyAll(mysql.createConnection(this.config));

    connection.connect();

    return connection.queryAsync(sql, parameters).finally(function() {
        connection.end();
    });
};

Data.prototype.getAllData = function() {
    var sql =
        "SELECT parameters.id, parameters.name, period, min, max, mean, unit, noise, dispersion, law_id, laws.name as law_name, title " +
        "FROM parameters, laws WHERE law_id = laws.id";

    return this.query(sql).then(function(results) {
        return results.map(function(row) {
            return {
                id: row["id"],
                name: row['name'],
                period: row['period'],
                min: row['min'],
                max: row['max'],
                mean: row['mean'],
                dispersion: row['dispersion'],
                unit: row['unit'],
                noise: row['noise'],
                law: {
                    id: row['law_id'],
                    name: row['law_name'],
                    title: row['title']
                }
            }
        });
    });
};

Data.prototype.getData = function(id) {
    var sql =
        "SELECT parameters.id, parameters.name, period, min, max, mean, unit, noise, dispersion, law_id, laws.name as law_name, title " +
        "FROM parameters, laws WHERE law_id = laws.id AND parameters.id = ?";

    return this.query(sql, [id]).then(function(results) {
        return results.map(function(row) {
            return {
                id: row["id"],
                name: row['name'],
                period: row['period'],
                min: row['min'],
                max: row['max'],
                mean: row['mean'],
                dispersion: row['dispersion'],
                unit: row['unit'],
                noise: row['noise'],
                law: {
                    id: row['law_id'],
                    name: row['law_name'],
                    title: row['title']
                }
            }
        })[0];
    });
};

Data.prototype.addData = function (params) {
    var sql =
        "INSERT INTO parameters SET ?";

    var self = this;

    return this.query(sql, params)
        .then(function(results) {
            return self.getData(results.insertId);
         });
};

Data.prototype.changeData = function (id, params) {
    var sql =
        "UPDATE parameters SET ? WHERE id = ?";

    var self = this;

    return this.query(sql, [params, id]).then(function(results) {
        return self.getData(id);
    });
};

Data.prototype.deleteData = function (id) {
    var sql =
        "DELETE FROM parameters WHERE id = ?";

    return this.query(sql, [id]);
};

Data.prototype.getLaws = function() {
    var sql =
        "SELECT id, name, title FROM laws";

    return this.query(sql).then(function(results) {
        return results.map(function(row) {
            return {
                id: row['id'],
                name: row['name'],
                title: row['title']
            }
        });
    });
};

module.exports = Data;
