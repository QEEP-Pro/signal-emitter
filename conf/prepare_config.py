import yaml
conf=yaml.load(open('conf.yml').read())

conf_acceptor = "export const HOST = \'{}\'\n\nexport const PORT = \'{}\'".format(conf['admin']['host'],conf['admin']['port'])
open("../acceptor/src/api/settings.ts","w").write(conf_acceptor)

conf_admin_front = conf_acceptor + "\n\nexport const WS_HOST = \'{}\'\n\nexport const WS_PORT = \'{}\'".format(conf['ws']['host'],conf['ws']['port'])
open("../admin/front/src/utils/api/settings.ts","w").write(conf_admin_front)

conf_admin_back = str("module.exports = {\n    db: {\n        host     : \'%s\',\n        user     : \'%s\',\n        password : \'%s\',\n        database : \'%s\'\n    },\n    port: %s,\n    emulatorPath: \'%s\'\n};") % (conf['db']['host'],conf['db']['user'],conf['db']['password'],conf['db']['db_name'],conf['admin']['port'],conf['admin']['emulatorPath'])
open("../admin/back/config.js","w").write(conf_admin_back)